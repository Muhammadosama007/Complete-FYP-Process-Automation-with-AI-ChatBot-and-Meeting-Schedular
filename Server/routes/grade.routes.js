import express from "express";
import {
  createGrade,
  getGrades,
  markStudent,
} from "../controllers/grade.controller.js";

const router = express.Router();

router.post("/", createGrade); // Create new assessment
router.get("/", getGrades); // Get all grades for a project
router.post("/:gradeId/mark", markStudent); // Update individual student mark

export default router;
