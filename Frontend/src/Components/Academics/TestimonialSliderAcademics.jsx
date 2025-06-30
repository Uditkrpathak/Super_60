import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const researchTestimonials = [
  {
    name: "Aarav Mehta",
    role: "B.Tech CSE - Final Year",
    image: "https://c8.alamy.com/comp/HTC3WJ/happy-asian-elementary-school-student-studying-in-classroom-looking-HTC3WJ.jpg",
    paperTitle: "Enhancing Security in IoT Devices Using Blockchain",
    highlight:
      "This paper explores a lightweight blockchain framework to secure communication among IoT devices, ensuring data integrity and decentralized access control.",
  },
  {
    name: "Sneha Rao",
    role: "B.Tech IT - 3rd Year",
    image: "https://c8.alamy.com/comp/HTC3WJ/happy-asian-elementary-school-student-studying-in-classroom-looking-HTC3WJ.jpg",
    paperTitle: "AI-Powered Diagnosis in Medical Imaging",
    highlight:
      "A hybrid deep learning model was proposed for detecting early signs of breast cancer in mammograms, improving diagnostic accuracy by 12%.",
  },
  {
    name: "Yuvraj Singh",
    role: "B.Tech AI & DS - 4th Year",
    image: "https://via.placeholder.com/40",
    paperTitle: "Autonomous Drone Navigation using Reinforcement Learning",
    highlight:
      "Introduced a real-time training system for drones to avoid obstacles in unknown terrains using Q-learning-based policy networks.",
  },
];

const TestimonialSliderAcademics = () => {
  const [index, setIndex] = useState(1);

  const next = () => setIndex((prev) => (prev + 1) % researchTestimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + researchTestimonials.length) % researchTestimonials.length);

  const getPositionClass = (i) => {
    if (i === index) return "z-20 scale-105 opacity-100 rotate-0";
    if (i === (index - 1 + researchTestimonials.length) % researchTestimonials.length)
      return "-rotate-3 scale-95 opacity-60 -translate-x-full z-10";
    if (i === (index + 1) % researchTestimonials.length)
      return "rotate-3 scale-95 opacity-60 translate-x-full z-10";
    return "opacity-0 pointer-events-none absolute";
  };

  return (
    <div className="relative px-4 py-20 overflow-hidden text-center bg-white">
      <div className="relative flex justify-center items-center h-[400px]">
        {researchTestimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className={`absolute w-80 md:w-96 transition-all duration-500 ease-in-out p-6 rounded-2xl shadow-md transform ${
              i === index ? "bg-[#002277] text-white" : "bg-white text-gray-700"
            } ${getPositionClass(i)}`}
          >
            <p className="mb-2 text-lg font-semibold">"{testimonial.paperTitle}"</p>
            <p className="mb-4 text-sm italic">{testimonial.highlight}</p>
            <div className="flex items-center gap-2 mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="object-cover w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm opacity-80">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={prev}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={next}
          className="p-2 text-white bg-[#002277] rounded-full hover:bg-[#002277]"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSliderAcademics;
