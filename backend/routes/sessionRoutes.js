import express from "express";
import { createSession, getSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create", createSession);
router.get("/:unique_id", getSession);

export default router;
