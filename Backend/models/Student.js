import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    admissionNumber: {
      type: String,
    },
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

const Student = mongoose.model("Student", studentSchema);

export default Student;