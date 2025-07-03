import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema({
  github: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  twitter: { type: String, default: "" },
});

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String, default: "" },
    date: { type: Date, default: null },
  },
  { _id: false }
); 

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, },
    description: { type: String, default: "" },
    projectLink: { type: String, default: "" },
    technologiesUsed: { type: [String], default: [] }, 
    projectImage: { type: String, default: "" }, 
    category: { type: String, default: "" },
    completionDate: { type: Date, default: null },
    githubRepo: { type: String, default: "" },
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String },
    issuedBy: { type: String, default: "" },
    issueDate: { type: Date, default: null },
    viewLink: { type: String, default: "" },
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    branch: {
      type: String,
    },
    batch: {
      type: String,
    },
    about: {
      type: String,
      default: "",
    },
    socialLinks: {
      type: socialLinksSchema,
      default: () => ({}), // Default to an empty object for flexibility
    },
    skills: {
      type: [String], // Array of strings
      default: [],
    },
    profileImage: {
      type: String, 
      default: "",
    },
    achievements: {
      type: [achievementSchema],
      default: [],
    },
    projects: {
      type: [projectSchema],
      default: [],
    },
    certificates: {
      type: [certificateSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;