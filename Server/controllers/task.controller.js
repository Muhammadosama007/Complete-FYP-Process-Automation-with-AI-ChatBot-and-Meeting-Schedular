import * as taskService from '../services/task.service.js';

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
};

export const reorderTasks = async (req, res) => {
  await taskService.reorderTasks(req.body);
  res.status(200).json({ message: 'Tasks reordered' });
};
