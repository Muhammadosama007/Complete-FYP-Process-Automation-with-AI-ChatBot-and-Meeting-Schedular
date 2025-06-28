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

  const invitee = await User.findOne({ email });
  if (!invitee) throw new Error('Invitee not found');
  if (invitee.role !== 'student') throw new Error('Only students can be invited');

  const alreadyInvited = invitee.pendingInvites.some(inv => inv.project.toString() === projectId);
  if (alreadyInvited) throw new Error('Invitation already sent');


  if (!project.members.includes(inviter._id)) {
    project.members.push(inviter._id);
    await project.save();
  }

  invitee.pendingInvites.push({ project: projectId });
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
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');

  const hasInvite = user.pendingInvites.some(invite => invite.project.toString() === projectId);
  if (!hasInvite) throw new Error('No pending invitation for this project');

  const oldProjectId = user.projectId ? user.projectId.toString() : null;

  user.projectId = projectId;

  user.pendingInvites = user.pendingInvites.filter(
    invite => invite.project.toString() !== projectId
  );
  await user.save();

  if (!project.members.some(id => id.toString() === userId.toString())) {
    project.members.push(userId);
    await project.save();
  }

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

