


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegCalendarAlt,
  FaTimes,
} from "react-icons/fa";

const FeaturedEventCarousel = () => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const events = [
    {
      title: "MOU Signing Ceremony - Larsen & Toubro",
      date: "October 25, 2024",
      type: "Meetup",
      description:
        "The MoU Signing Ceremony between Larsen & Toubro (L&T) and Swami Vivekanand Group of Institutes established a collaborative foundation for skill development, innovation, and placement opportunities under the Educate India program.",
      guests: 2,
      organizer: "The Uniques",
      venue: "SVIET Auditorium",
      image: "https://theuniquesbackend.vercel.app/api/image-proxy/17YfBnePyy9jZpKRvfVlmdwEaON5j3fM8",
      highlights: [
        "2 Guests",
        "Organized by The Uniques",
        "Meetup Event",
        "Venue: SVIET Auditorium",
      ],
    },
    {
      title: "AlumTalk with Industry Experts",
      date: "Nov 5, 2024",
      type: "Seminar",
      description:
        "An insightful AlumTalk session featuring SVGI alumni now working at Google, Microsoft, and Amazon. Students got to ask questions, build connections, and understand how to navigate the tech world effectively.",
      guests: 3,
      organizer: "SVIET Alumni Cell",
      venue: "SVIET Hall 1",
      image: "https://i.ibb.co/VwvXcRP/alumtalk.png",
      highlights: [
        "3 Guests",
        "Networking Session",
        "Tech Career Insights",
        "Venue: SVGI Hall",
      ],
    },
  ];

  const nextSlide = () => setIndex((prev) => (prev + 1) % events.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + events.length) % events.length);

  const currentEvent = events[index];

  return (
    <div className="relative min-h-screen px-4 py-12 bg-gray-100">
                
      <div className="relative w-full p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex flex-col gap-10 p-6 border border-gray-200 shadow-2xl md:p-10 bg-white/95 dark:bg-[#C57726] backdrop-blur-md rounded-2xl dark:border-gray-700 md:flex-row"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Left - Image */}
            <div className="relative overflow-hidden shadow-md md:w-1/2 group rounded-xl">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="object-cover w-full h-full transition-transform duration-500 rounded-xl group-hover:scale-105"
              />
              <span
                className="absolute px-4 py-1 text-xs font-semibold text-white rounded-full shadow-lg top-4 left-4"
                style={{
                  background: "linear-gradient(90deg, #001144, #002277)",
                }}
              >
                Featured Event
              </span>
            </div>

            {/* Right - Content */}
<div className="flex flex-col justify-between p-6 bg-white shadow-lg md:w-1/2 dark:bg-gray-900 rounded-xl">
  <div>
    <h2 className="mb-3 text-3xl font-bold leading-snug text-gray-900 dark:text-white">
      {currentEvent.title}
    </h2>
    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
      <FaRegCalendarAlt className="text-white" />
      <span>{currentEvent.date} • {currentEvent.type}</span>
    </div>
    <hr className="mb-4 border-t border-gray-200 dark:border-gray-600" />

    <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed mb-5 line-clamp-3">
      {currentEvent.description}
    </p>

    <div className="p-4 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h4 className="mb-2 font-semibold text-white text-md">Highlights:</h4>
      <ul className="pl-5 space-y-1 text-sm text-white list-disc">
        {currentEvent.highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
      <strong>Venue:</strong> {currentEvent.venue}
    </div>
  </div>

  <button
    onClick={() => setShowModal(true)}
    className="mt-6 px-5 py-2.5 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
    style={{ backgroundColor: "#002277" }}
  >
    Learn More →
  </button>
</div>

          </motion.div>
        </AnimatePresence>

        {/* Arrows - Close to Card */}
        <div className="absolute -translate-y-1/2 top-1/2 -left-5 md:-left-1">
          <button
            onClick={prevSlide}
            className="p-3 bg-white text-[#002277] rounded-full shadow-md hover:scale-110 transition"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute -translate-y-1/2 top-1/2 -right-5 md:-right-1">
          <button
            onClick={nextSlide}
            className="p-3 bg-white text-[#002277] rounded-full shadow-md hover:scale-110 transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl p-8 bg-white shadow-xl rounded-xl dark:bg-gray-800"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute text-gray-500 transition top-4 right-4 hover:text-blue-500"
              >
                <FaTimes size={18} />
              </button>

              <h2 className="mb-2 text-2xl font-bold text-white">
                {currentEvent.title}
              </h2>
              <p className="mb-4 text-sm text-gray-200">
                {currentEvent.date} • {currentEvent.type}
              </p>
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="object-cover w-full h-56 mb-4 rounded-lg"
              />
              <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-200">
                {currentEvent.description}
              </p>
              <div className="p-4 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700/50 dark:border-gray-600">
                <h4 className="mb-2 font-semibold text-white text-md">Highlights:</h4>
                <ul className="pl-5 space-y-1 text-sm text-white list-disc">
                  {currentEvent.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                <strong>Venue:</strong> {currentEvent.venue}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeaturedEventCarousel;
