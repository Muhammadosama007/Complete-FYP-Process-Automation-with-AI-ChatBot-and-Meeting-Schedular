import express from 'express';
import multer from 'multer';
import { createAdvisorRequest, advisorGetRequestsController, decideAdvisorRequestController, getRequestFileController } from '../controllers/request.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', authMiddleware, upload.single('file'), createAdvisorRequest);

router.get("/get", authMiddleware, advisorGetRequestsController);
router.get('/file/:requestId', getRequestFileController);
router.put("/:requestId/decision", authMiddleware, decideAdvisorRequestController);

export default router;
