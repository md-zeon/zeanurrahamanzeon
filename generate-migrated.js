const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = __dirname;
const WEBFLOW = path.join(ROOT, "src/app/styles/webflow.css");
const GEMBED = path.join(ROOT, "src/app/styles/global-embed.css");
const OUT = path.join(ROOT, "src/app/styles/migrated.css");

const HEADER = `/* AUTO-MIGRATED from webflow.css / global-embed.css for classes used by the app.
   Values and ORDER are verbatim to guarantee zero visual drift. Phase-2 work replaces
   these entries with inline Tailwind utilities and deletes them here. */
`;

function tsxFiles(onlyTracked) {
  if (onlyTracked) {
    return execSync("git ls-files", { cwd: ROOT, encoding: "utf8" })
      .split(/\r?\n/)
      .filter((f) => f.endsWith(".tsx"));
  }
  const files = [];
  (function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.isDirectory()) {
        if (["node_modules", ".next", ".git"].includes(ent.name)) continue;
        walk(path.join(dir, ent.name));
      } else if (ent.name.endsWith(".tsx")) {
        files.push(path.relative(ROOT, path.join(dir, ent.name)));
      }
    }
  })(path.join(ROOT, "src"));
  return files;
}

function collectTokens(files) {
  const tokens = new Set();
  const re = /className\s*=\s*(?:\{)?\s*([`'"])/g;
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    let m;
    while ((m = re.exec(src)) !== null) {
      const quote = m[1];
      const start = re.lastIndex;
      const end = src.indexOf(quote, start);
      if (end === -1) continue;
      let lit = src.slice(start, end);
      re.lastIndex = end + 1;
      if (quote === "`") lit = lit.replace(/\$\{[^}]*\}/g, " ");
      for (const tok of lit.split(/\s+/)) if (tok) tokens.add(tok);
    }
  }
  return tokens;
}

function extractClasses(selectorList) {
  const classes = [];
  const re = /\.([a-zA-Z_][\w-]*)/g;
  let m;
  while ((m = re.exec(selectorList)) !== null) classes.push(m[1]);
  return classes;
}

function splitSelectors(sel) {
  if (typeof sel !== "string") {
    console.error("NON-STRING selector:", typeof sel, JSON.stringify(sel));
    return [];
  }
  const parts = [];
  let depth = 0;
  let cur = "";
  for (const ch of sel) {
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function parseSource(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const entries = [];
  let i = 0;
  function skipWhitespace() {
    while (i < css.length && /\s/.test(css[i])) i++;
  }
  function readBlockBody() {
    i++;
    const bodyStart = i;
    let d = 1;
    while (i < css.length && d > 0) {
      const ch = css[i];
      if (ch === "{") d++;
      else if (ch === "}") d--;
      else if (ch === '"' || ch === "'") {
        i++;
        while (i < css.length && css[i] !== ch) i++;
      }
      i++;
    }
    return css.slice(bodyStart, i - 1);
  }
  function parseRuleList(text) {
    const rules = [];
    let j = 0;
    while (j < text.length) {
      while (j < text.length && /\s/.test(text[j])) j++;
      if (j >= text.length) break;
      if (text[j] === "}") {
        j++;
        break;
      }
      const start = j;
      while (j < text.length && text[j] !== "{" && text[j] !== "}") j++;
      const chunk = text.slice(start, j).trim();
      if (text[j] === "{") {
        j++;
        let d = 1;
        const bodyStart = j;
        while (j < text.length && d > 0) {
          const ch = text[j];
          if (ch === "{") d++;
          else if (ch === "}") d--;
          else if (ch === '"' || ch === "'") {
            j++;
            while (j < text.length && text[j] !== ch) j++;
          }
          j++;
        }
        const body = text.slice(bodyStart, j - 1);
        if (!chunk.startsWith("@")) rules.push({ kind: "rule", selectors: chunk, body });
      } else {
        j++;
      }
    }
    return rules;
  }
  while (i < css.length) {
    skipWhitespace();
    if (i >= css.length) break;
    if (css[i] === "}") {
      i++;
      continue;
    }
    const start = i;
    while (i < css.length && css[i] !== "{" && css[i] !== "}") i++;
    const chunk = css.slice(start, i).trim();
    if (css[i] === "{") {
      const body = readBlockBody();
      if (chunk.startsWith("@media")) {
        const entry = { kind: "media", query: chunk.replace(/^@media\s*/, "").trim(), rules: parseRuleList(body) };
        entries.push(entry);
      } else if (!chunk.startsWith("@")) {
        entries.push({ kind: "rule", selectors: chunk, body });
      }
    } else {
      i++;
    }
  }
  return entries;
}

function ruleMatches(rule, used, mode) {
  const selectors = splitSelectors(rule.selectors);
  if (mode === "any") {
    for (const sel of selectors) {
      const cls = extractClasses(sel);
      if (cls.length > 0 && cls.some((c) => used.has(c))) return true;
    }
    return false;
  }
  if (mode === "all-sel") {
    for (const sel of selectors) {
      const cls = extractClasses(sel);
      if (cls.length > 0 && cls.every((c) => used.has(c))) return true;
    }
    return false;
  }
  const all = [];
  for (const sel of selectors) all.push(...extractClasses(sel));
  return all.length > 0 && all.every((c) => used.has(c));
}

function collapse(s) {
  return s.replace(/\s+/g, " ").trim();
}

function render(entries, used, mode, format) {
  const lines = [];
  for (const e of entries) {
    if (e.kind === "rule") {
      if (!ruleMatches(e, used, mode)) continue;
      lines.push(
        "  " +
          (format === "collapse"
            ? collapse(e.selectors) + " { " + collapse(e.body) + " }"
            : e.selectors + "{" + e.body + "}")
      );
    } else {
      for (const r of e.rules) {
        if (!ruleMatches(r, used, mode)) continue;
        const ruleText =
          format === "collapse"
            ? collapse(r.selectors) + " { " + collapse(r.body) + " }"
            : r.selectors + "{" + r.body + "}";
        lines.push("@media " + collapse(e.query) + " {");
        lines.push("  " + ruleText);
        lines.push("}");
      }
    }
  }
  return lines;
}

function main() {
  const args = process.argv.slice(2);
  const onlyTracked = args.includes("--tracked");
  const modeArg = args.find((a) => a.startsWith("--mode="));
  const mode = modeArg ? modeArg.split("=")[1] : "all-sel";

  const files = onlyTracked ? tsxFiles(true) : tsxFiles(false);
  const used = collectTokens(files);
  const wf = parseSource(fs.readFileSync(WEBFLOW, "utf8"));
  const ge = parseSource(fs.readFileSync(GEMBED, "utf8"));

  const wfLines = render(wf, used, mode, "verbatim");
  const geLines = render(ge, used, mode, "collapse");
  const out = HEADER + wfLines.concat(geLines).join("\n") + "\n";

  if (args.includes("--diff")) {
    fs.writeFileSync(ROOT + "/.migrated-" + mode + ".css", out);
    const current = fs.readFileSync(OUT, "utf8");
    const currentLines = current.split("\n");
    const outLines = out.split("\n");
    console.log("mode=" + mode + " tracked=" + onlyTracked);
    console.log("current lines: " + currentLines.length);
    console.log("new lines:     " + outLines.length);
    const diff = [];
    const max = Math.max(currentLines.length, outLines.length);
    for (let i = 0; i < max; i++) {
      if (currentLines[i] !== outLines[i]) diff.push(i + 1);
    }
    console.log("diff line numbers: " + diff.slice(0, 40).join(",") + (diff.length > 40 ? " ..." : ""));
    console.log("diff count: " + diff.length);
    if (diff.length > 0) {
      for (const n of diff.slice(0, 10)) {
        console.log("  cur[" + n + "]: " + (currentLines[n - 1] ?? "(none)").slice(0, 120));
        console.log("  new[" + n + "]: " + (outLines[n - 1] ?? "(none)").slice(0, 120));
      }
    }
  } else {
    fs.writeFileSync(OUT, out);
    console.log("wrote " + OUT + " (" + out.length + " bytes, " + out.split("\n").length + " lines)");
  }
}

module.exports = { collectTokens, parseSource, ruleMatches, render, tsxFiles };

if (require.main === module) {
  main();
}
