import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, enum: ['student', 'advisor', 'po'], default: 'student' },
  
  // New fields
  faculty: { type: String }, // For 'student' and 'advisor' roles
  
  // Student-specific fields
  projectStanding: { type: Number, min: 0, max: 100 }, // percentage
  creditHours: { type: Number },
  gpa: { type: Number, min: 0, max: 4 },
  cgpa: { type: Number, min: 0, max: 4 },

  // Advisor-specific fields
  advisorProjects: {
    maxCapacity: { type: Number, default: 5 },
    active: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
  },
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
