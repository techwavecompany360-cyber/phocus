import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isMailerConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD &&
    process.env.CONTACT_FROM_EMAIL
  );
}

export function getMissingMailerConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASSWORD) missing.push("SMTP_PASSWORD");
  if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
  return missing;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  if (!isMailerConfigured()) {
    const missingVars = getMissingMailerConfig().join(", ");
    throw new Error(
      `SMTP configuration incomplete. Missing environment variable(s): ${missingVars}`
    );
  }

  const host = process.env.SMTP_HOST!;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASSWORD!;
  const fromAddress = process.env.CONTACT_FROM_EMAIL!;
  const toAddress = process.env.CONTACT_TO_EMAIL || "info@phociexperttechnologies.co.tz";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const emailSubject = `Website Inquiry: ${payload.service} — ${payload.fullName}`;

  const safeName = escapeHtml(payload.fullName);
  const safeCompany = payload.company ? escapeHtml(payload.company) : "Not Specified";
  const safeEmail = escapeHtml(payload.email);
  const safePhone = payload.phone ? escapeHtml(payload.phone) : "Not Provided";
  const safeService = escapeHtml(payload.service);
  const safeBudget = payload.budget ? escapeHtml(payload.budget) : "Not Specified";
  const safeSubject = escapeHtml(payload.subject);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const safeTimestamp = escapeHtml(payload.submittedAt);

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7faff; color: #10213d; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(4, 50, 121, 0.08); }
          .header { background: linear-gradient(110deg, #043279 0%, #0B5AAA 50%, #04BCEB 100%); padding: 32px 28px; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 13px; color: #e0f2fe; }
          .content { padding: 28px; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0b5aaa; margin-bottom: 16px; }
          .field-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
          .field-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
          .field-table td.label { width: 34%; font-weight: 600; color: #61718b; }
          .field-table td.value { width: 66%; color: #10213d; font-weight: 500; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #04bceb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1e293b; margin-top: 8px; }
          .footer { background: #f8fafc; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; }
          .badge { display: inline-block; padding: 3px 8px; background: #e0f2fe; color: #0369a1; border-radius: 4px; font-weight: 600; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PhocieXpert Technologies</h1>
            <p>New Client Project Inquiry Received via Corporate Website</p>
          </div>
          <div class="content">
            <div class="section-title">Inquiry Details</div>
            <table class="field-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value"><strong>${safeName}</strong></td>
              </tr>
              <tr>
                <td class="label">Company / Org</td>
                <td class="value">${safeCompany}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${safeEmail}" style="color: #0b5aaa; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value">${safePhone}</td>
              </tr>
              <tr>
                <td class="label">Service Required</td>
                <td class="value"><span class="badge">${safeService}</span></td>
              </tr>
              <tr>
                <td class="label">Estimated Budget</td>
                <td class="value">${safeBudget}</td>
              </tr>
              <tr>
                <td class="label">Subject</td>
                <td class="value"><strong>${safeSubject}</strong></td>
              </tr>
              <tr>
                <td class="label">Submission Date & Time</td>
                <td class="value">${safeTimestamp}</td>
              </tr>
            </table>

            <div class="section-title">Project Description / Message</div>
            <div class="message-box">
              ${safeMessage}
            </div>
          </div>
          <div class="footer">
            Sent to <strong>${toAddress}</strong> from PhocieXpert Corporate Website Portal.<br />
            Reply directly to this email to contact <strong>${safeName}</strong> (&lt;${safeEmail}&gt;).
          </div>
        </div>
      </body>
    </html>
  `;

  const plainText = `
PHOCIEXPERT TECHNOLOGIES COMPANY LIMITED
New Corporate Website Inquiry
========================================

Inquiry Subject: ${payload.subject}
Selected Service: ${payload.service}
Submission Date & Time: ${payload.submittedAt}

CLIENT DETAILS:
- Full Name: ${payload.fullName}
- Company / Organization: ${payload.company || "Not Specified"}
- Email: ${payload.email}
- Phone: ${payload.phone || "Not Provided"}
- Estimated Budget: ${payload.budget || "Not Specified"}

PROJECT DESCRIPTION:
----------------------------------------
${payload.message}
----------------------------------------

Note: You can reply directly to this email to contact ${payload.fullName} at ${payload.email}.
  `.trim();

  const mailOptions = {
    from: `"PhocieXpert Web Portal" <${fromAddress}>`,
    to: toAddress,
    replyTo: payload.email,
    subject: emailSubject,
    text: plainText,
    html: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
