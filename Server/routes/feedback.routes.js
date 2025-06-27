import express from 'express';
import {
  getProjectFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedback.controller.js';


const router = express.Router();

// GET all feedbacks for a project
router.get('/:projectId',  getProjectFeedbacks);

// POST a new feedback for a project
router.post('/:projectId',  createFeedback);

// PUT update feedback
router.put('/:id',  updateFeedback);

// DELETE feedback
router.delete('/:id',  deleteFeedback);

export default router;
