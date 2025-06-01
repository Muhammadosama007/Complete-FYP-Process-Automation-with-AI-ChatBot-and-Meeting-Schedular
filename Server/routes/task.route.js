import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  bulkReorderTasks,
} from '../controllers/task.controller.js';


const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/reorder', bulkReorderTasks); 

export default router;
