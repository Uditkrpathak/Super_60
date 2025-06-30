import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    experience: { type: Number, required: true },
    descrip: { type: String },
    linkedin: { type: String },
    image: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
