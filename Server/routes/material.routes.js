// routes/material.routes.js
import express from 'express';
import multer from 'multer';
import { createMaterial, getMaterialsByProject } from '../controllers/material.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('attachment'), createMaterial);
router.get('/', getMaterialsByProject);

export default router;
