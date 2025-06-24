import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ["About", "Gallery", "Guests", "Organizers"];

const SlidingEventDetails = ({ selectedEvent, onClose }) => {
    const [activeTab, setActiveTab] = useState("About");

    if (!selectedEvent) return null;

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
                        className="absolute top-4 right-4 text-red-600 text-3xl font-bold hover:text-red-800"
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
                            <p><strong>Date:</strong> {selectedEvent.month}, {selectedEvent.year}</p>
                            <p><strong>Status:</strong> {selectedEvent.status}</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-10 border-b border-gray-200 flex space-x-4 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 text-sm font-medium ${activeTab === tab
                                        ? 'border-b-2 border-[#C57726] text-[#C57726]'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "About" && (
                            <p className="text-gray-700">
                                This is the about section. You can provide more detailed information about the event here, such as objectives, speakers, agenda, or rules. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt velit tempore ipsam ratione nihil nisi magni obcaecati placeat dicta laboriosam tempora quos repellat, excepturi fuga, facere sapiente explicabo provident iusto.
                            </p>
                        )}
                        {activeTab === "Gallery" && (
                            <p className="text-gray-700">
                                This is the gallery. You can later replace this with image previews or a carousel.
                            </p>
                        )}
                        {activeTab === "Guests" && (
                            <p className="text-gray-700">
                                Guest speakers or notable attendees will be listed here.
                            </p>
                        )}
                        {activeTab === "Organizers" && (
                            <p className="text-gray-700">
                                Organizers and supporting organizations can be mentioned in this section.
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SlidingEventDetails;
