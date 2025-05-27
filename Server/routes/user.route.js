import express from 'express';
import {
  googleLoginController,
  getAllUsersController,
} from '../controllers/user.controller.js';

const user = express.Router();

user.post('/google-login', googleLoginController);
user.get('/get', getAllUsersController);

export default user;
