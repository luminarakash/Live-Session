import LiveSession from "../models/LiveSession.js";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (req, res) => {
  try {
    const uniqueId = uuidv4();
    const sessionURL = `${process.env.FRONTEND_URL}/session/${uniqueId}`;

    const session = await LiveSession.create({
      type: "admin",
      unique_id: uniqueId,
      userurl: sessionURL,
    });

    res.status(201).json({
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSession = async (req, res) => {
  try {
    const { unique_id } = req.params;
    const session = await LiveSession.findOne({ unique_id });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
