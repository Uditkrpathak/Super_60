
// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import batchImage from '../../assets/Photo.jpg';








// const paragraphVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.3, duration: 0.6 },
//   }),
// };

// const BatchSection = () => {
//   useEffect(() => {
//     AOS.init({ once: true, duration: 800 });
//   }, []);

//   const paragraphs = [
//     "The committed batch of Super 60 marked the beginning of a bold and inspiring journey — a journey defined by dedication, growth, and an unwavering commitment to excellence.",
//     "As founding members, they shaped the vision, values, and culture that continue to guide the program today.",
//     "These individuals not only secured top positions across India but also built a legacy of leadership and learning.",
//   ];

//   return (
//     <section className="relative py-12 px-6 md:px-20 bg-[#f9f9f9] mt-12 overflow-hidden">
      
//       <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30" />

    
//       <div className="relative z-10 mb-10 text-center" data-aos="fade-up">
//         <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
//           Batch Profiles
//         </h2>
//         <div className="inline-block px-4 py-1 mt-2 text-sm font-semibold text-blue-800 bg-white rounded-full" data-aos="zoom-in" data-aos-delay="300">
//           Legacy Begins Here
//         </div>
//         <p className="mt-4 text-gray-600" data-aos="fade-up" data-aos-delay="500">
//           Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
//         </p>
//       </div>

 
//       <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
        
      
//         <div className="w-full md:w-1/2" data-aos="fade-right">
//           <img
//             src={batchImage}
//             alt="Super 60 Batch"
//             className="object-cover w-full transition-transform duration-500 border-4 border-transparent shadow-xl rounded-xl hover:scale-105"
//           />
//         </div>

    
//         <div className="w-full space-y-5 text-gray-700 md:w-1/2">
//           {paragraphs.map((text, i) => (
//             <p key={i} data-aos="fade-left" data-aos-delay={i * 200}>
//               {text}
//             </p>
//           ))}

//           <button
//             className="flex items-center gap-2 px-6 py-2 mt-4 font-medium text-white transition-transform bg-blue-800 rounded-full hover:scale-105"
//             data-aos="zoom-in-up"
//             data-aos-delay="700"
//           >
//             Know More
//             <span className="text-xl">&#8594;</span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BatchSection;
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';

import batchImage1 from '../../assets/Photo.jpg';
import batchImage2 from '../../assets/Photo.jpg';
import batchImage3 from '../../assets/Photo.jpg';

const BatchSection = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const [selectedBatch, setSelectedBatch] = useState(0);

  const batches = [
    {
      year: '2021',
      title: 'Founding Batch (2021)',
      subtitle: 'Legacy Begins Here',
      image: batchImage1,
      paragraphs: [
        "The committed batch of Super 60 marked the beginning of a bold and inspiring journey — a journey defined by dedication, growth, and an unwavering commitment to excellence.",
        "As founding members, they shaped the vision, values, and culture that continue to guide the program today.",
        "These individuals not only secured top positions across India but also built a legacy of leadership and learning.",
      ],
    },
    {
      year: '2022',
      title: 'Rising Stars (2022)',
      subtitle: 'Carrying the Flame',
      image: batchImage2,
      paragraphs: [
        "The second batch of Super 60 carried the vision forward with unmatched energy and resilience.",
        "They embraced every challenge and opportunity with enthusiasm, pushing the boundaries of what’s possible.",
        "With consistent efforts, they upheld the values of collaboration, excellence, and transformation.",
      ],
    },
    {
      year: '2023',
      title: 'Visionaries (2023)',
      subtitle: 'Shaping the Future',
      image: batchImage3,
      paragraphs: [
        "The third batch brought a new wave of creativity, strategic thinking, and technological innovation.",
        "They expanded the program’s impact through community building and academic brilliance.",
        "Their journey reflects the program’s evolution and commitment to nurturing future leaders.",
      ],
    },
  ];

  const current = batches[selectedBatch];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative py-12 px-6 md:px-20 bg-[#f9f9f9] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30" />

      {/* Title */}
      <div className="relative z-10 mb-10 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">Batch Profiles</h2>
        <p className="max-w-xl mx-auto mt-4 text-gray-600" data-aos="fade-up" data-aos-delay="300">
          Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
        </p>
      </div>

      {/* Batch Switch Buttons */}
      <div className="relative z-10 flex justify-center gap-4 mb-10">
        {batches.map((batch, index) => (
          <button
            key={index}
            onClick={() => setSelectedBatch(index)}
            className={`px-5 py-2 rounded-full font-medium border transition-all duration-300 ${
              selectedBatch === index
                ? 'bg-blue-800 text-white scale-105'
                : 'bg-white text-blue-800 border-blue-800 hover:bg-blue-100'
            }`}
          >
            {batch.year}
          </button>
        ))}
      </div>

      {/* Animated Batch Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-10 md:flex-row"
          >
            {/* Image */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={current.image}
                alt={`Batch ${current.year}`}
                className="object-cover w-full transition-transform duration-500 border-4 border-transparent shadow-xl rounded-xl hover:scale-105"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="w-full space-y-5 text-gray-700 md:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-blue-900">{current.title}</h3>
              <div className="inline-block px-4 py-1 text-sm font-semibold text-blue-800 bg-white rounded-full">
                {current.subtitle}
              </div>
              {current.paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.button
                className="flex items-center gap-2 px-6 py-2 mt-4 font-medium text-white transition-transform bg-blue-800 rounded-full hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Know More <span className="text-xl">&#8594;</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BatchSection;
