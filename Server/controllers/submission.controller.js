import Submission from "../models/submission.model.js";

// Create submission (advisor only)
export const createSubmission = async (req, res) => {
  try {
    const { projectId, endDate, endTime } = req.body;

    if (!projectId || !endDate || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const submission = await Submission.create({ projectId, endDate, endTime });
    res.status(201).json(submission);
  } catch (err) {
    console.error("Error creating submission:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all submissions for a project
export const getSubmissions = async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) return res.status(400).json({ message: "Missing projectId" });

    const submissions = await Submission.find({ projectId }).sort({ createdAt: 1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Student uploads file
export const uploadStudentFile = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { uploadedBy } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64Content = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const updated = await Submission.findByIdAndUpdate(
      submissionId,
      {
        studentFile: {
          name: file.originalname,
          content: base64Content,
          uploadedBy,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "File uploaded", file: updated.studentFile });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Server error" });
  }
};
