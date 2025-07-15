import { useContext, useEffect, useState } from "react";
import EventEditContext from "../../context/EventEditContext";
import axios from "axios";
import BACKEND_URL from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
    const { EventData, setEventData } = useContext(EventEditContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        type: "",
        date: "",
        description: "",
        about: "",
        gallery: "",
        guests: [],
        organizers: [],
        status: "upcoming",
    });

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (EventData) {
            setFormData({
                title: EventData.title || "",
                type: EventData.type || "",
                date: EventData.date?.slice(0, 10) || "",
                description: EventData.description || "",
                about: EventData.about || "",
                gallery: EventData.gallery || "",
                guests: EventData.guests || [],
                organizers: EventData.organizers || [],
                status: EventData.status || "upcoming",
            });
            setPreviewUrl(EventData.image || null);
        }
    }, [EventData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleGuestChange = (index, field, value) => {
        const updated = [...formData.guests];
        updated[index][field] = value;
        setFormData({ ...formData, guests: updated });
    };

    const addGuest = () => {
        setFormData((prev) => ({
            ...prev,
            guests: [...prev.guests, { name: "", role: "", organization: "" }],
        }));
    };

    const handleOrganizerChange = (index, field, value) => {
        const updated = [...formData.organizers];
        updated[index][field] = value;
        setFormData({ ...formData, organizers: updated });
    };

    const addOrganizer = () => {
        setFormData((prev) => ({
            ...prev,
            organizers: [...prev.organizers, { name: "", role: "", batch: "" }],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "guests" || key === "organizers") {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value);
            }
        });
        if (image) data.append("image", image);

        try {
            if (EventData) {
                await axios.put(`${BACKEND_URL}/event/${EventData._id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await axios.post(`${BACKEND_URL}/event`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setEventData(null);
            navigate("/events");
        } catch (err) {
            console.error("Error saving event:", err.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pt-4 p-6">
            <h1 className="text-2xl font-bold mb-4">{EventData ? "Edit" : "Create"} Event</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Type (e.g., Webinar)"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Short Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    rows={3}
                    required
                />

                <textarea
                    name="about"
                    placeholder="About the Event"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    rows={3}
                />

                <input
                    type="text"
                    name="gallery"
                    placeholder="Gallery Info (Optional)"
                    value={formData.gallery}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Status Dropdown */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                </select>

                {/* Image Upload */}
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="w-full h-56 object-cover mt-2 rounded" />
                )}

                {/* Guests Section */}
                <div>
                    <h2 className="font-semibold mb-1">Guests</h2>
                    {formData.guests.map((guest, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={guest.name}
                                onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                                className="flex-1 border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={guest.role}
                                onChange={(e) => handleGuestChange(index, "role", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Organization"
                                value={guest.organization}
                                onChange={(e) => handleGuestChange(index, "organization", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addGuest} className="text-blue-600 mt-1 text-sm">
                        + Add Guest
                    </button>
                </div>

                {/* Organizers Section */}
                <div>
                    <h2 className="font-semibold mb-1 mt-4">Organizers</h2>
                    {formData.organizers.map((org, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={org.name}
                                onChange={(e) => handleOrganizerChange(index, "name", e.target.value)}
                                className="flex-1 border p-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={org.role}
                                onChange={(e) => handleOrganizerChange(index, "role", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Batch"
                                value={org.batch}
                                onChange={(e) => handleOrganizerChange(index, "batch", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addOrganizer} className="text-blue-600 mt-1 text-sm">
                        + Add Organizer
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {EventData ? "Update Event" : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
