import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
const timelineData = [
  {
    year: "2017",
    title: "Seeds of Purpose",
    description:
      "Initial thoughts and informal discussions among mentors and educators sowed the idea of nurturing future changemakers.",
    image: "http://localhost:5173/src/assets/Photo.jpg",
  },
  {
    year: "2018",
    title: "Exploring Possibilities",
    description:
      "Workshops and experimental programs were conducted to test the feasibility of a focused talent-nurturing initiative.",
    image: "/images/2018.png",
  },
  {
    year: "2019",
    title: "Concept Incubation",
    description:
      "Insights from pilot programs shaped the outline of what would eventually become the Super 60 vision.",
    image: "/images/2019.png",
  },
  {
    year: "2020",
    title: "Laying the Groundwork",
    description:
      "Despite global uncertainty, the foundational strategy was being prepared quietly in the background.",
    image: "/images/2020.png",
  },
  {
    year: "2021",
    title: "Vision Begins",
    description:
      "The concept of Super 60 was born—a vision to nurture 60 exceptional minds with leadership, creativity, and innovation at its core.",
    image: "/images/2021.png",
  },
  {
    year: "2022 Q1",
    title: "Core Ideology Established",
    description:
      "Brainstorming sessions and groundwork laid the foundation of values like collaboration, mentorship, and excellence.",
    image: "/images/2022q1.png",
  },
  {
    year: "2022 Q4",
    title: "First Outreach Drive",
    description:
      "Initial workshops and sessions were conducted to identify passionate students aligned with the Super 60 mission.",
    image: "/images/2022q4.png",
  },
  {
    year: "2023 Q1",
    title: "Super 60 Official Launch",
    description:
      "The Super 60 officially launched with a handpicked group of changemakers from across the campus.",
    image: "/images/2023q1.png",
  },
  {
    year: "2023 Q3",
    title: "Flagship Events & Mentorship",
    description:
      "Major events like code sprints, design challenges, and knowledge-sharing sessions became a regular highlight.",
    image: "/images/2023q3.png",
  },
  {
    year: "2024 Q1",
    title: "Community Expansion",
    description:
      "Super 60 opened doors to collaborations with other clubs, building a vibrant ecosystem of mutual growth.",
    image: "/images/2024q1.png",
  },
  {
    year: "2024 Q4",
    title: "Recognition and Impact",
    description:
      "Projects by Super 60 members started gaining recognition across college fests and inter-university platforms.",
    image: "/images/2024q4.png",
  },
  {
    year: "2025",
    title: "Legacy and Leadership",
    description:
      "With graduation near, the Super 60 legacy stands strong—an inspiring model of growth, grit, and greatness.",
    image: "/images/2025.png",
  },
  {
    year: "2026",
    title: "Beyond Campus",
    description:
      "Alumni of Super 60 begin mentoring juniors and expanding the vision to other institutions and communities.",
    image: "/images/2026.png",
  },
  {
    year: "2027",
    title: "Super 60 Global Chapter",
    description:
      "Super 60 evolves into a national initiative with global outreach—connecting talent and leadership across borders.",
    image: "/images/2027.png",
  },
];


export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dotRefs = useRef([]);
  const [dotTop, setDotTop] = useState(0);

  useEffect(() => {
    const updateDotTop = () => {
      if (dotRefs.current[activeIndex]) {
        const offsetTop = dotRefs.current[activeIndex].offsetTop;
        setDotTop(offsetTop + 20); // Adjust to center with item
      }
    };
    updateDotTop();
    window.addEventListener("resize", updateDotTop);
    return () => window.removeEventListener("resize", updateDotTop);
  }, [activeIndex]);

  return (
    <div className="relative max-w-6xl px-4 py-20 mx-auto">
      {/* Timeline vertical line */}
      <div className="absolute left-80 top-0 bottom-0 w-1 bg-[#002277] transform -translate-x-1/2" />

      {/* Animated scroll indicator dot */}
   <motion.div
  className="w-8 h-8 bg-white border-4 border-[#e18f38] rounded-full shadow-lg absolute z-10 flex items-center justify-center left-80 transform -translate-x-1/2 animate-pulse-glow"
  animate={{ top: dotTop }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
>
  <div className="w-3 h-3 bg-[#e18f38] rounded-full shadow-[0_0_14px_1px_#e18f38]" />
</motion.div>

        {/* <div className="w-3 h-3 bg-[#e18f38] rounded-full" /> */}

      {/* Timeline Items */}
      <div className="mt-16 space-y-32">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            dotRefs={dotRefs}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index, dotRefs, setActiveIndex }) {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  return (
    <div
      ref={(el) => {
        ref(el);
        dotRefs.current[index] = el;
      }}
      className="relative flex items-start"
    >
      {/* Year (left) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-end w-1/2 pr-10"
      >
        <div className="text-right">
          <h2 className="text-3xl font-bold text-[#002277]">{item.year}</h2>
        </div>
      </motion.div>

      {/* Content (right) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-1/2 pl-10"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-2 text-2xl font-bold"
        >
          {item.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-gray-700"
        >
          {item.description}
        </motion.p>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          src={item.image}
          alt={item.title}
          className="w-full max-w-2xl rounded-lg shadow"
        />
      </motion.div>
    </div>
  );
}
