import mongoose from "mongoose";

const groupFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    required: { type: Number, required: true },
    domain: { type: String, required: true },
    expertise: { type: String, required: true },
  },
  { timestamps: true }
);

const GroupForm = mongoose.model("GroupForm", groupFormSchema);
export default GroupForm;
