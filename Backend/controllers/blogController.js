import Blog from "../models/Blog.js";
import cloudinary from "cloudinary";

// 🟢 Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, category, tags, sections, details } = req.body;

    const imageFile = req.file;
    let imageUrl = "";

    if (imageFile) {
      const cloudUpload = await cloudinary.v2.uploader.upload(imageFile.path);
      imageUrl = cloudUpload.secure_url;
    }

    const newBlog = new Blog({
      title,
      description,
      category,
      tags: JSON.parse(tags || "[]"),
      sections: JSON.parse(sections || "[]"),
      details: JSON.parse(details || "[]"),
      image: imageUrl,
    });

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// 🔵 Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// 🟡 Update Blog
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description, category, tags, sections, details } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Upload new image if provided
    if (req.file) {
      const uploadResult = await cloudinary.v2.uploader.upload(req.file.path);
      blog.image = uploadResult.secure_url;
    }

    blog.title = title;
    blog.description = description;
    blog.category = category;
    blog.tags = JSON.parse(tags || "[]");
    blog.sections = JSON.parse(sections || "[]");
    blog.details = JSON.parse(details || "[]");

    await blog.save();
    res.status(200).json({ message: "Blog updated", blog });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
};

// 🔴 Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};