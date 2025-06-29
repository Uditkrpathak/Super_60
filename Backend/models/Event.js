import mongoose from "mongoose";

// Guest sub-schema
const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
  },
  { _id: false } 
);

const OrganizerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    batch: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    mainImagePublicId: {
      // Crucial for deleting the main image from Cloudinary
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "ongoing"],
      default: "upcoming",
    },
    about: {
      type: String,
      trim: true,
    },
    gallery: {
      type: String,
      trim: true,
    },
    guests: [GuestSchema],
    organizers: [OrganizerSchema],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;