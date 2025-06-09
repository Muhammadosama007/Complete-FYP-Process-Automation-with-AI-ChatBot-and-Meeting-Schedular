import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const inviteMember = async ({ email, projectId, inviterId }) => {
  const inviter = await User.findById(inviterId);
  if (!inviter) throw new Error('Inviter not found');

  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');

  if (inviter.role !== 'student') throw new Error('Only students can invite members');

  let invitee = await User.findOne({ email });
  if (!invitee) throw new Error('Invitee not found');

  if (invitee.role !== 'student') throw new Error('Only students can be invited');

  // Remove this blocking line so inviter can invite even if invitee already has a project
  // if (invitee.projectId) throw new Error('Invitee already has a project');

  if (invitee.pendingInvites.includes(projectId)) throw new Error('Invitation already sent');

  invitee.pendingInvites.push(projectId);
  await invitee.save();

  const acceptLink = `${process.env.FRONTEND_URL}/accept-invite?projectId=${projectId}&userId=${invitee._id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'FYP Project Invitation',
    html: `
      <p>Hi ${invitee.name},</p>
      <p>${inviter.name} has invited you to join their FYP project.</p>
      <p>Click <a href="${acceptLink}">here</a> to accept the invitation.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const acceptInvite = async ({ userId, projectId }) => {
  console.log('acceptInvite called with:', { userId, projectId });

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');

  // ✅ If already accepted, return early
  if (user.projectId?.toString() === projectId && !user.pendingInvites.includes(projectId)) {
    return; // Already accepted
  }

  // ✅ Check if invite is pending
  if (!user.pendingInvites.some(invite => invite._id.toString() === projectId)) {
    throw new Error('No pending invitation for this project');
  }

  const oldProjectId = user.projectId ? user.projectId.toString() : null;

  user.projectId = projectId;

  user.pendingInvites = user.pendingInvites.filter(
    invite => invite._id.toString() !== projectId
  );
  if (!project.members.some(memberId => memberId.toString() === userId.toString())) {
    project.members.push(userId);
    await project.save();
  }

  // ✅ Remove from old project
  if (oldProjectId && oldProjectId !== projectId) {
    const oldProject = await Project.findById(oldProjectId);
    if (oldProject) {
      oldProject.members = oldProject.members.filter(
        memberId => memberId.toString() !== userId.toString()
      );
      await oldProject.save();
    }
  }
};

