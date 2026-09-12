import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import requestRoutes from './routes/request.routes.js';

/**
 * Resolve allowed CORS origins from FRONTEND_URL (comma-separated list),
 * falling back to the local Vite dev origin. Keeps local development
 * working through the proxy while avoiding a permissive "*" in production.
 */
function resolveAllowedOrigins() {
  return (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
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