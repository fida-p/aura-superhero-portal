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
 * Separated from the sender so it can be unit-tested without network.
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

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * sendHelpRequestEmail — sends the help-request notification to MAIL_TO
 * via the Resend HTTP API (port 443, works on hosts that block SMTP).
 * Resolves only after Resend confirms acceptance, so callers never
 * report success without real confirmation. Rejects otherwise.
 */
export async function sendHelpRequestEmail(requestData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!apiKey) {
    throw new Error('Email service is not configured (missing RESEND_API_KEY).');
  }
  if (!from || !to) {
    throw new Error('Email service is not configured (missing MAIL_FROM or MAIL_TO).');
  }

  const submittedAt = formatSubmittedAt();
  const content = buildMailContent({ ...requestData, submittedAt });

  let res;
  try {
    res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: content.subject,
        text: content.text,
        html: content.html,
        reply_to: requestData.email,
      }),
    });
  } catch (err) {
    // Network-level failure (DNS, blocked egress, ...). Never include the
    // key, addresses, or payload in the thrown message.
    throw new Error(`Email API request failed: ${err.message}`);
  }

  if (!res.ok) {
    // Resend returns JSON like { message: "..." } on 4xx. Read it for the
    // server log, but never forward raw provider details to the client —
    // the controller maps every failure to a generic 500.
    const detail = await res.text().catch(() => '');
    throw new Error(`Email API rejected the request (status ${res.status}): ${detail.slice(0, 300)}`);
  }

  const data = await res.json().catch(() => ({}));

  return { submittedAt, messageId: data.id };
}