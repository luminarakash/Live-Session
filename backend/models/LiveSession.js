import mongoose from "mongoose";

const liveSessionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // admin or student
    unique_id: { type: String, required: true, unique: true },
    userurl: { type: String, required: true },
  },
  { timestamps: true }
);

const LiveSession = mongoose.model("LiveSession", liveSessionSchema);
export default LiveSession;
