import Announcement from "../models/annoucment.model.js";
import fs from 'fs';

export const createAnnouncement = async (req, res) => {
  try {
    const { subject, description, date, type, projectId } = req.body;

    const newAnnouncement = {
      subject,
      description,
      date,
      type,
      projectId,
    };

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      newAnnouncement.attachment = {
        name: req.file.originalname,
        content: `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`
      };
      fs.unlinkSync(req.file.path); // cleanup temp file
    }

    const saved = await Announcement.create(newAnnouncement);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Failed to create announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAnnouncementsByProject = async (req, res) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ message: "Missing projectId" });
    }

    const announcements = await Announcement.find({ projectId }).sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};
