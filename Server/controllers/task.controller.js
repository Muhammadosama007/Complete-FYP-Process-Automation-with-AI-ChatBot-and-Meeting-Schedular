import httpStatus from 'http-status';
import Task from '../models/task.model.js';
import User from '../models/user.model.js';
import ApiError from '../utils/api-error.js';


import Project from '../models/project.model.js'; // ⬅️ Import this

const getUserProjectId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User not found');
  }

  // If student, use their direct projectId
  if (user.role === 'student' && user.projectId) {
    return user.projectId.toString();
  }

  // If advisor, find their assigned project
  if (user.role === 'advisor') {
    const project = await Project.findOne({ advisor: userId });
    if (project) {
      return project._id.toString();
    }
  }

  throw new ApiError(httpStatus.FORBIDDEN, 'User not part of any project');
};

export const getAllTasks = async (req, res, next) => {
  try {
    const userProjectId = await getUserProjectId(req.userId);
    const tasks = await Task.find({ projectId: userProjectId }).sort({ index: 1 });
    res.status(httpStatus.OK).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, index } = req.body;

    if (!title || index === undefined) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Title and index are required'));
    }

    const userProjectId = await getUserProjectId(req.userId);

    const task = await Task.create({
      title,
      description,
      status,
      index,
      createdBy: req.userId,
      projectId: userProjectId
    });

    res.status(httpStatus.CREATED).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) return next(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));

    const userProjectId = await getUserProjectId(req.userId);
    if (task.projectId.toString() !== userProjectId) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'You cannot update tasks from another project'));
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    res.status(httpStatus.OK).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return next(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));

    const userProjectId = await getUserProjectId(req.userId);
    if (task.projectId.toString() !== userProjectId) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'You cannot delete tasks from another project'));
    }

    await Task.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const bulkReorderTasks = async (req, res, next) => {
  try {
    const { reorderedTasks } = req.body;

    if (!Array.isArray(reorderedTasks) || reorderedTasks.length === 0) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'No tasks provided for reordering'));
    }

    const userProjectId = await getUserProjectId(req.userId);

    // Validate all tasks belong to the current user's project
    const taskIds = reorderedTasks.map(t => t._id);
    const tasks = await Task.find({ _id: { $in: taskIds } });

    // Instead of rejecting all if one is invalid, filter out invalid ones
    const validTaskIds = tasks
      .filter(t => t.projectId.toString() === userProjectId)
      .map(t => t._id.toString());

    const bulkOps = reorderedTasks
      .filter(task => validTaskIds.includes(task._id.toString()))
      .map(task => ({
        updateOne: {
          filter: { _id: task._id },
          update: {
            status: task.status,
            index: task.index,
          },
        },
      }));

    if (bulkOps.length === 0) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'No valid tasks to reorder'));
    }

    await Task.bulkWrite(bulkOps);

    res.status(httpStatus.OK).json({ message: 'Tasks reordered successfully' });
  } catch (err) {
    next(err);
  }
};
