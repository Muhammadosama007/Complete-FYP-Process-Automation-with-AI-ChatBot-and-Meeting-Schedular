import express from 'express';
import { getNotificationsForUser, markAllNotificationsAsSeen } from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', getNotificationsForUser);
router.patch('/mark-seen', markAllNotificationsAsSeen);

export default router;
