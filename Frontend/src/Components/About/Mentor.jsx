import React, { useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import photo1 from '../../assets/Vishal sir.jpeg';
import photo2 from '../../assets/Ankur sir.jpeg';


const mentorData = [
  {
    id: 1,
    title: "Guiding Minds, Creating Legacies",
    label: "Meet the Visionary",
    description1:
      "A distinguished instructional management specialist with a decade-long legacy in academics, innovation, and leadership.",
    description2:
      "Founder of Super 60 — a campus-based IT incubation center — inspiring students to innovate fearlessly.",
    image: photo1,
  },
  {
    id: 2,
    title: "Igniting Purpose, Building Futures",
    label: "Vision Through Action",
    description1:
      "Every great innovation begins with discipline and fearless execution, driven by a meaningful vision.",
    description2:
      "We empower students to transform ideas into impactful realities through mentorship and collaboration.",
    image: photo2,
  },
];

const MentorSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative py-16 px-4 md:px-10 bg-[#f9f9f9]">
 
 
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-transparent to-orange-200 blur-2xl opacity-30 pointer-events-none z-0" />

 
 
      <div className="text-center mb-10 relative z-10">
        <p className="text-sm text-gray-600 uppercase tracking-wide">Our Mentors</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
          <span className="text-orange-500">Guiding Minds,</span>{' '}
          <span className="text-indigo-900">Creating Legacies</span>
        </h2>
      </div>


      <div className="flex w-[90vw] max-w-7xl mx-auto h-[75vh] overflow-hidden relative z-10">
        {mentorData.map((mentor, index) => (
          <div
            key={mentor.id}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-3xl mx-2 cursor-pointer transition-all duration-700 ease-in-out overflow-hidden flex items-end ${
              activeIndex === index ? 'flex-[5]' : 'flex-[0.5]'
            }`}
          >
            
            <div className="absolute inset-0 flex items-center justify-center bg-black rounded-3xl overflow-hidden">
              <img
                src={mentor.image}
                alt="Mentor"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                style={{ objectPosition: 'center top' }}
              />
            </div>

        
            <div
              className={`relative z-10 w-full h-full bg-black bg-opacity-50 p-6 flex flex-col justify-end transition-opacity duration-500 ${
                activeIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="text-white text-2xl font-bold mb-2">{mentor.title}</h2>
              <p className="text-sm text-orange-200 font-medium mb-2">{mentor.label}</p>
              <p className="text-white text-sm mb-2">{mentor.description1}</p>
              <p className="text-white text-sm mb-4">{mentor.description2}</p>
              <div className="flex gap-4 text-white text-xl">
                <FaInstagram className="hover:text-pink-400" />
                <FaFacebook className="hover:text-blue-400" />
                <FaTwitter className="hover:text-sky-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorSection;
