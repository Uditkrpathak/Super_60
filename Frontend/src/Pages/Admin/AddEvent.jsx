import { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import logo from '../../assets/s60_logo.jpg';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        date: '',
        description: '',
        about: '',
        status: 'Upcoming',
        gallery: '', // Back to a single string for a link
    });

    const [guests, setGuests] = useState([{ name: '', designation: '', imageFile: null, preview: null }]);
    const [organizers, setOrganizers] = useState([{ name: '', role: '', batch: '' }]);
    const [mainImage, setMainImage] = useState(null);
    const [mainPreview, setMainPreview] = useState(null);


    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleMainImage = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
        if (file) setMainPreview(URL.createObjectURL(file));
        else setMainPreview(null);
    };

    const handleGuestChange = (index, e) => {
        const updated = [...guests];
        if (e.target.name === 'imageFile') {
            const file = e.target.files[0];
            updated[index].imageFile = file;
            updated[index].preview = file ? URL.createObjectURL(file) : null;
        } else {
            updated[index][e.target.name] = e.target.value;
        }
        setGuests(updated);
    };

    const handleOrganizerChange = (index, e) => {
        const updated = [...organizers];
        updated[index][e.target.name] = e.target.value;
        setOrganizers(updated);
    };

    const addGuest = () => setGuests([...guests, { name: '', designation: '', imageFile: null, preview: null }]);
    const removeGuest = (i) => setGuests(guests.filter((_, idx) => idx !== i));
    const addOrganizer = () => setOrganizers([...organizers, { name: '', role: '', batch: '' }]);
    const removeOrganizer = (i) => setOrganizers(organizers.filter((_, idx) => idx !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        for (const key in formData) {
            // Append all formData fields, including 'gallery' now that it's a string
            form.append(key, formData[key]);
        }

        if (mainImage) {
            form.append('image', mainImage);
        } else {
            setMessage('Main event banner image is required.');
            return;
        }

        // Prepare guests data:
        const guestsWithImageInfo = [];
        guests.forEach((guest) => {
            const guestData = {
                name: guest.name,
                designation: guest.designation,
            };
            if (guest.imageFile) {
                form.append('guestImages', guest.imageFile);
                guestData.hasImage = true;
            } else {
                guestData.hasImage = false;
            }
            guestsWithImageInfo.push(guestData);
        });
        form.append('guests', JSON.stringify(guestsWithImageInfo));

        // Append organizers data
        form.append('organizers', JSON.stringify(organizers));

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${BACKEND_URL}/event`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('✅ Event created successfully');
            // Optional: Reset form fields after successful submission
            setFormData({
                title: '', type: '', date: '', description: '', about: '', status: 'Upcoming', gallery: '',
            });
            setGuests([{ name: '', designation: '', imageFile: null, preview: null }]);
            setOrganizers([{ name: '', role: '', batch: '' }]);
            setMainImage(null);
            setMainPreview(null);
        } catch (err) {
            console.error("Frontend Create Event Error:", err);
            setMessage(err.response?.data?.message || 'Failed to create event. Please check console for details.');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-white px-4 py-8">
            <div className="w-full max-w-3xl p-6 border rounded-md shadow">
                <div className="flex justify-center mb-6">
                    <img className="w-20" src={logo} alt="S60 Logo" />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-4 text-blue-800">Add New Event</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Event Title" required className="input" />
                    <select name="type" value={formData.type} onChange={handleInputChange} required className="input">
                        <option value="">Select Type</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Conference">Conference</option>
                        <option value="Competition">Competition</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="input" />
                    <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required className="input" />
                    <textarea name="about" value={formData.about} onChange={handleInputChange} placeholder="About" className="input" />
                    <select name="status" value={formData.status} onChange={handleInputChange} className="input">
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Live">Live</option>
                        <option value="Postponed">Postponed</option>
                    </select>

                    {/* Gallery Input (Text Link) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gallery Link (e.g., Google Photos, Flickr album URL)</label>
                        <input name="gallery" value={formData.gallery} onChange={handleInputChange} placeholder="Enter gallery URL (optional)" className="input" type="text" />
                    </div>

                    {/* Main Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Banner Image *</label>
                        <input type="file" onChange={handleMainImage} accept="image/*" required className="input" name='image' />
                        {mainPreview && (
                            <img src={mainPreview} alt="Main Preview" className="mt-2 h-32 rounded object-cover shadow" />
                        )}
                    </div>

                    {/* Guests */}
                    <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                        <h3 className="font-semibold text-blue-700">Guest Speakers</h3>
                        {guests.map((g, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end border-b pb-3 mb-3">
                                <input name="name" placeholder="Name" value={g.name} onChange={(e) => handleGuestChange(i, e)} className="input" required />
                                <input name="designation" placeholder="Designation" value={g.designation} onChange={(e) => handleGuestChange(i, e)} className="input" />
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Image</label>
                                    <input name="imageFile" type="file" accept="image/*" onChange={(e) => handleGuestChange(i, e)} className="input text-sm" />
                                    {g.preview && <img src={g.preview} alt="Guest Preview" className="h-16 w-16 rounded object-cover mt-1" />}
                                </div>
                                <div className="flex items-center justify-end">
                                    <button type="button" onClick={() => removeGuest(i)} className="text-red-600 text-sm hover:underline">Remove Guest</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addGuest} className="text-blue-600 text-sm hover:underline mt-2">+ Add Guest</button>
                    </div>

                    {/* Organizers */}
                    <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                        <h3 className="font-semibold text-blue-700">Organizers</h3>
                        {organizers.map((o, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end border-b pb-3 mb-3">
                                <input name="name" placeholder="Name" value={o.name} onChange={(e) => handleOrganizerChange(i, e)} className="input" required />
                                <input name="role" placeholder="Role" value={o.role} onChange={(e) => handleOrganizerChange(i, e)} className="input" />
                                <input name="batch" placeholder="Batch" value={o.batch} onChange={(e) => handleOrganizerChange(i, e)} className="input" />
                                <div className="flex items-center justify-end">
                                    <button type="button" onClick={() => removeOrganizer(i)} className="text-red-600 text-sm hover:underline">Remove Organizer</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addOrganizer} className="text-blue-600 text-sm hover:underline mt-2">+ Add Organizer</button>
                    </div>

                    {/* Message */}
                    {message && <p className={`text-center ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'} mt-4`}>{message}</p>}

                    <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Submit Event</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;