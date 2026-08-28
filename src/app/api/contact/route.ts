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

  const details = [
    ["Name", name],
    ["Email", email],
    ["Current website", website],
    ["Company stage", companyStage],
    ["Deadline", deadline],
    ["Budget", budget],
    ["Heard via", source],
  ].filter(([, value]) => value);

  const detailRowsHtml = details
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 20px;border-bottom:1px solid #26212e;color:#8a8599;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
        <td style="padding:12px 20px;border-bottom:1px solid #26212e;color:#f4f2ff;font-family:Arial,Helvetica,sans-serif;font-size:14px;vertical-align:top">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const detailText = details
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="dark" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background-color:#0a090f">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a090f">
      <tr>
        <td align="center" style="padding:40px 16px">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#100e18;border:1px solid #26212e">
            <tr>
              <td style="padding:36px 40px 0">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="vertical-align:middle">
                      <span style="display:inline-block;width:36px;height:36px;background-color:#0a090f;border:1px solid rgba(94,234,212,0.4);border-radius:10px;text-align:center;line-height:36px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:18px">Z</span>
                    </td>
                    <td style="vertical-align:middle;padding-left:14px">
                      <div style="color:#f4f2ff;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:15px;letter-spacing:0.5px">ZEANUR RAHAMAN ZEON</div>
                      <div style="color:#8a8599;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px">Aspiring Software Engineer</div>
                    </td>
                    <td style="vertical-align:middle;text-align:right">
                      <span style="color:#8a8599;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">[inquiry]</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px 0">
                <div style="color:#5eead4;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase">[new message]</div>
                <div style="color:#f4f2ff;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:28px;line-height:34px;margin-top:10px">A new inquiry from <span style="color:#5eead4">${escapeHtml(name)}</span></div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px">
                <div style="height:1px;background-color:#26212e;margin-top:28px"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 40px">
                <div style="border-left:2px solid #5eead4;padding:4px 0 4px 18px;color:#eae6f2;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:26px">${escapeHtml(message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px">
                <div style="height:1px;background-color:#26212e"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px 0">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${detailRowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;color:#8a8599;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">Reply to ${escapeHtml(email)}</td>
                    <td style="vertical-align:middle;text-align:right">
                      <a href="https://zeanurrahamanzeon.vercel.app" style="color:#5eead4;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;text-decoration:none">zeanurrahamanzeon.vercel.app</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Portfolio Site" <${user}>`,
      to,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n---\n${detailText}`,
      html,
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