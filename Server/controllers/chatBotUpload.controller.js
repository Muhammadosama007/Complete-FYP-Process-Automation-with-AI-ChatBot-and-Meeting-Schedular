import { saveUpload } from '../services/chatBotUpload.service.js';

export const uploadFileController = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId || !req.file) {
      return res.status(400).json({ success: false, message: 'Missing file or user ID' });
    }

    const saved = await saveUpload(req.file, userId);

    res.status(200).json({
      success: true,
      message: '✅ File uploaded successfully',
      file: {
        originalName: saved.originalName,
        filePath: saved.filePath,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
};
