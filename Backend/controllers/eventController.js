import Event from "../models/Event.js";
import { v2 as cloudinary } from "cloudinary"; // Use v2 as cloudinary
import streamifier from "streamifier";


const uploadToCloudinary = (fileBuffer, folder = "super60_events") => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      return reject(new Error("Invalid or missing file buffer"));
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: "image" }, // Add resource_type for safety
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return reject(err);
        }
        resolve(result); // <--- IMPORTANT: Resolve with the full result object
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// ✅ GET /event (Added getEventById as it's standard)
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("GET Events Error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};



// ✅ POST /event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      type,
      date,
      description,
      status,
      about,
      guests,
      organizers,
    } = req.body;

    // Correctly access files from req.files object
    const mainImageFile = req.files?.image?.[0]; // Access the first (and only) file for 'image'
    const galleryFiles = req.files?.gallery || []; // Get array of files for 'gallery'
    const guestImageFiles = req.files?.guestImages || []; // Get array of files for 'guestImages'

    // Basic input validation
    if (!title || !type || !date || !description) {
      return res
        .status(400)
        .json({ message: "Title, type, date, and description are required." });
    }
    if (!mainImageFile) {
      return res.status(400).json({ message: "Main event image is required." });
    }

    // Upload main image
    const mainImageResult = await uploadToCloudinary(
      mainImageFile.buffer,
      "super60_event_banners"
    );
    const mainImageUrl = mainImageResult.secure_url;
    const mainImagePublicId = mainImageResult.public_id;

    // Upload gallery images
    const gallery = [];
    for (const file of galleryFiles) {
      const result = await uploadToCloudinary(
        file.buffer,
        "super60_event_galleries"
      );
      gallery.push({ url: result.secure_url, public_id: result.public_id }); // Store public_id
    }

    // Parse guests if provided (expecting JSON stringified from frontend)
    let parsedGuests = [];
    if (guests) {
      try {
        const guestList = JSON.parse(guests); // This is the structured guest data
        if (!Array.isArray(guestList)) {
          return res
            .status(400)
            .json({ message: "Invalid guests data format: Expected array." });
        }

        // Process guests and their images
        // Assuming guestImageFiles are in the same order as guests that have hasImage: true
        let guestImageIndex = 0;
        parsedGuests = await Promise.all(
          guestList.map(async (guest) => {
            let guestImageUrl = guest.imageUrl || null; // Keep existing URL if any
            let guestImagePublicId = guest.imagePublicId || null; // Keep existing PublicId

            // If the guest *has* an image associated and we have new files
            if (guest.hasImage && guestImageFiles[guestImageIndex]) {
              // 'hasImage' sent by frontend
              const imageFile = guestImageFiles[guestImageIndex];
              const guestUploadResult = await uploadToCloudinary(
                imageFile.buffer,
                "super60_guest_images"
              );
              guestImageUrl = guestUploadResult.secure_url;
              guestImagePublicId = guestUploadResult.public_id;
              guestImageIndex++; // Increment index for the next image file
            }

            // Also handle if a guest explicitly asked to remove their image (for updates)
            // This logic is primarily for update, but good to have consistency.
            if (guest.removeImage && guestImagePublicId) {
              // Frontend sends removeImage: true
              try {
                await cloudinary.uploader.destroy(guestImagePublicId);
                console.log(`Deleted guest image: ${guestImagePublicId}`);
              } catch (error) {
                console.warn(
                  `Could not delete guest image ${guestImagePublicId}:`,
                  error.message
                );
              }
              guestImageUrl = null;
              guestImagePublicId = null;
            }

            return {
              name: guest.name?.trim(),
              designation: guest.designation?.trim(),
              imageUrl: guestImageUrl,
              imagePublicId: guestImagePublicId, // Store public ID
            };
          })
        );
      } catch (e) {
        console.error("Error parsing guests JSON:", e);
        return res
          .status(400)
          .json({ message: "Invalid JSON format for guests data." });
      }
    }

    // Parse organizers if provided (expecting JSON stringified)
    let parsedOrganizers = [];
    if (organizers) {
      try {
        parsedOrganizers = JSON.parse(organizers);
        if (
          !Array.isArray(parsedOrganizers) ||
          parsedOrganizers.some((o) => !o.name || typeof o.name !== "string")
        ) {
          return res
            .status(400)
            .json({
              message:
                "Invalid organizers data format. Expected an array of objects with 'name' property.",
            });
        }
      } catch (e) {
        console.error("Error parsing organizers JSON:", e);
        return res
          .status(400)
          .json({ message: "Invalid JSON format for organizers data." });
      }
    }

    const newEvent = new Event({
      title: title.trim(),
      type,
      date: new Date(date), // Ensure date is Date object
      description: description.trim(),
      status,
      about: about?.trim(), // 'about' can be optional
      image: mainImageUrl,
      mainImagePublicId,
      guests: parsedGuests,
      organizers: parsedOrganizers,
      gallery, // Note: For create, gallery is handled above. This might be empty if no gallery files uploaded.
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "✅ Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Create Event Error:", err);
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    if (err.message.includes("Invalid or missing file buffer")) {
      return res
        .status(400)
        .json({ message: "Error processing file upload: " + err.message });
    }
    res
      .status(500)
      .json({ message: "Failed to create event", error: err.message });
  }
};

// ✅ PUT /event/:id
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      title,
      type,
      date,
      description,
      status,
      about,
      guests,
      organizers,
      currentGalleryItems,
      removedGalleryPublicIds,
      clearMainImage,
      currentGuestImages,
      removedGuestImagePublicIds, // For managing existing guest images
    } = req.body;

    // Correctly access files from req.files object
    const mainImageFile = req.files?.image?.[0];
    const newGalleryFiles = req.files?.gallery || [];
    const newGuestImageFiles = req.files?.guestImages || [];

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updateData = {
      title: title?.trim(), // Use optional chaining and trim if they exist
      type,
      date: date ? new Date(date) : undefined,
      description: description?.trim(),
      status,
      about: about?.trim(),
      updatedAt: new Date(),
    };

    // --- Handle Main Image Update/Removal ---
    if (mainImageFile) {
      // A new main image was uploaded: delete old one, upload new one
      if (event.mainImagePublicId) {
        try {
          await cloudinary.uploader.destroy(event.mainImagePublicId);
          console.log(`Deleted old main image: ${event.mainImagePublicId}`);
        } catch (error) {
          console.warn(
            `Could not delete old main image ${event.mainImagePublicId}:`,
            error.message
          );
        }
      }
      const result = await uploadToCloudinary(
        mainImageFile.buffer,
        "super60_event_banners"
      );
      updateData.image = result.secure_url;
      updateData.mainImagePublicId = result.public_id;
    } else if (clearMainImage === "true") {
      // Frontend explicitly asked to clear main image
      if (event.mainImagePublicId) {
        try {
          await cloudinary.uploader.destroy(event.mainImagePublicId);
          console.log(
            `Cleared and deleted main image: ${event.mainImagePublicId}`
          );
        } catch (error) {
          console.warn(
            `Could not delete main image on clear request ${event.mainImagePublicId}:`,
            error.message
          );
        }
      }
      updateData.image = null; // Set to null in DB
      updateData.mainImagePublicId = null;
    }

    // --- Handle Gallery Images Update ---
    let finalGallery = [];
    // 1. Process existing gallery items that were explicitly kept by the frontend
    if (currentGalleryItems) {
      try {
        const parsedCurrentGalleryItems = JSON.parse(currentGalleryItems);
        if (Array.isArray(parsedCurrentGalleryItems)) {
          finalGallery = parsedCurrentGalleryItems.filter(
            (item) => item.url && item.public_id
          );
        }
      } catch (e) {
        console.warn(
          "Could not parse currentGalleryItems, skipping existing gallery retention.",
          e
        );
      }
    }
    // 2. Add newly uploaded gallery images
    for (const file of newGalleryFiles) {
      const result = await uploadToCloudinary(
        file.buffer,
        "super60_event_galleries"
      );
      finalGallery.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
    updateData.gallery = finalGallery;

    // 3. Delete explicitly removed gallery images from Cloudinary
    if (removedGalleryPublicIds) {
      try {
        const parsedRemovedPublicIds = JSON.parse(removedGalleryPublicIds);
        if (
          Array.isArray(parsedRemovedPublicIds) &&
          parsedRemovedPublicIds.length > 0
        ) {
          await cloudinary.api.delete_resources(parsedRemovedPublicIds);
          console.log(
            `Deleted gallery images from Cloudinary:`,
            parsedRemovedPublicIds
          );
        }
      } catch (e) {
        console.warn(
          "Could not parse removedGalleryPublicIds, skipping deletion.",
          e
        );
      }
    }

    // --- Handle Guests Update & Image Management ---
    let finalGuests = [];
    if (guests) {
      try {
        const parsedGuests = JSON.parse(guests);
        if (
          !Array.isArray(parsedGuests) ||
          parsedGuests.some((g) => !g.name || typeof g.name !== "string")
        ) {
          return res
            .status(400)
            .json({ message: "Invalid guests data format." });
        }

        let guestImageIndex = 0; // Index for newGuestImageFiles
        // Merge new guest data with existing image info
        finalGuests = await Promise.all(
          parsedGuests.map(async (guestData) => {
            let guestImageUrl = guestData.imageUrl || null; // Existing URL from frontend
            let guestImagePublicId = guestData.imagePublicId || null; // Existing PublicId from frontend

            // If frontend sends 'hasNewImage: true' for this guest and we have a corresponding file
            if (guestData.hasNewImage && newGuestImageFiles[guestImageIndex]) {
              // Delete old guest image if exists
              if (guestImagePublicId) {
                try {
                  await cloudinary.uploader.destroy(guestImagePublicId);
                  console.log(`Deleted old guest image: ${guestImagePublicId}`);
                } catch (error) {
                  console.warn(
                    `Could not delete old guest image ${guestImagePublicId}:`,
                    error.message
                  );
                }
              }
              const result = await uploadToCloudinary(
                newGuestImageFiles[guestImageIndex].buffer,
                "super60_guest_images"
              );
              guestImageUrl = result.secure_url;
              guestImagePublicId = result.public_id;
              guestImageIndex++;
            } else if (guestData.removeImage && guestImagePublicId) {
              // Frontend requests removal
              try {
                await cloudinary.uploader.destroy(guestImagePublicId);
                console.log(`Deleted guest image: ${guestImagePublicId}`);
              } catch (error) {
                console.warn(
                  `Could not delete guest image ${guestImagePublicId}:`,
                  error.message
                );
              }
              guestImageUrl = null;
              guestImagePublicId = null;
            }
            // If no new image and not removed, existing imageUrl/PublicId passed from frontend is kept.

            return {
              name: guestData.name?.trim(),
              designation: guestData.designation?.trim(),
              imageUrl: guestImageUrl,
              imagePublicId: guestImagePublicId,
            };
          })
        );
        updateData.guests = finalGuests;
      } catch (e) {
        console.error("Error parsing guests JSON for update:", e);
        return res
          .status(400)
          .json({ message: "Invalid JSON format for guests data on update." });
      }
    }

    // Delete explicitly removed guest images from Cloudinary (public_ids received from frontend)
    if (removedGuestImagePublicIds) {
      try {
        const parsedRemovedPublicIds = JSON.parse(removedGuestImagePublicIds);
        if (
          Array.isArray(parsedRemovedPublicIds) &&
          parsedRemovedPublicIds.length > 0
        ) {
          await cloudinary.api.delete_resources(parsedRemovedPublicIds);
          console.log(
            `Deleted guest images from Cloudinary:`,
            parsedRemovedPublicIds
          );
        }
      } catch (e) {
        console.warn(
          "Could not parse removedGuestImagePublicIds, skipping deletion.",
          e
        );
      }
    }

    // --- Handle Organizers Update ---
    if (organizers) {
      try {
        updateData.organizers = JSON.parse(organizers);
        if (
          !Array.isArray(updateData.organizers) ||
          updateData.organizers.some(
            (o) => !o.name || typeof o.name !== "string"
          )
        ) {
          return res
            .status(400)
            .json({ message: "Invalid organizers data format." });
        }
      } catch (e) {
        console.error("Error parsing organizers JSON:", e);
        return res
          .status(400)
          .json({ message: "Invalid JSON format for organizers data." });
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true, runValidators: true, context: "query" }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error("Update Event Error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Event ID format" });
    }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    if (err.message.includes("Invalid or missing file buffer")) {
      return res
        .status(400)
        .json({ message: "Error processing file upload: " + err.message });
    }
    res
      .status(500)
      .json({ message: "Failed to update event", error: err.message });
  }
};

// ✅ DELETE /event/:id
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete main image
    if (event.mainImagePublicId) {
      try {
        await cloudinary.uploader.destroy(event.mainImagePublicId);
        console.log(`Deleted main event image: ${event.mainImagePublicId}`);
      } catch (error) {
        console.warn(
          `Could not delete main image ${event.mainImagePublicId}:`,
          error.message
        );
      }
    }

    // Delete gallery images
    if (event.gallery && event.gallery.length > 0) {
      const galleryPublicIds = event.gallery
        .map((img) => img.public_id)
        .filter(Boolean);
      if (galleryPublicIds.length > 0) {
        try {
          await cloudinary.api.delete_resources(galleryPublicIds);
          console.log(`Deleted gallery images: ${galleryPublicIds.join(", ")}`);
        } catch (error) {
          console.warn(
            `Could not delete gallery images ${galleryPublicIds}:`,
            error.message
          );
        }
      }
    }

    // Delete guest images
    if (event.guests && event.guests.length > 0) {
      const guestImagePublicIds = event.guests
        .map((g) => g.imagePublicId)
        .filter(Boolean);
      if (guestImagePublicIds.length > 0) {
        try {
          await cloudinary.api.delete_resources(guestImagePublicIds);
          console.log(
            `Deleted guest images: ${guestImagePublicIds.join(", ")}`
          );
        } catch (error) {
          console.warn(
            `Could not delete guest images ${guestImagePublicIds}:`,
            error.message
          );
        }
      }
    }

    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (err) {
    console.error("DELETE Event Error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Event ID format" });
    }
    res
      .status(500)
      .json({ message: "Failed to delete event", error: err.message });
  }
};
