import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, image, category, tags, sections } = req.body;

    if (!title || !description ) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const blog = new Blog({
      title,
      description,
      image,
      category,
      tags,
      sections: typeof sections === "string" ? JSON.parse(sections) : sections,
      author: req.user._id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      sections: req.body.sections ? JSON.parse(req.body.sections) : undefined,
    };

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
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
