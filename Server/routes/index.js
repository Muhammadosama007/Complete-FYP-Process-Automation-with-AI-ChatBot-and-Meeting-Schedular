import { Router } from 'express';
import userRoutes from './user.route.js';
import taskRoutes from './task.route.js';
import teamRoutes from './team.route.js';
// import invitationRoutes from './invitation.route.js';
import requestRoutes from './request.route.js';
import meetingRoutes from './meeting.routes.js';
import advisorRoutes from './advisor.routes.js';
import notificationRoutes from './notification.routes.js';
const router = Router();
router.use('/users', userRoutes);

router.use('/tasks', taskRoutes);

//router.use('/team', invitationRoutes);
router.use('/team', teamRoutes);
router.use('/requests', requestRoutes);
router.use('/meetings', meetingRoutes);
router.use('/advisors', advisorRoutes);
router.use('/notifications',notificationRoutes)

export default router;
