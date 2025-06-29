import { useState, useEffect, useContext } from 'react';
import logo from '../../assets/s60_logo.jpg';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import BlogEditContext from '../../context/BlogEditContext';

const AddBlog = () => {
    const { BlogData, setBlogData } = useContext(BlogEditContext); // Assuming setBlogData is used to clear context
    const [message, setMessage] = useState('');

    // Define the initial empty state structure
    const initialFormData = {
        title: '',
        description: '',
        image: null, // Will hold the File object for new uploads
        category: '',
        tags: [],
        newTag: '',
        contentSections: [
            { heading: '', content: '' },
        ]
    };

    const [formData, setFormData] = useState(initialFormData);
    const [previewImage, setPreviewImage] = useState(null); // Holds URL for image preview

    // Effect to load blog data for editing and set initial preview
    useEffect(() => {
        if (BlogData) {
            // Map BlogData to formData structure
            setFormData({
                title: BlogData.title || '',
                description: BlogData.description || '',
                image: BlogData.image || null, // This would be the URL from the backend
                category: BlogData.category || '',
                tags: BlogData.tags || [],
                newTag: '', // Always start newTag as empty
                contentSections: BlogData.sections && BlogData.sections.length > 0
                    ? BlogData.sections
                    : [{ heading: '', content: '' }], // Ensure at least one section
                _id: BlogData._id, // Keep the ID for update operations
            });
            // Set preview image if an image URL exists in BlogData
            if (BlogData.image) {
                setPreviewImage(BlogData.image);
            }
        } else {
            // If no BlogData (new blog), ensure form is reset to initial state
            setFormData(initialFormData);
            setPreviewImage(null);
        }
    }, [BlogData]); // Depend on BlogData, so form updates when context changes

    // Effect for cleaning up object URLs (existing functionality)
    useEffect(() => {
        return () => {
            if (previewImage && !previewImage.startsWith('http')) { // Only revoke if it's an object URL
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
        if (file) {
            setFormData(prev => ({ ...prev, image: file })); // Store the File object for upload
            setPreviewImage(URL.createObjectURL(file)); // Create URL for immediate preview
        } else {
            // If user clears selection, clear the file and current preview
            setFormData(prev => ({ ...prev, image: null }));
            setPreviewImage(null);
            // If it was an existing image, you might want to retain its URL
            // Or remove it if "clearing" means removing the old image too.
            // For now, setting to null is fine.
        }
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.contentSections];
        newSections[index][field] = value;
        setFormData(prev => ({ ...prev, contentSections: newSections }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            contentSections: [...prev.contentSections, { heading: '', content: '' }]
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
            data.append('tags', JSON.stringify(formData.tags));
            data.append('sections', JSON.stringify(formData.contentSections));

            if (formData.image instanceof File) {
                data.append('image', formData.image);
            }

            let res;
            if (formData._id) {
                // If _id exists, it's an update operation
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
                // Otherwise, it's a new creation
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

            // Reset form fields after successful submission
            setFormData(initialFormData); // Reset to initial empty state
            setPreviewImage(null); // Clear the image preview
            if (e.target.elements.image) { // Ensure the element exists before clearing
                e.target.elements.image.value = ''; // Clear the file input visually
            }
            if (setBlogData) { // Clear the context data after successful operation
                setBlogData(null);
            }

        } catch (err) {
            console.error("Error adding/updating blog:", err.response?.data || err.message);
            setMessage(err.response?.data?.message || 'Error adding/updating blog');
        }
    };

    return (
        <div className="flex justify-center mt-20 items-center min-h-screen bg-white">
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
                        <label className="block mb-1 text-sm text-gray-700">Blog Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                        />
                        {(previewImage || (formData.image && typeof formData.image === 'string')) && (
                            <div className="mt-2 text-center">
                                <img
                                    src={previewImage || formData.image} // Use previewImage first, then existing URL
                                    alt="Image Preview"
                                    className="max-w-full h-auto max-h-60 mx-auto rounded shadow-md"
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
                                className="bg-blue-600 text-white px-3 py-1 rounded"
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
                                        className="text-blue-700 hover:text-blue-900 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Content Sections</h3>
                        {formData.contentSections.map((section, idx) => (
                            <div key={idx} className="space-y-2 border p-3 rounded shadow-sm">
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
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSection}
                            className="text-blue-500 text-sm"
                        >
                            + Add Section
                        </button>
                    </div>

                    {message && (
                        <div className={`text-sm px-3 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#002277] hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                    >
                        {formData._id ? 'Update Blog' : 'Submit Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;