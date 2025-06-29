import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
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
        category: {
            type: String,
            trim: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        sections: [
            {
                heading: {
                    type: String,
                    trim: true,
                },
                content: {
                    type: String,
                },
            },
        ],
        faq: [
            {
                question: {
                    type: String,
                    trim: true,
                },
                answer: {
                    type: String,
                },
            },
        ],
        read_time_minutes: { 
            type: Number,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
