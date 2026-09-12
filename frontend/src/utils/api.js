import { API_BASE_URL } from '../config/env.js';

/**
 * submitHelpRequest — sends a completed help request to the backend.
 * Uses API_BASE_URL (defaults to "/api" locally via the Vite proxy,
 * overridable at build time with VITE_API_URL for deployment).
 */
export async function submitHelpRequest(payload) {
  const url = `${API_BASE_URL}/requests`;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Network-level failure (DNS, offline, CORS-blocked preflight, ...).
    // Only the URL and status-ish info are logged — never the payload.
    console.error(`[AURA] help request failed before a response: POST ${url}`, err);
    throw new Error('Submission failed');
  }

  // Safe diagnostics: endpoint URL + HTTP status only (no payload, no headers).
  console.info(`[AURA] help request response: POST ${url} -> ${res.status}`);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(`[AURA] help request rejected: POST ${url} -> ${res.status}`);
    throw new Error(data?.message || 'Submission failed');
  }

  return data;
}