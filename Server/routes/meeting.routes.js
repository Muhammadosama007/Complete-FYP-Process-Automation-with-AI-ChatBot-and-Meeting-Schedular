import express from 'express';
import {
  createMeetingController,
  getAllMeetingsController,
  getMeetingByIdController,
  updateMeetingController,
  deleteMeetingController,
} from '../controllers/meeting.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getAllMeetingsController);
router.post('/', createMeetingController);
router.get('/:id', getMeetingByIdController);
router.put('/:id', updateMeetingController);
router.delete('/:id', deleteMeetingController);

export default router;
