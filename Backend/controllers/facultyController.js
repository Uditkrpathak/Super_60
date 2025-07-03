import Faculty from "../models/Faculty.js";
import cloudinary from "../config/cloudinary.js";

// CREATE
export const createFaculty = async (req, res) => {
  try {
    const { name, title, department, experience, descrip, linkedin } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "faculty_profiles",
    });

    const newFaculty = await Faculty.create({
      name,
      title,
      department,
      experience,
      descrip,
      linkedin,
      image: result.secure_url,
    });

    res.status(201).json({ message: "Faculty created", faculty: newFaculty });
  } catch (error) {
    console.error("Create Faculty Error:", error);
    res.status(500).json({ message: "Server error while creating faculty" });
  }
};

// READ all
export const getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
};

// UPDATE
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "faculty_profiles",
      });
      updates.image = result.secure_url;
    }

    const updated = await Faculty.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json({ message: "Faculty updated", faculty: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update faculty" });
  }
};

// DELETE
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });

    res.status(200).json({ message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete faculty" });
  }
};
