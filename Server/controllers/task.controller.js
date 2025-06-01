import httpStatus from 'http-status';
import Task from '../models/task.model.js';
import ApiError from '../utils/api-error.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ index: 1 });
    res.status(httpStatus.OK).json( tasks );
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, index } = req.body;

    if (!title || index === undefined) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Title and index are required'));
    }

    const task = await Task.create({
      title,
      description,
      status,
      index,
      createdBy: req.userId || null,
    });

    res.status(httpStatus.CREATED).json( task );
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));
    }

    res.status(httpStatus.OK).json( task );
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));
    }

    res.status(httpStatus.OK).json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

// Optional: bulk reorder after drag-and-drop
export const bulkReorderTasks = async (req, res, next) => {
  try {
    const { reorderedTasks } = req.body; // [{ _id, status, index }]

    const bulkOps = reorderedTasks.map(task => ({
      updateOne: {
        filter: { _id: task._id },
        update: { status: task.status, index: task.index },
      },
    }));

    await Task.bulkWrite(bulkOps);

    res.status(httpStatus.OK).json({ message: 'Tasks reordered successfully' });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};
