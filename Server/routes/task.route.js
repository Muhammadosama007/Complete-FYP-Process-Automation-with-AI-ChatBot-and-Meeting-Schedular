import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  bulkReorderTasks,
} from '../controllers/task.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); 

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/bulk/reorder', bulkReorderTasks);

export default router;
