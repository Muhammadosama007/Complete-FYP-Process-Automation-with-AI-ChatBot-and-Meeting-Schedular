import { Router } from 'express';
import userRoutes from './user.route.js';
import taskRoutes from './task.route.js';
import teamRoutes from './team.route.js';
// import invitationRoutes from './invitation.route.js';

const router = Router();
router.use('/users', userRoutes);

router.use('/tasks', taskRoutes);

//router.use('/team', invitationRoutes);
router.use('/team', teamRoutes);

export default router;
