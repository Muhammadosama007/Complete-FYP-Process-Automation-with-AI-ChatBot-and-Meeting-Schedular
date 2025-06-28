import Request from '../models/request.model.js';
import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import Notification from '../models/notification.model.js';

export const createAdvisorRequestService = async (studentId, advisorId, file) => {
  const student = await User.findById(studentId);
  if (!student || student.role !== 'student') {
    const err = new Error('Only students can send advisor requests.');
    err.statusCode = 403;
    throw err;
  }

  const advisor = await User.findById(advisorId);
  if (!advisor || advisor.role !== 'advisor') {
    const err = new Error('Advisor not found.');
    err.statusCode = 404;
    throw err;
  }

  const projectId = student.projectId;
  if (!projectId) {
    const err = new Error('Student must be part of a project group.');
    err.statusCode = 400;
    throw err;
  }

  //   const existing = await Request.findOne({ student: studentId, advisor: advisorId, status: 'Pending' });
  // if (existing) {
  //   const err = new Error('You have already sent a request to this advisor.');
  //   err.statusCode = 400;
  //   throw err;
  // }    

  const newRequest = new Request({
    student: studentId,
    advisor: advisorId,
    projectId,
    file: file
      ? {
        data: file.buffer,
        contentType: file.mimetype,
        fileName: file.originalname
      }
      : undefined,
    status: 'Pending'
  });

  const savedRequest = await newRequest.save();

  await Notification.create({
    message: `${student.name} has requested you as advisor.`,
    type: 'request',
    receiverId: advisorId,
  });

  return savedRequest;
};


export const getAdvisorRequestsService = async (advisorId) => {
  return await Request.find({ advisor: advisorId })
    .populate("student", "name email")
    .populate("projectId", "title")
    .sort({ createdAt: -1 });
};

export const getRequestFileService = async (requestId) => {
  const req = await Request.findById(requestId);
  if (!req || !req.file?.data) {
    const err = new Error('File not found');
    err.statusCode = 404;
    throw err;
  }

  return {
    file: req.file.data,
    fileName: req.file.fileName,
    contentType: req.file.contentType,
  };
};

export const decideRequestService = async ({ requestId, decision, feedback }) => {
  const req = await Request.findById(requestId).populate("student advisor");
  if (!req) throw new Error("Request not found");

  req.status = decision;
  if (decision === "Rejected") req.feedback = feedback;
  await req.save();

  const studentId = req.student._id;
  const project = await Project.findById(req.projectId);

  if (decision === "Approved") {
    if (!project.members.includes(studentId)) project.members.push(studentId);
    if (!project.advisor) project.advisor = req.advisor._id;
    if (!project.owner) project.owner = req.advisor._id;
    req.feedback = feedback;
    await project.save();

    await User.findByIdAndUpdate(req.advisor._id, { $inc: { "advisorProjects.active": 1 } });
    await User.findByIdAndUpdate(studentId, {
      projectId: project._id,
    });

    //Notification for project approval
    await Notification.create({
      message:` Advisor ${req.advisor.name} has approved the project. Feedback: ${feedback}`,
      projectId: project._id,
      type: 'request'
    });

  } else {
    await User.findByIdAndUpdate(studentId, {
      projectId: project._id,
    });

    //Notification for project rejection
    await Notification.create({
      message: `Advisor ${req.advisor.name} has rejected the project. Feedback: ${feedback}`,
      projectId: project._id,
      type: 'request'
    });
  }

  return req;
};
