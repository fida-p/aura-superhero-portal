/**
 * Frontend runtime/build configuration (deployment-ready).
 *
 * API_BASE_URL points the frontend at the backend.
 *  - Locally, VITE_API_URL is unset, so we default to "/api", which is
 *    proxied to the Express server by vite.config.js during development.
 *  - In a deployed/static build, set VITE_API_URL (build-time env var) to the
 *    public URL of the Express API, e.g. https://your-api.example.com/api.
 *
 * No production URL or credential is hard-coded here.
 */

const configured = (import.meta.env.VITE_API_URL || '/api').trim();

// Drop any trailing slashes so consumers can safely append '/health', '/requests'.
export const API_BASE_URL = configured.replace(/\/+$/, '');