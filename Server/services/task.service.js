import Task from '../models/task.model.js';

export const getAllTasks = async () => {
  return Task.find();
};

export const createTask = async (taskData) => {
  return Task.create(taskData);
};

export const updateTask = async (id, updates) => {
  return Task.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteTask = async (id) => {
  return Task.findByIdAndDelete(id);
};

export const reorderTasks = async (reorderData) => {
  const bulkOps = reorderData.map(task => ({
    updateOne: {
      filter: { _id: task.id },
      update: { status: task.status, index: task.index }
    }
  }));

  return Task.bulkWrite(bulkOps);
};
