import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String, // or mongoose.Schema.Types.ObjectId if linking with users
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
