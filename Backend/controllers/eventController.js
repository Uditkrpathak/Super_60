import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Helper: Upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = "super60_events") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// GET /event
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};

// POST /event
export const createEvent = async (req, res) => {
  try {
    const { title, type, date, description, status, about, guests } = req.body;

    const files = req.files || [];

    const mainImageFile = files.find((file) => file.fieldname === "image");
    const galleryFiles = files.filter((file) => file.fieldname === "gallery");

    if (!mainImageFile) {
      return res.status(400).json({ message: "Main event image is required" });
    }

    // Upload main image
    const mainImageUrl = await uploadToCloudinary(mainImageFile.buffer);

    // Upload gallery images
    const gallery = [];
    for (const file of galleryFiles) {
      const url = await uploadToCloudinary(file.buffer);
      gallery.push({ url });
    }

    // Parse guests if provided (expecting JSON stringified)
    let parsedGuests = [];
    if (guests) {
      parsedGuests = JSON.parse(guests);
    }

    const newEvent = new Event({
      title,
      type,
      date,
      description,
      image: mainImageUrl,
      status,
      about,
      guests: parsedGuests,
      gallery,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Create Event Error:", err);
    res
      .status(500)
      .json({ message: "Failed to create event", error: err.message });
  }
};

// PUT /event/:id
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, type, date, description, status, about, guests } = req.body;

    const files = req.files || [];

    const updateData = {
      title,
      type,
      date,
      description,
      status,
      about,
    };

    const mainImageFile = files.find((file) => file.fieldname === "image");
    const galleryFiles = files.filter((file) => file.fieldname === "gallery");

    if (mainImageFile) {
      const mainImageUrl = await uploadToCloudinary(mainImageFile.buffer);
      updateData.image = mainImageUrl;
    }

    if (galleryFiles.length > 0) {
      const gallery = [];
      for (const file of galleryFiles) {
        const url = await uploadToCloudinary(file.buffer);
        gallery.push({ url });
      }
      updateData.gallery = gallery;
    }

    if (guests) {
      updateData.guests = JSON.parse(guests);
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error("Update Event Error:", err);
    res
      .status(500)
      .json({ message: "Failed to update event", error: err.message });
  }
};

// DELETE /event/:id
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleted = await Event.findByIdAndDelete(eventId);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: err.message });
  }
};