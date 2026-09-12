import { API_BASE_URL } from '../config/env.js';

/**
 * submitHelpRequest — sends a completed help request to the backend.
 * Uses API_BASE_URL (defaults to "/api" locally via the Vite proxy,
 * overridable at build time with VITE_API_URL for deployment).
 */
export async function submitHelpRequest(payload) {
  const res = await fetch(`${API_BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || 'Submission failed');
  }

  return data;
}