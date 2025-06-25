import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    branch: String,
    batch: String,
    image: String,
    skills: [String],
    projects: Number,
    achievements: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
