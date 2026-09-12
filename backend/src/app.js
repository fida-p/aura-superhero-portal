import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import requestRoutes from './routes/request.routes.js';

/**
 * Resolve allowed CORS origins from FRONTEND_URL (comma-separated list),
 * falling back to the local Vite dev origin. Keeps local development
 * working through the proxy while avoiding a permissive "*" in production.
 *
 * Browsers send `Origin` as scheme + host + port ONLY (no path), e.g.
 * "https://fida-p.github.io". A FRONTEND_URL that includes a sub-path
 * (e.g. ".../aura-superhero-portal/") would therefore never match, and the
 * browser would block the response while the server logs stay silent.
 * To tolerate both forms, every entry is normalized to its origin.
 */
function normalizeOrigin(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';
  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/+$/, '');
  }
}

function resolveAllowedOrigins() {
  return (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

/**
 * Creates and configures the Express application.
 * Kept separate from server.js so it is easy to test in isolation later.
 */
export default function createApp() {
  const app = express();

  // Global middleware
  app.use(cors({ origin: resolveAllowedOrigins(), methods: ['GET', 'POST'] }));
  app.use(express.json());

  // API routes
  app.use('/api', healthRoutes);
  app.use('/api', requestRoutes);

  // 404 fallback for unknown API routes
  app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // Global error handler (malformed JSON + unexpected errors)
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'Invalid JSON payload' });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}