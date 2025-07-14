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
const internshipSchema = new mongoose.Schema(
  {
    companyName: { type: String },
    certificate: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
  }, 
  { _id: false }
);
const clientSchema = new mongoose.Schema(
  {
    companyName: { type: String },
    description: { type: String, default: "" },
    role: { type: String, default: "" },
    amount: { type: String, default: "" },
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
    portfolioLink: {
      type: String,
      trim: true,
    },
    academicRollNo: {
      type: String,
      trim: true,
    },
    universityRollNo: {
      type: String,
      trim: true,
    },
    joinedOn: {
      type: Date,
    },
    placement: {
      placed: { type: Boolean, default: false },
      companyName: { type: String, trim: true, default: "" },
      placedOn: { type: Date, default: null },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    batch: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      default: "",
    },
    socialLinks: {
      type: socialLinksSchema,
      default: () => ({}), // Default to an empty object for flexibility
    },
    specialization: {
      type: [String], // Array of strings
      default: [],
    },
    skills: {
      type: [String], // Array of strings
      default: [],
    },
    profileImage: {
      type: String,
      default: "",
    },
    client: {
      type: [clientSchema],
      default: [],
    },
    internship: {
      type: [internshipSchema],
      default: [],
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