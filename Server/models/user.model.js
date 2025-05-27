import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String, enum: ['student', 'advisor', 'po'], default: 'student' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
