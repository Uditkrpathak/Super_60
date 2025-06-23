import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';

const places = [
  {
    name: "Infosys Mysore",
    description: "Infosys' Global Education Center is one of the largest corporate training centers. It offers a full-fledged training experience blending technology and innovation.",
    image: "https://niu.edu.in/wp-content/uploads/2023/04/IMG-20230427-WA0066.jpg",
  },
  {
    name: "HAL Bengaluru",
    description: "Hindustan Aeronautics Limited is a key aerospace and defense company in India. The visit explores manufacturing units and aircraft systems.",
    image: "https://niu.edu.in/wp-content/uploads/2023/04/IMG-20230427-WA0056.jpg",
  },
  {
    name: "ISRO Research Centre",
    description: "ISRO's satellite research labs demonstrate India's capabilities in space tech and satellite launch programs.",
    image: "https://www.srms.ac.in/engineering/wp-content/uploads/2023/03/SRMS-CET-Pharmacy-Industrial-visit-Indian-Glycols.jpg",
  },

   {
    name: "ISRO Research Centre",
    description: "ISRO's satellite research labs demonstrate India's capabilities in space tech and satellite launch programs.",
    image: "https://www.srms.ac.in/engineering/wp-content/uploads/2023/03/SRMS-CET-Pharmacy-Industrial-visit-Indian-Glycols.jpg",
  },

   {
    name: "ISRO Research Centre",
    description: "ISRO's satellite research labs demonstrate India's capabilities in space tech and satellite launch programs.",
    image: "https://www.srms.ac.in/engineering/wp-content/uploads/2023/03/SRMS-CET-Pharmacy-Industrial-visit-Indian-Glycols.jpg",
  },

   {
    name: "ISRO Research Centre",
    description: "ISRO's satellite research labs demonstrate India's capabilities in space tech and satellite launch programs.",
    image: "https://www.srms.ac.in/engineering/wp-content/uploads/2023/03/SRMS-CET-Pharmacy-Industrial-visit-Indian-Glycols.jpg",
  },
];

const IndustrialVisitSection = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section className="px-6 py-10 mt-20 bg-white md:px-20">
      {/* Header */}
      <div className="mb-10 ">
        <h2 className="mb-2 text-xl font-bold">INDUSTRIAL VISIT</h2>
        <p className="text-sm text-blue-900">
          Bridging Classroom Learning with <span className="font-semibold text-orange-500">Real-World</span> Experience
        </p>
      </div>

      {/* Cards Grid */}
      
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  {places.map((place, idx) => (
    <motion.div
      key={idx}
      layoutId={`card-${idx}`}
      onClick={() => setSelectedPlace({ ...place, idx })}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden transition-transform transform border border-gray-200 shadow-xl cursor-pointer rounded-3xl bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-lg hover:shadow-2xl group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute z-20 px-3 py-1 text-xs font-semibold text-gray-800 rounded-full shadow-md bottom-2 left-2 bg-white/80">
          {place.name}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <p className="text-sm leading-relaxed text-gray-700">
          {place.description.length > 100
            ? `${place.description.slice(0, 100)}...`
            : place.description}
        </p>

      
      </div>
    </motion.div>
  ))}
</div>


      {/* Expanded View */}
    <AnimatePresence>
  {selectedPlace && (
    <motion.div
      layoutId={`card-${selectedPlace.idx}`}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-3xl overflow-hidden bg-white shadow-2xl rounded-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Image */}
        <motion.img
          src={selectedPlace.image}
          alt={selectedPlace.name}
          className="object-cover w-full h-80 rounded-t-3xl"
          layoutId="expanded-image"
        />

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedPlace.name}</h2>
            <button
              onClick={() => setSelectedPlace(null)}
              className="text-2xl font-bold text-gray-400 transition duration-300 hover:text-gray-700"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <p className="mb-6 text-gray-700 leading-relaxed text-[15px]">
            {selectedPlace.description}
          </p>

         
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </section>
  );
};

export default IndustrialVisitSection;

