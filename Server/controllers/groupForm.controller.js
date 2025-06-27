import GroupForm from "../models/groupForm.model.js";

// POST /group-formation
export const createFormEntry = async (req, res) => {
  try {
    const { name, contact, required, domain, expertise } = req.body;

    if (!name || !contact || !required || !domain || !expertise) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEntry = new GroupForm({ name, contact, required, domain, expertise });
    await newEntry.save();

    res.status(201).json({ message: "Entry created successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /group-formation
export const getAllEntries = async (_req, res) => {
  try {
    const entries = await GroupForm.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
