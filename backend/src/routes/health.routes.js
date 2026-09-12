import { Router } from 'express';

const router = Router();

/**
 * GET /api/health
 * Minimal health-check endpoint used to confirm the backend is running.
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AURA backend is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;