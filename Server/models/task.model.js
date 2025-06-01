import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Todo', 'Inprogress', 'Done'], 
    default: 'Todo' 
  },
  index: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
