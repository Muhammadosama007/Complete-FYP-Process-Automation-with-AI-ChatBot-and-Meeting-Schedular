import express from 'express';
import { getAvailableAdvisors } from '../controllers/advisor.controller.js';

const router = express.Router();

// Route: GET /api/advisors
router.get('/get', getAvailableAdvisors);

export default router;
