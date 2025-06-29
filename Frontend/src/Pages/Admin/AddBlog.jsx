import { useState, useEffect, useContext } from 'react';
import logo from '../../assets/s60_logo.jpg';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import BlogEditContext from '../../context/BlogEditContext';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const { BlogData, setBlogData } = useContext(BlogEditContext); 

    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const initialFormData = {
        title: '',
        description: '',
        image: null, // Will hold File object or image URL string
        category: '',
        tags: [],
        newTag: '',
        contentSections: [
            { heading: '', content: '' },
        ]
    };

    const [formData, setFormData] = useState(initialFormData);
    const [previewImage, setPreviewImage] = useState(null); // Holds URL for image preview

    // Effect to populate form when BlogData from context changes (for editing)
    useEffect(() => {
        console.log("AddBlog - BlogData from context:", BlogData); // Debugging log
        if (BlogData && Object.keys(BlogData).length > 0) {
            const {
                title = '',
                description = '',
                image = null, // This will be the URL string from the backend
                category = '',
                tags = [],
                sections = [], // Backend might send 'sections', frontend uses 'contentSections'
                _id
            } = BlogData;

            setFormData({
                title,
                description,
                image, // Set initial image to the URL string
                category,
                tags: Array.isArray(tags) ? tags : [],
                newTag: '', // Clear newTag field when loading existing data
                // Ensure contentSections is always an array
                contentSections: Array.isArray(sections) && sections.length > 0
                    ? sections // Use 'sections' from backend if available
                    : [{ heading: '', content: '' }], // Default empty section if not
                _id // Keep the ID for update operations
            });

            // Set preview image based on the image URL from backend
            if (image && typeof image === 'string') {
                setPreviewImage(image);
            } else {
                setPreviewImage(null); // No image URL from backend
            }
        } else {
            // Reset form when BlogData is cleared (e.g., after successful submission or if context is empty)
            setFormData(initialFormData);
            setPreviewImage(null);
            // Optionally, clear the file input's value if it's not managed by React state directly
            const fileInput = document.querySelector('input[name="image"]');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    }, [BlogData]); // Depend on BlogData from context

    // Effect to clean up URL.createObjectURL previews
    useEffect(() => {
        return () => {
            // Revoke URL only if it was created locally (i.e., not a network URL)
            if (previewImage && !previewImage.startsWith('http')) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("AddBlog: Selected image file for form:", file); // Debugging log
        if (file) {
            setFormData(prev => ({ ...prev, image: file })); // Set image to File object
            setPreviewImage(URL.createObjectURL(file)); // Create URL for preview
        } else {
            setFormData(prev => ({ ...prev, image: null })); // Clear image data
            setPreviewImage(null); // Clear preview
        }
    };

    const handleSectionChange = (index, field, value) => {
        // Ensure formData.contentSections is an array before attempting to access elements
        const newSections = Array.isArray(formData.contentSections) ? [...formData.contentSections] : [];
        if (newSections[index]) { // Ensure the index exists
            newSections[index][field] = value;
        }
        setFormData(prev => ({ ...prev, contentSections: newSections }));
    };

    const addSection = () => {
        // Ensure contentSections is an array before spreading
        const currentSections = Array.isArray(formData.contentSections) ? formData.contentSections : [];
        setFormData(prev => ({
            ...prev,
            contentSections: [...currentSections, { heading: '', content: '' }]
        }));
    };

    const addTag = () => {
        if (formData.newTag.trim() !== '') {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, formData.newTag.trim()],
                newTag: ''
            }));
        }
    };

    const removeTag = (index) => {
        const newTags = [...formData.tags];
        newTags.splice(index, 1);
        setFormData(prev => ({ ...prev, tags: newTags }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            // Stringify arrays before appending to FormData
            data.append('tags', JSON.stringify(formData.tags));
            data.append('sections', JSON.stringify(formData.contentSections));

            // --- Image Handling Logic for FormData ---
            if (formData.image instanceof File) {
                // Case 1: A new file has been selected by the user. Append the File object.
                console.log("AddBlog: Appending NEW image file to FormData.");
                data.append('image', formData.image);
            } else if (typeof formData.image === 'string' && formData._id) {
                // Case 2: This is an update operation, and no new file was selected.
                // formData.image holds the existing Cloudinary URL string.
                // We do NOT append a file. The backend's update logic should preserve
                // the existing image URL if no new file is provided via Multer.
                console.log("AddBlog: Existing image URL is present (string), not appending a new file.");
            } else {
                // Case 3: No image (null/undefined) for a new blog, or user explicitly cleared it.
                // For new blogs, if image is required, this is where it would be caught.
                if (!formData._id) { // If it's a new blog creation
                    setMessage('Main blog image is required.');
                    return;
                }
                // For updates, if image becomes null, you might need to handle deletion on backend
                // or setting to a default image. For now, it just means no new image provided.
                console.log("AddBlog: No image to append (null/undefined).");
            }
            // --- End of Image Handling Logic ---

            let res;
            if (formData._id) {
                // Update existing blog
                console.log("AddBlog: Sending PUT request for update.");
                res = await axios.put(
                    `${BACKEND_URL}/blog/${formData._id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage('Blog updated successfully!');
            } else {
                // Create new blog
                console.log("AddBlog: Sending POST request for new blog creation.");
                res = await axios.post(
                    `${BACKEND_URL}/blog`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMessage('Blog created successfully!');
            }

            console.log("Blog operation successful:", res.data);
            // Reset form after successful submission/update
            setFormData(initialFormData);
            setPreviewImage(null);
            // Clear the actual file input element's value (important for UX)
            const fileInput = e.target.elements.image;
            if (fileInput) {
                fileInput.value = '';
            }
            // Clear the blog data in context to ensure fresh state for next add/edit
            if (setBlogData) {
                setBlogData(null);
            }
            // Navigate back to where blogs are displayed, or to a success page
            navigate('/blogs'); // Example: Navigate to /blogs page

        } catch (err) {
            console.error("Error adding/updating blog:", err.response?.data || err.message);
            setMessage(err.response?.data?.message || 'Error adding/updating blog');
        }
    };

    return (
        <div className="flex justify-center pt-20 pb-20 min-h-screen bg-white overflow-y-auto">
            <div className="w-full max-w-2xl p-8 md:p-12">
                <div className="flex justify-center mb-10">
                    <img className="w-24" src={logo} alt="S60 Logo" />
                </div>

                <h2 className="mb-4 text-xl font-semibold text-center text-[#002277]">
                    {formData._id ? 'Edit Blog' : 'Add New Blog'}
                </h2>

                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        name="title"
                        value={formData.title}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />

                    <textarea
                        placeholder="Blog Description"
                        name="description"
                        value={formData.description}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />

                    <div>
                        <label htmlFor="imageUpload" className="block mb-1 text-sm text-gray-700">Blog Image</label>
                        <input
                            id="imageUpload"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {(previewImage || (formData.image && typeof formData.image === 'string')) && (
                            <div className="mt-2 text-center">
                                <img
                                    src={previewImage || formData.image}
                                    alt="Image Preview"
                                    className="max-w-full h-auto max-h-60 mx-auto rounded shadow-md object-cover"
                                />
                                <p className="text-sm text-gray-500 mt-1">Image Preview</p>
                            </div>
                        )}
                    </div>

                    <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        value={formData.category}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Enter tag"
                                name="newTag"
                                value={formData.newTag}
                                onChange={changeHandler}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="text-blue-700 hover:text-blue-900 font-bold ml-1"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-700">Content Sections</h3>
                        {/* Line 308: Ensure formData.contentSections is an array */}
                        {formData.contentSections.map((section, idx) => (
                            <div key={idx} className="space-y-2 border p-3 rounded shadow-sm relative">
                                <input
                                    type="text"
                                    placeholder="Section Heading"
                                    value={section.heading}
                                    onChange={(e) => handleSectionChange(idx, 'heading', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <textarea
                                    placeholder="Section Content"
                                    value={section.content}
                                    onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                {formData.contentSections.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSections = [...formData.contentSections];
                                            newSections.splice(idx, 1);
                                            setFormData(prev => ({ ...prev, contentSections: newSections }));
                                        }}
                                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg"
                                        title="Remove section"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSection}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            + Add Section
                        </button>
                    </div>

                    {message && (
                        <div className={`text-sm px-3 py-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#002277] hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        {formData._id ? 'Update Blog' : 'Submit Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;