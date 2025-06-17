import httpStatus from 'http-status';
import ApiError from '../utils/api-error.js';
import {
  createMeetingService,
  getAllMeetingsService,
  getMeetingByIdService,
  updateMeetingService,
  deleteMeetingService,
} from '../services/meeting.service.js';

// Create meeting
export const createMeetingController = async (req, res, next) => {
  try {
    const meeting = await createMeetingService(req.body);
    res.status(httpStatus.CREATED).json(meeting);
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

// Get all meetings
export const getAllMeetingsController = async (req, res, next) => {
  try {
    const meetings = await getAllMeetingsService();
    res.status(httpStatus.OK).json(meetings);
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

// Get meeting by ID
export const getMeetingByIdController = async (req, res, next) => {
  try {
    const meeting = await getMeetingByIdService(req.params.id);
    if (!meeting) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
    }
    res.status(httpStatus.OK).json(meeting);
  } catch (err) {
    next(new ApiError(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

// Update meeting
export const updateMeetingController = async (req, res, next) => {
  try {
    const updated = await updateMeetingService(req.params.id, req.body);
    if (!updated) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
    }
    res.status(httpStatus.OK).json(updated);
  } catch (err) {
    next(new ApiError(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

// Delete meeting
export const deleteMeetingController = async (req, res, next) => {
  try {
    const deleted = await deleteMeetingService(req.params.id);
    if (!deleted) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
    }
    res.status(httpStatus.OK).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    next(new ApiError(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};
