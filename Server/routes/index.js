import { Router } from 'express';
import userRoutes from './user.route.js';
import taskRoutes from './task.route.js';
import teamRoutes from './team.route.js';
// import invitationRoutes from './invitation.route.js';
import requestRoutes from './request.route.js';
import meetingRoutes from './meeting.routes.js';
import advisorRoutes from './advisor.routes.js';
import notificationRoutes from './notification.routes.js';
import ideaRoutes from './idea.routes.js';
import chatRoutes from './chatBot.routes.js';
import uploadRoutes from './chatBotUpload.routes.js';
import announcementRoutes from './annoucment.routes.js';
import projectRoutes from './project.routes.js';
import materialRoutes from './material.routes.js';
import feedbackRoutes from './feedback.routes.js';
import groupFormRoutes from "./groupForm.routes.js";
import submissionsRoutes from "./submission.routes.js";
import gradeRoutes from "./grade.routes.js";
const router = Router();
router.use('/users', userRoutes);

router.use('/tasks', taskRoutes);

//router.use('/team', invitationRoutes);
router.use('/team', teamRoutes);
router.use('/requests', requestRoutes);
router.use('/meetings', meetingRoutes);
router.use('/advisors', advisorRoutes);
router.use('/notifications',notificationRoutes)
router.use('/ideas', ideaRoutes);
router.use('/chatBot',chatRoutes);
router.use('/chatBotUpload',uploadRoutes)
router.use('/announcements', announcementRoutes);
router.use('/projects', projectRoutes);
router.use('/materials', materialRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/group-formation', groupFormRoutes);
router.use('/submissions', submissionsRoutes);
router.use('/grades', gradeRoutes);

export default router;
