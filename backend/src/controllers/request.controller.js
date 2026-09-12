import { validateRequest } from '../validators/request.validator.js';
import { sendHelpRequestEmail } from '../services/email.service.js';

/**
 * POST /api/requests
 * Validates the body, then emails the request to the configured recipient.
 * Only reports success after Nodemailer confirms delivery; otherwise it
 * returns a generic 500 so the frontend never shows a fake "sent" state.
 */
export async function createRequest(req, res) {
  const errors = validateRequest(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  try {
    const result = await sendHelpRequestEmail(req.body);
    return res.status(201).json({
      status: 'ok',
      message: 'Request submitted successfully',
      submittedAt: result.submittedAt,
    });
  } catch (err) {
    // Log a concise message server-side only. Never expose SMTP details,
    // credentials, or stack traces to the client.
    console.error('Help request email send failed:', err.message);
    return res.status(500).json({
      message: 'We could not submit your request right now. Please try again later.',
    });
  }
}