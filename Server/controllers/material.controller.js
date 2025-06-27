// controllers/material.controller.js
import Material from "../models/material.model.js";
import fs from 'fs';

export const createMaterial = async (req, res) => {
  try {
    const { subject, description, projectId } = req.body;

    const newMaterial = {
      subject,
      description,
      projectId,
    };

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      newMaterial.attachment = {
        name: req.file.originalname,
        content: `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`
      };
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const saved = await Material.create(newMaterial);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Failed to upload material:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMaterialsByProject = async (req, res) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ message: "Missing projectId" });
    }

    const materials = await Material.find({ projectId }).sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    console.error("Failed to fetch materials:", error);
    res.status(500).json({ message: "Server error" });
  }
};
