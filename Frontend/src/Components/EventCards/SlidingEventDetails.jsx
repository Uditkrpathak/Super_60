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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                className="fixed inset-0 z-50 bg-gray-500/70 py-10 px-4 flex justify-end"
            >
                <div className="bg-white w-full max-w-6xl h-full overflow-y-auto p-6 relative shadow-xl rounded-xl mx-auto">

                    {/* ❌ Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-blue-600 text-3xl font-bold hover:text-blue-800"
                    >
                        ✕
                    </button>

                    {/* Image & Title */}
                    <div className="max-w-4xl mx-auto mt-10">
                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <h1 className="text-3xl font-bold mt-6">{selectedEvent.title}</h1>
                        <p className="text-gray-600 mt-2">{selectedEvent.description}</p>

                        <div className="mt-4 space-y-1 text-sm text-gray-700">
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
                    <div className="mt-10 px-6">
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden w-fit mx-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 text-sm font-medium transition-colors duration-300
                    ${activeTab === tab
                                            ? 'bg-orange-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {activeTab === "About" && (
                                    <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg shadow">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">About the Event</h3>
                                        <p className="text-gray-800 text-base whitespace-pre-line leading-relaxed">
                                            {selectedEvent.about}
                                        </p>
                                    </div>
                                )}

                                {activeTab === "Guests" && (
                                    <>
                                        <h3 className="text-xl font-semibold text-purple-700">Guest Speakers</h3>
                                        {selectedEvent.guests?.length > 0 ? (
                                            <ul className="grid sm:grid-cols-2 gap-4">
                                                {selectedEvent.guests.map((guest, idx) => (
                                                    <li key={idx} className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-md shadow-sm">
                                                        <p className="text-purple-900 font-medium text-base">{guest.name}</p>
                                                        <p className="text-sm text-purple-700">
                                                            {guest.role && `${guest.role}`} {guest.organization && ` • ${guest.organization}`}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="italic text-gray-500">No guests listed yet.</p>
                                        )}
                                    </>
                                )}

                                {activeTab === "Organizers" && (
                                    <>
                                        <h3 className="text-xl font-semibold text-green-700">Organizing Team</h3>
                                        {selectedEvent.organizers?.length > 0 ? (
                                            <ul className="grid sm:grid-cols-2 gap-4">
                                                {selectedEvent.organizers.map((org, idx) => (
                                                    <li key={idx} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-sm">
                                                        <p className="text-green-900 font-medium text-base">{org.name}</p>
                                                        <p className="text-sm text-green-700">
                                                            {org.role && `${org.role}`} {org.batch && ` • ${org.batch}`}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="italic text-gray-500">No organizers listed yet.</p>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>


                    {/* Admin Controls */}
                    {isAdmin && (
                        <div className="flex items-center justify-between gap-4 mt-4">
                            <button
                                onClick={editHandler}
                                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={deleteHandler}
                                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
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
