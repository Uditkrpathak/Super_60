// TestimonialCarousel.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    category: "Industry Alignment",
    rating: 5,
    text: "The curriculum designed by The Uniques Community bridges the gap between academic learning and industry requirements perfectly...",
    name: "Dr. Rajesh Sharma",
    position: "Professor of Computer Science, IIT Delhi",
    image: "https://c8.alamy.com/comp/HTC3WJ/happy-asian-elementary-school-student-studying-in-classroom-looking-HTC3WJ.jpg",
  },
  {
    category: "Skill Enhancement",
    rating: 5,
    text: "I've witnessed a remarkable transformation in students who participate in The Uniques programs...",
    name: "Prof. Anita Desai",
    position: "Head of IT Department, Delhi University",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    category: "Practical Approach",
    rating: 5,
    text: "The Uniques Community's approach to practical learning complements our academic curriculum perfectly...",
    name: "Dr. Vikram Mehta",
    position: "Dean of Engineering, Chandigarh University",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    category: "Enhanced Placements",
    rating: 5,
    text: "Companies actively seek out students who have trained with The Uniques Community...",
    name: "Prof. Sunita Patel",
    position: "Director of Placements, Panjab University",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
];

const animationDuration = 4; // ⏱ Faster than before
const slideCount = testimonials.length;
const delayPerItem = animationDuration / slideCount;

const TestimonialCarousel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="relative w-full h-40 max-w-md">
        {testimonials.map((item, i) => (
          <motion.div
            key={i}
            className="absolute top-0 flex items-center w-full px-3 opacity-0"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{
              opacity: [0, 0.4, 1, 0.4, 0],
              y: [100, 100, 0, -100, -100],
              scale: [0.5, 0.7, 1, 0.7, 0.5],
            }}
            transition={{
              duration: animationDuration,
              ease: "linear",
              repeat: Infinity,
              delay: i * delayPerItem,
            }}
          >
            <div className="flex-shrink-0 bg-[#d7f7fc] w-[90px] h-[90px] rounded-full flex items-center justify-center text-[50px] mr-[-45px] shadow-md">
              {item[0]}
            </div>
            <div className="bg-white rounded-lg p-4 pl-[70px] w-full shadow-lg">
              <p className="mb-1 text-lg font-bold uppercase">{item[1]}</p>
              <p className="text-sm text-gray-600">Unicode: {item[2]}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
