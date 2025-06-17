import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, enum: ['student', 'advisor', 'po'], default: 'student' },
  faculty: { type: String },
  projectStanding: { type: Number, min: 0, max: 100 },
  creditHours: { type: Number },
  gpa: { type: Number, min: 0, max: 4 },
  cgpa: { type: Number, min: 0, max: 4 },
  advisorProjects: {
    maxCapacity: { type: Number, default: 5 },
    active: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
  },
  notifications: [{
  type: { type: String },
  message: { type: String },
  link: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}],
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null},
  pendingInvites: [{
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  invitedAt: { type: Date, default: Date.now }
}],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
