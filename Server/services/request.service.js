import Request from '../models/request.model.js';
import User from '../models/user.model.js';
import Project from '../models/project.model.js';

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

    return await newRequest.save();
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
  const req = await Request.findById(requestId);
  if (!req) throw new Error("Request not found");

  req.status = decision;
  if (decision === "Rejected") req.feedback = feedback;
  await req.save();

  const studentId = req.student;

  if (decision === "Approved") {
    const project = await Project.findById(req.projectId);
    if (!project.members.includes(studentId)) project.members.push(studentId);
    if (!project.owner) project.owner = req.advisor;
    await project.save();

    await User.findByIdAndUpdate(req.advisor, { $inc: { "advisorProjects.active": 1 } });
    await User.findByIdAndUpdate(studentId, {
      projectId: project._id,
      $push: {
        notifications: {
          type: "request_approved",
          message: "Your project request was approved.",
          link: "/student/dashboard",
        },
      },
    });
  } else {
    await User.findByIdAndUpdate(studentId, {
      $push: {
        notifications: {
          type: "request_rejected",
          message: `Your request was rejected. Feedback: ${feedback}`,
          link: "/student/dashboard/feedback",
        },
      },
    });
  }

  return req;
};