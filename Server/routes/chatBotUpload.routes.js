import express from 'express';
import multer from 'multer';
import { uploadFileController } from '../controllers/chatBotUpload.controller.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'chatBotUploads/'); // folder name
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), uploadFileController);

export default router;
