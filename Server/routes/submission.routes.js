import express from "express";
import multer from "multer";
import {
  createSubmission,
  getSubmissions,
  uploadStudentFile,
} from "../controllers/submission.controller.js";

const router = express.Router();
const upload = multer(); // Memory storage

// Create a submission (advisor only)
router.post("/", createSubmission);

// Get all submissions for a project
router.get("/", getSubmissions);

// Student uploads file to a submission
router.post("/:submissionId/upload", upload.single("file"), uploadStudentFile);

export default router;
