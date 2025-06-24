import React from 'react';
import { motion } from 'framer-motion';
import batchImage from '../../assets/photo.jpg'; // Replace with your actual path

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const BatchSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative py-12 px-6 md:px-20 bg-[#f9f9f9] mt-12 overflow-hidden"
    >
    
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30 pointer-events-none" />

      <div className="text-center mb-10 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Batch Profiles
        </motion.h2>

     
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
          className="inline-block mt-2 px-4 py-1 text-sm bg-white text-blue-800 rounded-full font-semibold"
        >
          Legacy Begins Here
        </motion.div>

        <motion.p 
          className="text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={batchImage}
            alt="Super 60 Batch"
            className="rounded-xl shadow-xl w-full object-cover border-4 border-transparent transition-all duration-500"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        <div className="w-full md:w-1/2 text-gray-700 space-y-5">
          {[
            "The committed batch of Super 60 marked the beginning of a bold and inspiring journey — a journey defined by dedication, growth, and an unwavering commitment to excellence.",
            "As founding members, they shaped the vision, values, and culture that continue to guide the program today.",
            "These individuals not only secured top positions across India but also built a legacy of leadership and learning."
          ].map((text, index) => (
            <motion.p
              key={index}
              custom={index}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="leading-relaxed"
            >
              {text}
            </motion.p>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          
  className="mt-4 px-6 py-2 bg-blue-800 text-white font-medium rounded-full flex items-center gap-2 transition-all"
>
            Know More
            <span className="text-xl">&#8594;</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default BatchSection;