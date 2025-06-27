import express from "express";
import { createFormEntry, getAllEntries } from "../controllers/groupForm.controller.js";

const router = express.Router();

router.post("/", createFormEntry);
router.get("/", getAllEntries);

export default router;
