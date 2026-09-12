import { chatMessages } from '../data/chat.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * validateField — validates a single collected detail.
 * Returns { valid: boolean, message?: string }. Messages come from
 * data/chat.js so copy stays configurable and separate from logic.
 */
export function validateField(key, value) {
  const text = String(value ?? '').trim();
  const errors = chatMessages.errors;

  switch (key) {
    case 'name':
      return text ? { valid: true } : { valid: false, message: errors.name.required };

    case 'age': {
      if (!text) return { valid: false, message: errors.age.required };
      const n = Number(text);
      if (!Number.isInteger(n) || n < 1 || n > 120) {
        return { valid: false, message: errors.age.invalid };
      }
      return { valid: true };
    }

    case 'location':
      return text ? { valid: true } : { valid: false, message: errors.location.required };

    case 'email': {
      if (!text) return { valid: false, message: errors.email.required };
      if (!EMAIL_RE.test(text)) {
        return { valid: false, message: errors.email.invalid };
      }
      return { valid: true };
    }

    case 'request':
      return text ? { valid: true } : { valid: false, message: errors.request.required };

    default:
      return { valid: true };
  }
}