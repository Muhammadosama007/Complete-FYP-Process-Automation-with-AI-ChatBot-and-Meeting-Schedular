import ChatUpload from '../models/chatBotUpload.model.js';

export const saveUpload = async (file, userId) => {
  const newUpload = new ChatUpload({
    userId,
    originalName: file.originalname,
    fileName: file.filename,
    filePath: file.path,
  });
  await newUpload.save();
  return newUpload;
};

export const getLastUploadedFileByUser = async (userId) => {
  return ChatUpload.findOne({ userId }).sort({ uploadedAt: -1 });
};
