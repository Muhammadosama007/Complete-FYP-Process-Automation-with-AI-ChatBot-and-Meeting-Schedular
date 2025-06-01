import { Router } from 'express';
import userRoutes from './user.route.js';
import taskRoutes from './task.route.js';

const router = Router();
router.use('/users', userRoutes);

router.use('/tasks', taskRoutes);

export default router;
