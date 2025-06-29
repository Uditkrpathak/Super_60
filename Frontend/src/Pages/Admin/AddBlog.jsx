import { useContext, useState, useEffect } from "react";
import BlogEditContext from "../../context/BlogEditContext";
import axios from "axios";
import BACKEND_URL from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const { BlogData, setBlogData } = useContext(BlogEditContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        tags: [""],
        sections: [{ heading: "", content: "" }],
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (BlogData) {
            setFormData({
                title: BlogData.title || "",
                description: BlogData.description || "",
                category: BlogData.category || "",
                tags: BlogData.tags || [""],
                sections: BlogData.sections || [{ heading: "", content: "" }],
                image: null,
            });
            setImagePreview(BlogData.image);
        }
    }, [BlogData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (index, value) => {
        const updated = [...formData.tags];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, tags: updated }));
    };

    const handleSectionsChange = (index, field, value) => {
        const updated = [...formData.sections];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, sections: updated }));
    };

    const addTag = () => setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
    const addSection = () => setFormData((prev) => ({ ...prev, sections: [...prev.sections, { heading: "", content: "" }] }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = new FormData();
        for (const key in formData) {
            if (key === "tags" || key === "sections") {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            if (BlogData) {
                await axios.put(`${BACKEND_URL}/blog/${BlogData._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(`${BACKEND_URL}/blog`, data, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setBlogData(null);
            navigate("/blogs");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mt-24 mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{BlogData ? "Update Blog" : "Add Blog"}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />

                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border p-2 rounded" />

                {/* Tags */}
                <div>
                    <label className="font-semibold">Tags</label>
                    {formData.tags.map((tag, index) => (
                        <input key={index} value={tag} onChange={(e) => handleTagsChange(index, e.target.value)} className="block w-full border p-2 my-1 rounded" placeholder="Tag" />
                    ))}
                    <button type="button" onClick={addTag} className="text-blue-600">+ Add Tag</button>
                </div>

                {/* Sections */}
                <div>
                    <label className="font-semibold">Sections</label>
                    {formData.sections.map((section, index) => (
                        <div key={index} className="space-y-1">
                            <input value={section.heading} onChange={(e) => handleSectionsChange(index, "heading", e.target.value)} className="w-full border p-2 rounded" placeholder="Heading" />
                            <textarea value={section.content} onChange={(e) => handleSectionsChange(index, "content", e.target.value)} className="w-full border p-2 rounded" placeholder="Content" />
                        </div>
                    ))}
                    <button type="button" onClick={addSection} className="text-blue-600">+ Add Section</button>
                </div>

                {/* Image Upload */}
                <div>
                    <input type="file" onChange={handleImageChange} className="block" accept="image/*" />
                    {imagePreview && <img src={imagePreview} alt="preview" className="w-40 h-40 object-cover mt-2 rounded" />}
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{BlogData ? "Update Blog" : "Create Blog"}</button>
            </form>
        </div>
    );
};

export default AddBlog;
