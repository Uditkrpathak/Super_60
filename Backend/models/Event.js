import mongoose from "mongoose";

// Guest sub-schema
const GuestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  { _id: false } 
);

// Gallery image sub-schema
const GalleryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true, // A gallery image must have a URL
      trim: true,
    },
    public_id: {
      // Crucial for deleting images from Cloudinary
      type: String,
      required: true,
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
    },
    mainImagePublicId: {
      // Crucial for deleting the main image from Cloudinary
      type: String,
    },
    status: {
      type: String,
      enum: ["upcoming", "Completed", "Live"], 
      default: "upcoming",
    },
    about: {
      type: String,
      trim: true,
    },
    guests: [GuestSchema], 
    gallery: [GalleryImageSchema],
  },
  {
    timestamps: true, 
  }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;