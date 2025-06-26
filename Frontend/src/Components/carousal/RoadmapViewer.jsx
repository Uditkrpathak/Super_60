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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

const RoadmapViewer = () => {
  const years = Object.keys(roadmapData);
  const [selectedYear, setSelectedYear] = useState("First Year");
  const { description, stack, color, icon, projects, revenue } = roadmapData[selectedYear];

  return (
    <div className="relative flex flex-col md:flex-row mx-auto mt-10 rounded-lg shadow-lg bg-white max-w-7xl">
      {/* Left Menu */}
      <div className="md:w-[300px] w-full bg-white flex flex-col px-4 py-6 border-r border-gray-200">
        {years.map((year) => (
          <div key={year} className="mb-2">
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
                "pl-14 pr-3 py-3 block rounded-md transition-all duration-300 relative cursor-pointer",
                {
                  "bg-gray-100 font-semibold border-l-4": selectedYear === year,
                  "hover:bg-gray-50": selectedYear !== year,
                }
              )}
              style={{ borderColor: selectedYear === year ? color : "transparent" }}
            >
              <span
                className="absolute w-6 h-6 bg-center bg-contain bg-no-repeat left-4 top-1/2 -translate-y-1/2"
                style={{ backgroundImage: `url(${roadmapData[year].icon})` }}
              ></span>
              {year}
            </label>
          </div>
        ))}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div
                className="w-[60px] h-[60px] bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: `url(${icon})` }}
              ></div>
              <h1 className="text-2xl font-bold" style={{ color }}>{selectedYear}</h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 text-base leading-relaxed max-w-3xl"
            >
              {description}
            </motion.p>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {stack.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>

            {projects && (
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold mb-2">Projects</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                  {projects.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {revenue && (
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold mb-2">Revenue Summary</h2>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>Design: ₹{revenue.design.toLocaleString()}</div>
                  <div>Frontend: ₹{revenue.frontend.toLocaleString()}</div>
                  <div className="font-medium">Total: ₹{revenue.total.toLocaleString()}</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoadmapViewer;
