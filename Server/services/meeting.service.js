import Meeting from '../models/meeting.model.js';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';
import Request from '../models/request.model.js';

// Create a new meeting
export const createMeetingService = async ({ requestId, date, time, agenda, meetingType, roomNumber }) => {
  const request = await Request.findById(requestId).populate('student');

  if (!request) throw new Error("Request not found");

  const meeting = new Meeting({
    student: request.student._id,
    advisor: request.advisor,
    requestId: request._id,
    projectId: request.projectId,
    date,
    time,
    agenda,
    meetingType,
    roomNumber: meetingType === "In-Person" ? roomNumber : "",
  });

  const savedMeeting = await meeting.save();

  // Notify all users in the same project
  const usersInProject = await User.find({ projectId: request.projectId });

  const notification = new Notification({
    message: `A new meeting has been scheduled on ${date} at ${time}`,
    projectId: request.projectId,
    seenBy: [],
    type: 'meeting',
  });

  await notification.save();

  return savedMeeting;
};

// Get all meetings
export const getAllMeetingsService = async () => {
  return await Meeting.find()
    .populate("student", "name email")
    .populate("advisor", "name email")
    .populate("requestId", "status")
    .populate("projectId", "title");
};

// Get meeting by ID
export const getMeetingByIdService = async (id) => {
  return await Meeting.findById(id).populate('student');
};

// Update a meeting
export const updateMeetingService = async (id, updatedData) => {
  return await Meeting.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete a meeting
export const deleteMeetingService = async (id) => {
  return await Meeting.findByIdAndDelete(id);
};
