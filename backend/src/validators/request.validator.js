const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * validateRequest — server-side validation of a help-request payload.
 * Runs independently of frontend validation. Returns an array of
 * per-field error objects (empty when the payload is valid).
 */
export function validateRequest(payload = {}) {
  const errors = [];
  const str = (v) => (typeof v === 'string' ? v.trim() : '');

  const name = str(payload.name);
  const location = str(payload.location);
  const request = str(payload.request);
  const email = str(payload.email);

  if (!name) {
    errors.push({ field: 'name', message: 'Name is required.' });
  }

  if (payload.age === undefined || payload.age === null || payload.age === '') {
    errors.push({ field: 'age', message: 'Age is required.' });
  } else {
    const n = Number(payload.age);
    if (!Number.isInteger(n) || n < 1 || n > 120) {
      errors.push({ field: 'age', message: 'Age must be a whole number between 1 and 120.' });
    }
  }

  if (!location) {
    errors.push({ field: 'location', message: 'Location is required.' });
  }

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!EMAIL_RE.test(email)) {
    errors.push({ field: 'email', message: 'Email is not valid.' });
  }

  if (!request) {
    errors.push({ field: 'request', message: 'Request is required.' });
  }

  return errors;
}