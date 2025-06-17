import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'initiated' },
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
