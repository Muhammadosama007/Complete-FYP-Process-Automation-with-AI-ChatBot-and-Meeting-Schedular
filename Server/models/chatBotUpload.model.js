import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  originalName: String,
  fileName: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('ChatUpload', uploadSchema);
