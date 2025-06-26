// models/material.model.js
import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  subject: { type: String, required: true },
  description: { type: String },
  attachment: {
    name: String,
    content: String, // base64 or URL
  }
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);
export default Material;
