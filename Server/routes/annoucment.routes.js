import express from 'express';
import multer from 'multer';
import { createAnnouncement, getAnnouncementsByProject } from '../controllers/annoucment.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // temporary upload folder

router.post('/', upload.single('attachment'), createAnnouncement);
router.get('/', getAnnouncementsByProject);

export default router;
