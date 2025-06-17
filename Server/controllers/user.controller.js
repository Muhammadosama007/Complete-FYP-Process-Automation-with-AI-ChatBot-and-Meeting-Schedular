import httpStatus from 'http-status';
import { findOrCreateUserByGoogle, getAllUsers } from '../services/user.service.js';
import ApiError from '../utils/api-error.js';
import { getAcceptedProjectMembers } from '../services/user.service.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const googleLoginController = async (req, res, next) => {
  try {
    const { googleId, name, email, image } = req.body;

    if (!googleId || !email || !name) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields'));
    }

    const user = await findOrCreateUserByGoogle({ googleId, name, email, image });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // you can add more fields if needed
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Return token along with user
    res.status(httpStatus.OK).json({
      message: 'User logged in successfully via Google',
      user,
      token,
    });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(httpStatus.OK).json({
      message: 'Users fetched successfully',
      users,
    });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const getAcceptedMembersController = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'userId is required' });
    }

    const members = await getAcceptedProjectMembers(userId);

    res.status(httpStatus.OK).json({
      message: 'Accepted members fetched successfully',
      members,
    });
  } catch (err) {
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message));
  }
};

export const getNotificationsController = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) return next(new ApiError(404, 'User not found.'));
  res.json({ notifications: user.notifications });
};