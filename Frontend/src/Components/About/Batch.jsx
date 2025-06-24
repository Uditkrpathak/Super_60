import React from 'react';
import batchImage from '../../assets/photo.jpg'; // Replace with your actual path

const BatchSection = () => {
  return (
    <section className="py-12 px-6 md:px-20 bg-[#f9f9f9] mt-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Batch Profiles</h2>
        <p className="text-gray-600 mt-2">
          Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <img
            src={batchImage}
            alt="Super 60 Batch"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-gray-700 space-y-4">
          <p>
            The committed batch of <strong>Super 60</strong> marked the beginning of a bold and inspiring journey —
            a journey defined by dedication, growth, and an unwavering commitment to excellence. As the founding
            members of the community, they played a pivotal role in shaping the vision, values, and culture that
            continue to guide the program today.
          </p>
          <p>
            These exceptional individuals not only achieved personal milestones, securing positions in
            prestigious organizations across the country, but also laid the foundation for a vibrant, supportive
            ecosystem of learning, leadership, and continuous self-improvement.
          </p>
          <p>
            Their perseverance, teamwork, and thirst for knowledge set a high benchmark for future participants.
          </p>
          <button className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full flex items-center gap-2 transition-all">
            Know More
            <span className="text-xl">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BatchSection;
