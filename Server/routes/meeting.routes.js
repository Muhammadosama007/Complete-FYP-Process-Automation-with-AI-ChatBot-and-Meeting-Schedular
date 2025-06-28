import express from 'express';
import {
  createMeetingController,
  getAllMeetingsController,
  getMeetingByIdController,
  updateMeetingController,
  deleteMeetingController,
  getMeetingsByProjectIdController
} from '../controllers/meeting.controller.js';


const router = express.Router();

router.get('/', getAllMeetingsController);
router.post('/', createMeetingController);
router.get('/:id', getMeetingByIdController);
router.put('/:id', updateMeetingController);
router.delete('/:id', deleteMeetingController);

router.get("/project/:projectId", getMeetingsByProjectIdController);



export default router;
