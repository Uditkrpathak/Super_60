import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import EventEditContext from '../../context/EventEditContext';

const tabs = ["About", "Guests", "Organizers"];

const SlidingEventDetails = ({ selectedEvent, onClose }) => {
    const { isAdmin } = useContext(AuthContext);
    const { setEventData } = useContext(EventEditContext);
    const [activeTab, setActiveTab] = useState("About");
    const navigate = useNavigate();

    if (!selectedEvent) return null;

    const deleteHandler = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${BACKEND_URL}/event/${selectedEvent._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/events');
        } catch (err) {
            console.error(err);
        }
    };

    const editHandler = () => {
        setEventData(selectedEvent);
        navigate('/addEvent');
    };

    const formatDate = () => {
        try {
            const date = new Date(selectedEvent.date);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return 'Invalid date';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="event-slide"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-50 bg-gray-500/70 flex justify-end"
            >
                <div className="bg-white w-full max-w-6xl h-full overflow-y-auto p-4 sm:p-6 relative shadow-xl rounded-xl mx-auto">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-blue-600 text-3xl font-bold hover:text-blue-800"
                    >
                        ✕
                    </button>

                    {/* Image & Title */}
                    <div className="mt-10 max-w-4xl mx-auto space-y-4">
                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
                            className="w-full h-56 sm:h-64 object-cover rounded-lg"
                        />
                        <h1 className="text-2xl sm:text-3xl font-bold">{selectedEvent.title}</h1>
                        <p className="text-gray-600">{selectedEvent.description}</p>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><strong>Type:</strong> {selectedEvent.type}</p>
                            <p><strong>Date:</strong> {formatDate()}</p>
                            <p><strong>Status:</strong> {selectedEvent.status}</p>
                            {selectedEvent.gallery && (
                                <p>
                                    <a
                                        href={selectedEvent.gallery}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        View Gallery
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 border-b border-gray-200 overflow-x-auto">
                        <div className="flex space-x-6 px-2 sm:px-6 min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-2 text-sm sm:text-base font-medium whitespace-nowrap ${activeTab === tab
                                            ? 'border-b-2 border-[#C57726] text-[#C57726]'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 sm:p-6">
                        {activeTab === "About" && (
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-2">About the Event</h3>
                                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                                    {selectedEvent.about}
                                </p>
                            </div>
                        )}

                        {activeTab === "Guests" && (
                            <>
                                <h3 className="text-lg sm:text-xl font-semibold text-purple-700 mb-4">Guest Speakers</h3>
                                {selectedEvent.guests?.length > 0 ? (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedEvent.guests.map((guest, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center bg-purple-50 border-l-4 border-purple-400 p-4 rounded-md shadow-sm"
                                            >
                                                <img
                                                    src={
                                                        guest.imageUrl ||
                                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            guest.name
                                                        )}&background=8e44ad&color=fff&bold=true`
                                                    }
                                                    alt={guest.name}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-4"
                                                />
                                                <div>
                                                    <p className="text-purple-900 font-medium">{guest.name}</p>
                                                    <p className="text-sm text-purple-700">
                                                        {guest.role || ''} {guest.organization && ` • ${guest.organization}`}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="italic text-gray-500">No guests listed.</p>
                                )}
                            </>
                        )}

                        {activeTab === "Organizers" && (
                            <>
                                <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-4">Organizing Team</h3>
                                {selectedEvent.organizers?.length > 0 ? (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {selectedEvent.organizers.map((org, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-sm"
                                            >
                                                <img
                                                    src={
                                                        org.imageUrl ||
                                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            org.name
                                                        )}&background=27ae60&color=fff&bold=true`
                                                    }
                                                    alt={org.name}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover mr-4"
                                                />
                                                <div>
                                                    <p className="text-green-900 font-medium">{org.name}</p>
                                                    <p className="text-sm text-green-700">
                                                        {org.role || ''} {org.batch && ` • Batch of ${org.batch}`}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="italic text-gray-500">No organizers listed.</p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Admin Controls */}
                    {isAdmin && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                            <button
                                onClick={editHandler}
                                className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={deleteHandler}
                                className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SlidingEventDetails;
