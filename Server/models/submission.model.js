import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  content: String, // Base64 or URL
  uploadedBy: String,
});

const submissionSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  endDate: { type: String, required: true },
  endTime: { type: String, required: true },
  studentFile: fileSchema, // Optional, populated after student upload
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
