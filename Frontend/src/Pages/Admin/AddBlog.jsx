import { useState } from 'react';
import logo from '../../assets/s60_logo.jpg';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';

const AddBlog = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        category: '',
        tags: [],
        newTag: '',
        contentSections: [
            { title: '', description: '' },
        ]
    });

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
            setFormData(prev => ({ ...prev, image: file }));
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
            contentSections: [...prev.contentSections, { title: '', description: '' }]
        }));
    };

    const addTag = () => {
        if (formData.newTag.trim() !== '') {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, prev.newTag.trim()],
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
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('tags', JSON.stringify(formData.tags));
            data.append('contentSections', JSON.stringify(formData.contentSections));
            if (formData.image) {
                data.append('image', formData.image);
            }

            const res = await axios.post(
                `${BACKEND_URL}/blogs`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data);
            setMessage('Blog created successfully!');
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data.message || 'Error adding blog');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-2xl p-8 md:p-12">
                <div className="flex justify-center mb-10">
                    <img className="w-24" src={logo} alt="S60 Logo" />
                </div>

                <h2 className="mb-4 text-xl font-semibold text-center text-[#002277]">
                    Add New Blog
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
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                            />
                            <button type="button" onClick={addTag} className="bg-blue-600 text-white px-3 py-1 rounded">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                    {tag} <button type="button" onClick={() => removeTag(index)}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Content Sections</h3>
                        {formData.contentSections.map((section, idx) => (
                            <div key={idx} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Section Title"
                                    value={section.title}
                                    onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <textarea
                                    placeholder="Section Description"
                                    value={section.description}
                                    onChange={(e) => handleSectionChange(idx, 'description', e.target.value)}
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
                        <div className="text-sm text-red-600 px-3">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#002277] hover:bg-blue-800 text-white px-4 py-2 rounded-md"
                    >
                        Submit Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
