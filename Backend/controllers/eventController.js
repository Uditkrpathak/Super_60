import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch events", error });
  }
};


export const createEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      date,
      description,
      about,
      gallery,
      guests,
      organizers,
    } = req.body;

    const image = req.file?.path || null;
    const mainImagePublicId = req.file?.filename || null;

    const event = new Event({
      title,
      type,
      date,
      description,
      about,
      gallery,
      image,
      mainImagePublicId,
      guests: JSON.parse(guests || "[]"),
      organizers: JSON.parse(organizers || "[]"),
    });

    await event.save();

    res.status(201).json({ success: true, message: "Event created", event });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Event creation failed", error });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      date,
      description,
      about,
      gallery,
      guests,
      organizers,
    } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    // If new image uploaded, delete old one from Cloudinary
    if (req.file) {
      if (event.mainImagePublicId) {
        await cloudinary.uploader.destroy(event.mainImagePublicId);
      }
      event.image = req.file.path;
      event.mainImagePublicId = req.file.filename;
    }

    event.title = title || event.title;
    event.type = type || event.type;
    event.date = date || event.date;
    event.description = description || event.description;
    event.about = about || event.about;
    event.gallery = gallery || event.gallery;
    event.guests = guests ? JSON.parse(guests) : event.guests;
    event.organizers = organizers ? JSON.parse(organizers) : event.organizers;

    await event.save();

    res.status(200).json({ success: true, message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    // Delete image from Cloudinary
    if (event.mainImagePublicId) {
      await cloudinary.uploader.destroy(event.mainImagePublicId);
    }

    await event.deleteOne();

    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion failed", error });
  }
};
