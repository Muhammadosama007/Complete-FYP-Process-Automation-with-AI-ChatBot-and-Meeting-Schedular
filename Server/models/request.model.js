import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  feedback: String,
}, { timestamps: true });

export default mongoose.model('Request', requestSchema);
