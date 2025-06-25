
import Project from '../models/project.model.js';
import User from '../models/user.model.js'; 
export const getAdvisorProjects = async (req, res) => {
  try {
    const userId = req.userId; 

    const projects = await Project.find({ advisor: userId })
      .populate('members', 'name email')
      .populate('owner', 'name email');

    const formattedProjects = projects.map(project => ({
      id: project._id,
      title: project.title,
      status: project.status,
      students: project.members.map(member => member.name).join(', ')
    }));

    res.status(200).json(formattedProjects);
  } catch (error) {
    console.error('Advisor project fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudentProjectId = async (req, res) => {
  try {
    const userId = req.userId; // from authMiddleware

    const user = await User.findById(userId).select('projectId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.projectId) {
      return res.status(404).json({ message: 'No project assigned' });
    }

    res.status(200).json({ projectId: user.projectId });
  } catch (error) {
    console.error('Error fetching project ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};