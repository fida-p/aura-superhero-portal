import nodemailer from 'nodemailer';

/**
 * escapeHtml — safely encode user-provided values before embedding them
 * in the HTML email body to prevent HTML/script injection.
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Unambiguous, server-generated timestamp (ISO 8601 / UTC). */
export function formatSubmittedAt(date = new Date()) {
  return date.toISOString();
}

/**
 * buildMailContent — pure builder for the help-request email.
 * Separated from the transporter so it can be unit-tested without SMTP.
 * Returns { subject, text, html }.
 */
export function buildMailContent({ name, age, location, email, request, submittedAt }) {
  const subject = 'New AURA Help Request';

  const text = [
    'AURA Help Portal',
    '=================',
    `Submitted: ${submittedAt}`,
    '',
    `Name: ${name}`,
    `Age: ${age}`,
    `Location: ${location}`,
    `Email: ${email}`,
    '',
    'Grievance / request:',
    String(request),
    '',
    'This is an automated notification from AURA — Guardian of Voices.',
  ].join('\n');

  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#1f2430;line-height:1.5">',
    '  <h2 style="margin:0 0 2px">AURA Help Portal</h2>',
    '  <p style="margin:0 0 20px;color:#6b7280">Guardian of Voices — automatic request notification</p>',
    `  <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>`,
    '  <table cellpadding="4" cellspacing="0" style="border-collapse:collapse">',
    `    <tr><td style="padding-right:14px"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>`,
    `    <tr><td style="padding-right:14px"><strong>Age</strong></td><td>${escapeHtml(age)}</td></tr>`,
    `    <tr><td style="padding-right:14px"><strong>Location</strong></td><td>${escapeHtml(location)}</td></tr>`,
    `    <tr><td style="padding-right:14px"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>`,
    '  </table>',
    '  <h3 style="margin:18px 0 4px">Grievance / request</h3>',
    `  <p style="white-space:pre-wrap;margin:0">${escapeHtml(request)}</p>`,
    '  <p style="margin-top:24px;color:#9ca3af;font-size:12px">Automated message — please do not reply to this email.</p>',
    '</div>',
  ].join('\n');

  return { subject, text, html };
}

let transporter;

/** Lazily build a single shared Nodemailer transport from env vars. */
function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return transporter;
}

/**
 * sendHelpRequestEmail — sends the help-request notification to MAIL_TO.
 * Resolves only after Nodemailer confirms successful delivery, so callers
 * never report success without real confirmation.
 */
export async function sendHelpRequestEmail(requestData) {
  const submittedAt = formatSubmittedAt();
  const content = buildMailContent({ ...requestData, submittedAt });

  const info = await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  return { submittedAt, messageId: info.messageId };
}