import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import batchImage from '../../assets/Photo.jpg';

const BatchSection = () => {
  const [activeBatch, setActiveBatch] = useState('batch1');

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  // Data for each batch
  const batchData = {
    batch1: {
      paragraphs: [
        "The Super60 Community 6.0 batch is the pioneering group within The Super60 Community. These senior members have successfully completed their journey and are now placed in various esteemed organizations.",
        "They have contributed immensely to the growth of the community and continue to mentor and inspire the upcoming batches.",
        "With a strong foundation of innovation and leadership, Batch 1.0 has set high standards for excellence, paving the way for future cohorts to follow in their footsteps.",
      ],
      image: batchImage,
      badgeText: 'Legacy Begins Here'
    },
    batch2: {
      paragraphs: [
        "The dynamic Batch 7.0 further built upon the foundation laid by their predecessors, bringing fresh perspectives and innovative ideas to The Super60 Community.",
        "They have achieved significant milestones in their respective fields, showcasing remarkable talent and adaptability.",
        "Their journey is a testament to continuous learning and collaboration, significantly impacting the community's growth.",
      ],
      image: batchImage,
      badgeText: 'Building on Excellence'
    },
    batch3: {
      paragraphs: [
        "Batch 8.0 represents the new wave of talent within The Super60 Community, embodying a forward-thinking approach and eagerness to explore emerging technologies.",
        "These members are actively engaged in cutting-edge projects and collaborations, poised to make their mark in the industry.",
        "Their energy and dedication are driving the community forward, ensuring its continued relevance and impact.",
      ],
      image: batchImage,
      badgeText: 'Future Innovators'
    },
  };

  const currentBatch = batchData[activeBatch];

  return (
    <section className="relative py-12 px-6 md:px-20 bg-[#f9f9f9] mt-12 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30 pointer-events-none" />

      {/* Batch Profiles */}
      <div className="text-center mb-10 relative z-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Batch Profiles
        </h2>
        <p className="text-gray-600 mt-4" data-aos="fade-up" data-aos-delay="500">
          Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
        </p>
      </div>
      <div className="flex justify-center mb-10 relative z-10" data-aos="fade-up" data-aos-delay="200">
        <button
          className={`mx-2 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
            activeBatch === 'batch1' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveBatch('batch1')}
        >
          Batch 6.0
        </button>
        <button
          className={`mx-2 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
            activeBatch === 'batch2' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveBatch('batch2')}
        >
          Batch 7.0
        </button>
        <button
          className={`mx-2 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
            activeBatch === 'batch3' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveBatch('batch3')}
        >
          Batch 8.0
        </button>
      </div>

      {/* Content Area  */}
      <div key={activeBatch} className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2" data-aos="slide-right">
          <img
            src={currentBatch.image}
            alt={`Super 60 Batch ${activeBatch.replace('batch', '')}.0`}
            className="rounded-xl shadow-xl w-full object-cover border-4 border-transparent transition-transform hover:scale-105 duration-500"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-1/2 text-gray-700 space-y-5">
          {currentBatch.paragraphs.map((text, i) => (
            <p key={i} data-aos="fade-left" data-aos-delay={i * 200}>
              {text}
            </p>
          ))}

          <button
            className="mt-4 px-6 py-2 bg-blue-800 text-white font-medium rounded-full flex items-center gap-2 transition-transform hover:scale-105"
            data-aos="zoom-in-up"
            data-aos-delay="700"
          >
            Know More
            <span className="text-xl">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BatchSection;


