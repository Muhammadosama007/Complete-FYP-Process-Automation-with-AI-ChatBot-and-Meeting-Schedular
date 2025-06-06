import httpStatus from 'http-status';
import { findOrCreateUserByGoogle, getAllUsers } from '../services/user.service.js';
import ApiError from '../utils/api-error.js';

export const googleLoginController = async (req, res, next) => {
  try {
    const { googleId, name, email, image } = req.body;

    if (!googleId || !email || !name) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Missing required fields'));
    }
    

    const user = await findOrCreateUserByGoogle({ googleId, name, email, image });
    res.status(httpStatus.OK).json({
      message: 'User logged in successfully via Google',
      user,
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
