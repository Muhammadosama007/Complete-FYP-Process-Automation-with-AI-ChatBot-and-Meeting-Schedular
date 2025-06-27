import Feedback from '../models/feedback.model.js';
import Project from '../models/project.model.js';
import User from '../models/user.model.js';
import httpStatus from 'http-status';
import ApiError from '../utils/api-error.js';
// GET: All feedbacks for a project
export const getProjectFeedbacks = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "Project not found");

    const feedbacks = await Feedback.find({ projectId }).sort({ createdAt: 1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    next(err);
  }
};

// POST: Create feedback (now accepts userId in body)


// Create a new feedback
export const createFeedback = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { message, senderName, userId } = req.body;

    if (!message?.trim()) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Message is required");
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    // Check if user is a project member or the advisor
    const isAdvisor = project.advisor?.toString() === userId;
    const isMember = project.members.map((m) => m.toString()).includes(userId);

    if (!isAdvisor && !isMember) {
      throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized to send feedback on this project");
    }

    const feedback = await Feedback.create({
      message,
      sender: userId,
      senderName,
      projectId,
    });

    res.status(httpStatus.CREATED).json(feedback);
  } catch (err) {
    next(err);
  }
};


// PUT: Update feedback (validate via body userId)
export const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message, userId } = req.body;

    if (!message?.trim()) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Message is required");
    }

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      throw new ApiError(httpStatus.NOT_FOUND, "Feedback not found");
    }

    if (feedback.sender.toString() !== userId) {
      throw new ApiError(httpStatus.FORBIDDEN, "You can only edit your own message");
    }

    feedback.message = message;
    feedback.updatedAt = new Date();

    const updated = await feedback.save();
    res.status(httpStatus.OK).json(updated);
  } catch (err) {
    next(err);
  }
};


// DELETE: Delete feedback (validate via query or body)
export const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      throw new ApiError(httpStatus.NOT_FOUND, "Feedback not found");
    }

    if (feedback.sender.toString() !== userId) {
      throw new ApiError(httpStatus.FORBIDDEN, "You can only delete your own message");
    }

    await Feedback.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    next(err);
  }
};
