import { Router } from 'express';
import { createRequest } from '../controllers/request.controller.js';

const router = Router();

/**
 * POST /api/requests
 * Submits a validated help request and emails it to the configured recipient.
 */
router.post('/requests', createRequest);

export default router;