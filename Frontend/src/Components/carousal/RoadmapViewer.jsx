import React, { useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

const roadmapData = {
 "First Year": {
    description: "Technical & Soft Skills Development",
    stack: [
      "Advanced image editing (Photoshop, Illustrator)",
      "Responsive front-end development",
      "UI/UX design principles",
      "Digital marketing strategies",
    ],
    projects: [
      "4 local businesses – Website design & development",
      "2 startups – Brand identity creation",
      "3 e-commerce stores – UI/UX redesign",
    ],
    revenue: {
      design: 85000,
      frontend: 35000,
      total: 120000,
    },
    logos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      "https://cdn-icons-png.flaticon.com/512/174/174855.png",
    ],
    color: "#3498db",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },
  "Second Year": {
    description:
      "Dive deeper into Data Structures, Algorithms, OOP, DBMS and start building small projects.",
    stack: [
      "C++ / Java OOP",
      "Data Structures & Algorithms",
      "SQL & DBMS",
      "JavaScript",
      "Operating Systems",
      "Computer Networks",
    ],
    color: "#2ecc71",
    icon: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
  },
  "Third Year": {
    description:
      "Build real-world projects, start exploring web/dev paths, system design, and internships.",
    stack: [
      "React.js / Angular",
      "Node.js / Express",
      "MongoDB / PostgreSQL",
      "REST APIs",
      "System Design Basics",
      "Internship / Open Source",
    ],
    color: "#f1c40f",
    icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
  },
  "Fourth Year": {
    description:
      "Focus on placements, advanced system design, cloud, devops, and final year projects.",
    stack: [
      "System Design (Advanced)",
      "Cloud Basics (AWS/Azure)",
      "DevOps (Docker, CI/CD)",
      "Capstone Project",
      "Resume + DSA Revision",
      "Mock Interviews",
    ],
    color: "#e67e22",
    icon: "https://cdn-icons-png.flaticon.com/512/3304/3304566.png",
  },
};

const RoadmapViewer = () => {
  const years = Object.keys(roadmapData);
  const [selectedYear, setSelectedYear] = useState("First Year");

  const { description, stack, color, icon } = roadmapData[selectedYear];

  return (
    <div className="relative flex mx-auto mt-10 overflow-hidden font-sans bg-white rounded max-w-7xl h-2/5">
      {/* Left Menu */}
      <div className="w-[350px] bg-white flex flex-col justify-center px-4">
        {years.map((year) => (
          <div key={year} className="relative mb-3">
            <input
              type="radio"
              id={`radio-${year}`}
              name="year"
              value={year}
              className="hidden"
              checked={selectedYear === year}
              onChange={() => setSelectedYear(year)}
            />
            <label
              htmlFor={`radio-${year}`}
              className={classNames(
                "pl-16 pr-2 py-3 cursor-pointer block rounded-r-full relative transition-all duration-300",
                {
                  "opacity-100 font-semibold border-r-4":
                    selectedYear === year,
                  "opacity-50 hover:opacity-75": selectedYear !== year,
                }
              )}
              style={{
                color: selectedYear === year ? color : "black",
                borderColor: selectedYear === year ? color : "transparent",
              }}
            >
              <span
                className="absolute w-8 h-8 transform -translate-y-1/2 bg-center bg-no-repeat bg-contain left-4 top-1/2"
                style={{ backgroundImage: `url(${roadmapData[year].icon})` }}
              ></span>
              {year}
            </label>
          </div>
        ))}
      </div>

      {/* Middle Divider */}
      <div className="w-[2px] bg-gray-200"></div>

      {/* Right Animated Content */}
      <div className="relative flex items-center justify-center flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-[80px] h-[80px] bg-center bg-contain bg-no-repeat mb-3"
              style={{ backgroundImage: `url(${icon})` }}
            ></div>
            <h1 className="mb-2 text-2xl font-bold" style={{ color }}>
              {selectedYear}
            </h1>
            <p className="text-gray-700 max-w-[70%] mb-4">{description}</p>
          <ul className="list-disc text-sm text-gray-800 pl-5 text-left max-w-[60%] space-y-1">
  {stack.map((item, idx) => (
    <li key={idx}>{item}</li>
  ))}
</ul>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoadmapViewer;
