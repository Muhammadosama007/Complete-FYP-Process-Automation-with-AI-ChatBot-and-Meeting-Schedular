import express from 'express';
import { inviteMemberController, acceptInviteController } from '../controllers/team.controller.js';

const router = express.Router();

router.post('/invite', inviteMemberController);
router.post('/accept-invite', acceptInviteController);

export default router;
