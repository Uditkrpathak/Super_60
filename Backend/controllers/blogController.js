import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";


export const createBlog = async (req, res) => {
  try {
    const { title, description, category, tags, sections } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    // Handle optional fields
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
    const parsedSections =
      typeof sections === "string" ? JSON.parse(sections) : sections;

    // Construct new blog
    const newBlog = new Blog({
      title,
      description,
      category,
      tags: parsedTags,
      sections: parsedSections,
      image: req.file?.path || null, 
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(201).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};


export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // Get the blog ID from the URL parameter
        const file = req.file; // Get the new image file (if uploaded)

        // Find the existing blog to potentially delete the old image
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        const { title, description, category, tags, sections } = req.body;

        // Parse JSON strings back into arrays/objects
        let parsedTags = [];
        let parsedSections = [];
        try {
            if (tags) parsedTags = JSON.parse(tags);
            if (sections) parsedSections = JSON.parse(sections);
        } catch (parseError) {
            console.error("JSON parsing error for tags or sections:", parseError);
            return res.status(400).json({ message: "Invalid data format for tags or sections." });
        }

        // Prepare the update object
        const updateData = {
            title,
            description,
            category,
            tags: parsedTags.map(tag => tag.trim()).filter(tag => tag !== ''),
            sections: parsedSections.map(section => ({
                heading: section.heading,
                content: section.content,
            })),
            // You might also want to update the updatedAt field automatically
            updatedAt: new Date(),
        };

        // Handle image update logic
        if (file) {
            // A new image was uploaded
            // 1. Delete the old image from Cloudinary if it exists
            if (existingBlog.image) {
                try {
                    // Extract public ID from the old Cloudinary URL
                    const publicIdMatch = existingBlog.image.match(/\/v\d+\/(.+?)\.\w+$/);
                    if (publicIdMatch && publicIdMatch[1]) {
                        const oldPublicId = publicIdMatch[1];
                        await cloudinary.uploader.destroy(oldPublicId);
                        console.log(`Old image ${oldPublicId} deleted from Cloudinary.`);
                    } else {
                        console.warn(`Could not extract public ID from URL: ${existingBlog.image}`);
                    }
                } catch (cloudinaryError) {
                    console.error("Error deleting old image from Cloudinary:", cloudinaryError);
                    // Continue with the update even if old image deletion fails
                }
            }
            // 2. Set the new image URL
            updateData.image = file.path; // Multer (with Cloudinary storage) provides the full URL here
        }


        // Perform the update
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to update specific fields
            { new: true, runValidators: true } // new: true returns the updated doc, runValidators: true runs schema validators
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found after update attempt." });
        }

        res.status(200).json({
            message: "Blog updated successfully!",
            blog: updatedBlog,
        });

    } catch (error) {
        console.error("Error updating blog:", error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation failed", errors: errors });
        }
        res.status(500).json({ message: "Server error while updating blog." });
    }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};
