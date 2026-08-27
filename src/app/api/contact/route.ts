import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(data: FormData, name: string): string {
  return String(data.get(name) ?? "").trim();
}

/**
 * Contact route: validates the brief form and relays it by email via SMTP
 * (Nodemailer). Credentials come from SMTP_* env vars; MAIL_TO is the inbox
 * that receives the inquiry.
 */
export async function POST(request: NextRequest) {
  const data = await request.formData();

  const name = field(data, "Full-Name");
  const email = field(data, "Email");
  const message = field(data, "Message");
  const website = field(data, "Current-website-URL");
  const companyStage = field(data, "Company-Stage");
  const deadline = field(data, "Deadline");
  const budget = field(data, "Budget");
  const source = field(data, "Source");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email address is invalid." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO;
  if (!host || !user || !pass || !to) {
    return NextResponse.json(
      { error: "Contact mail is not configured on the server." },
      { status: 500 },
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Current website", website],
    ["Company stage", companyStage],
    ["Deadline", deadline],
    ["Budget", budget],
    ["Heard via", source],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"Portfolio Site" <${user}>`,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n---\n${rows}`,
      html: `
        <p style="font-family:sans-serif;font-size:16px">${escapeHtml(message)}</p>
        <hr style="border:0;border-top:1px solid #ddd;margin:24px 0">
        <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
          ${rows
            .split("\n")
            .map((row) => {
              const [label, ...rest] = row.split(": ");
              const value = rest.join(": ");
              return `<tr>
                <td style="padding:4px 16px 4px 0;font-weight:600">${escapeHtml(label)}</td>
                <td style="padding:4px 0">${escapeHtml(value)}</td>
              </tr>`;
            })
            .join("")}
        </table>`,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not send the message. Try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

/** Escapes HTML so a visitor's brief can't inject markup into the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}