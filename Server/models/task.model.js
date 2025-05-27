import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['Todo', 'Inprogress', 'Done'],
    default: 'Todo'
  },
//   userId:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'user',
//     required:true
// },
  index: { type: Number, default: 0 }
}, 
{ timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
