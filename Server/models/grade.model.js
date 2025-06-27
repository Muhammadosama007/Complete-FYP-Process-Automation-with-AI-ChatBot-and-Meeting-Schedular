import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  obtained: { type: Number, default: 0 },
});

const gradeSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assessmentType: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  marks: [markSchema],
}, {
  timestamps: true,
});

export default mongoose.model("Grade", gradeSchema);
