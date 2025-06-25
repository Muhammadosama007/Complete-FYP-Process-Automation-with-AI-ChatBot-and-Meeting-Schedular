import express from 'express';
import {
  googleLoginController,
  getAllUsersController,
  getAcceptedMembersController,
  getNotificationsController,
  getUserByIdController,
} from '../controllers/user.controller.js';

const user = express.Router();

user.post('/google-login', googleLoginController);
user.get('/get', getAllUsersController);
user.get('/accepted-members', getAcceptedMembersController);
user.get('/:userId/notifications', getNotificationsController);
user.get('/:userId', getUserByIdController); 

export default user;
