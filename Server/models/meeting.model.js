import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  date: String,
  time: String,
  agenda: String,
  meetingType: { type: String, enum: ["Online", "In-Person"], default: "In-Person" },
  roomNumber: String,       // for In-Person meetings
  onlineLink: String        // for Online meetings
}, { timestamps: true });


const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
