import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import httpStatus from 'http-status';

export const getAvailableAdvisors = async (req, res, next) => {
  try {
    const advisors = await User.find({ role: 'advisor' }).select('name email _id');

    // For each advisor, count their active projects
    const advisorList = await Promise.all(
      advisors.map(async (advisor) => {
        const count = await Project.countDocuments({ owner: advisor._id });
        return {
          _id: advisor._id,
          name: advisor.name,
          email: advisor.email,
          isAvailable: count < 5,
          projectCount: count
        };
      })
    );

    res.status(httpStatus.OK).json({ advisors: advisorList });
  } catch (err) {
    next(err);
  }
};
