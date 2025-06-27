// // models/announcement.model.js
// import mongoose from 'mongoose';

// const announcementSchema = new mongoose.Schema({
//   subject: { type: String, required: true },
//   description: { type: String, required: true },
//   date: { type: Date, required: true },
//   attachment: {
//     name: String,
//     content: String, // base64 string
//   },
//   advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // targeting multiple projects
// }, { timestamps: true });

// const Announcement = mongoose.model('Announcement', announcementSchema);
// export default Announcement;

import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  subject: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true }, // ISO date format (from frontend)
  attachment: {
    name: String,
    content: String, // base64 or URL
  },
  type: { type: String, enum: ['advisor', 'po'], required: true }
}, { timestamps: true });

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
