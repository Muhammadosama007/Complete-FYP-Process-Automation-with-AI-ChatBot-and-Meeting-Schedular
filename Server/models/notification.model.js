import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ['meeting', 'request', 'general'], default: 'general' },
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // ✅ For group notifications
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // ✅ For personal notifications
});

export default mongoose.model('Notification', notificationSchema);
