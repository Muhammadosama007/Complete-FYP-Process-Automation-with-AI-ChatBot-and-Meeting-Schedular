import httpStatus from 'http-status';
import ApiError from '../utils/api-error.js';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'No user ID provided in headers'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(httpStatus.FORBIDDEN, 'Invalid user'));
    }

    req.userId = user._id;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
