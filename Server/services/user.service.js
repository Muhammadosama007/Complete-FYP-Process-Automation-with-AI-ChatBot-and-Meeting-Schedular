import User from '../models/user.model.js';
import Project from '../models/project.model.js';

export const findOrCreateUserByGoogle = async (googleProfile) => {
  try {
    const { googleId, name, email, image } = googleProfile;

    let user = await User.findOne({ googleId });

    if (!user) {
      let role = 'student';
      let faculty = null;
      let projectStanding = null;
      let creditHours = null;
      let gpa = null;
      let cgpa = null;
      let advisorProjects = null;
      let projectId = null;

      if (['tanveer.166666@gmail.com', 'ahmedali.1128844@gmail.com', 'jabbarakbar419@gmail.com'].includes(email)) {
        role = 'advisor';
        faculty = 'Software Engineering';
        advisorProjects = {
          maxCapacity: 5,
          active: 3,
          completed: 2,
        };
      } else if (['qasimali.po001@gmail.com', 'usmanpo777@gmail.com'].includes(email)) {
        role = 'po';
      } else {
        role = 'student';
        faculty = 'Software Engineering';
        projectStanding = 75;
        creditHours = 95;
        gpa = 3.5;
        cgpa = 3.4;

        const newProject = await Project.create({
          title: `${name}'s Project`,
          description: `Auto-created project for ${name}`,
        });

        projectId = newProject._id;
      }

      user = await User.create({
        googleId,
        name,
        email,
        image,
        role,
        faculty,
        projectStanding,
        creditHours,
        gpa,
        cgpa,
        advisorProjects,
        projectId,
      });
    }

    return user;
  } catch (err) {
    console.error('Error in findOrCreateUserByGoogle:', err);
    throw err;
  }
};


export const getAllUsers = async () => {
  return await User.find();
};

export const getAcceptedProjectMembers = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'projectId',
    populate: {
      path: 'members',
      select: 'name _id email',
    },
  });

  if (!user || !user.projectId) {
    throw new Error('User or Project not found');
  }

  return user.projectId.members;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).populate('projectId');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};