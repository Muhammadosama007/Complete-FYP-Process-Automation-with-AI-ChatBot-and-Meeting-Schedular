import httpStatus from 'http-status';
import { inviteMember, acceptInvite } from '../services/team.service.js';
import ApiError from '../utils/api-error.js';

export const inviteMemberController = async (req, res, next) => {
  try {
    const { email, projectId, inviterId } = req.body;
    await inviteMember({ email, projectId, inviterId });
    res.status(httpStatus.OK).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
};

export const acceptInviteController = async (req, res, next) => {
  try {
    const { userId, projectId } = req.body;
    if (!userId || !projectId) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'userId and projectId are required' });
    }
    await acceptInvite({ userId, projectId });
    res.status(httpStatus.OK).json({ message: 'Invitation accepted successfully' });
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
};
