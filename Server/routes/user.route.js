import express from 'express';
import {
  googleLoginController,
  getAllUsersController,
  getAcceptedMembersController
} from '../controllers/user.controller.js';

const user = express.Router();

user.post('/google-login', googleLoginController);
user.get('/get', getAllUsersController);
user.get('/accepted-members', getAcceptedMembersController);

export default user;
