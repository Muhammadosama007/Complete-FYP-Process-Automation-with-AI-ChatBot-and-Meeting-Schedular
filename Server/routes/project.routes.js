import express from 'express';
import { getAdvisorProjects,getStudentProjectId } from '../controllers/project.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/advisor', authMiddleware, getAdvisorProjects);
router.get('/student/project-id', authMiddleware, getStudentProjectId);

export default router;
