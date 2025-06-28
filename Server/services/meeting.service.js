import Meeting from '../models/meeting.model.js';
import User from '../models/user.model.js';
import Request from '../models/request.model.js';
import Notification from '../models/notification.model.js';
// import Request from '../models/request.model.js';

// Create a new meeting
import Project from '../models/project.model.js';

export const createMeetingService = async ({
  requestId,
  projectId,
  date,
  time,
  agenda,
  meetingType,
  roomNumber,
  onlineLink,
}) => {
  let student = null;
  let advisor = null;
  let resolvedProjectId = projectId;

  if (requestId) {
    const request = await Request.findById(requestId).populate("student advisor");
    if (!request) throw new Error("Request not found");

    student = request.student._id;
    advisor = request.advisor;
    resolvedProjectId = request.projectId;
  } else {
    if (!projectId) throw new Error("Either requestId or projectId is required");

    const project = await Project.findById(projectId).populate("members advisor");
    if (!project) throw new Error("Project not found");

    student = project.members?.[0]?._id; // You can modify this logic
    advisor = project.advisor;
  }

  const meeting = new Meeting({
    student,
    advisor,
    requestId: requestId || null,
    projectId: resolvedProjectId,
    date,
    time,
    agenda,
    meetingType,
    roomNumber: meetingType === "In-Person" ? roomNumber : "",
    onlineLink: meetingType === "Online" ? onlineLink : "",
  });

  const savedMeeting = await meeting.save();

  // Notify all users in the same project
  const usersInProject = await User.find({ projectId: resolvedProjectId });

  const notification = new Notification({
    message: `A new meeting has been scheduled on ${date} at ${time}`,

    projectId: resolvedProjectId,
    seenBy: [],
    type: "meeting",

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
  const updatePayload = {
    ...updatedData,
    roomNumber: updatedData.meetingType === "In-Person" ? updatedData.roomNumber : "",
    onlineLink: updatedData.meetingType === "Online" ? updatedData.onlineLink : "",
  };

  return await Meeting.findByIdAndUpdate(id, updatePayload, { new: true });
};

// Delete a meeting
export const deleteMeetingService = async (id) => {
  return await Meeting.findByIdAndDelete(id);
};
