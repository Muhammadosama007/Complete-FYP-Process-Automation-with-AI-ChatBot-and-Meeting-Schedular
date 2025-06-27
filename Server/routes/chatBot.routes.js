
import express from 'express';
import { askChatbot } from '../controllers/chat.controller.js';

const router = express.Router();
router.post('/ask', askChatbot);
export default router;
