import express from 'express';
import { submitIdea } from '../controllers/idea.controller.js';
import { askAndCheckIdea } from '../controllers/askAndCheckIdea.controller.js';

const router = express.Router();
router.post('/submit', submitIdea);
router.post('/check-idea-smart', askAndCheckIdea);
export default router;
    