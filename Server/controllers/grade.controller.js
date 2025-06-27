import Grade from "../models/grade.model.js";
import Project from "../models/project.model.js";

// Create a new assessment and auto-fill students
export const createGrade = async (req, res) => {
  try {
    const { projectId, assessmentType, totalMarks } = req.body;

    const project = await Project.findById(projectId).populate("members");
    if (!project) return res.status(404).json({ message: "Project not found" });

    const marks = project.members.map((student) => ({
      student: student._id,
      obtained: 0,
    }));

    const grade = await Grade.create({
      projectId,
      assessmentType,
      totalMarks,
      marks,
    });

    const populatedGrade = await Grade.findById(grade._id).populate("marks.student", "name");
    res.status(201).json(populatedGrade);
  } catch (error) {
    console.error("Error creating grade:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all grades for a project
export const getGrades = async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ message: "Missing projectId" });

    const grades = await Grade.find({ projectId }).populate("marks.student", "name");
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a student's mark
export const markStudent = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { studentId, obtained } = req.body;

    const grade = await Grade.findById(gradeId);
    if (!grade) return res.status(404).json({ message: "Grade not found" });

    const mark = grade.marks.find(m => m.student.toString() === studentId);
    if (!mark) return res.status(404).json({ message: "Student not found in marks" });

    mark.obtained = obtained;
    await grade.save();

    const updated = await Grade.findById(gradeId).populate("marks.student", "name");
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating mark:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
