
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import batchImage from '../../assets/Photo.jpg';








const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

const BatchSection = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const paragraphs = [
    "The committed batch of Super 60 marked the beginning of a bold and inspiring journey — a journey defined by dedication, growth, and an unwavering commitment to excellence.",
    "As founding members, they shaped the vision, values, and culture that continue to guide the program today.",
    "These individuals not only secured top positions across India but also built a legacy of leadership and learning.",
  ];

  return (
    <section className="relative py-12 px-6 md:px-20 bg-[#f9f9f9] mt-12 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30 pointer-events-none" />

    
      <div className="text-center mb-10 relative z-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Batch Profiles
        </h2>
        <div className="inline-block mt-2 px-4 py-1 text-sm bg-white text-blue-800 rounded-full font-semibold" data-aos="zoom-in" data-aos-delay="300">
          Legacy Begins Here
        </div>
        <p className="text-gray-600 mt-4" data-aos="fade-up" data-aos-delay="500">
          Explore the Super 60 journey and the impactful legacy of its trailblazing batches.
        </p>
      </div>

 
      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        
      
        <div className="w-full md:w-1/2" data-aos="fade-right">
          <img
            src={batchImage}
            alt="Super 60 Batch"
            className="rounded-xl shadow-xl w-full object-cover border-4 border-transparent transition-transform hover:scale-105 duration-500"
          />
        </div>

    
        <div className="w-full md:w-1/2 text-gray-700 space-y-5">
          {paragraphs.map((text, i) => (
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