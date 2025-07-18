import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { feDropShadow } from "framer-motion/client";

const yearData = {
  first: {
    title: "First Year",
    content: [
      "Master advanced image editing, responsive front-end development, digital marketing, and UI/UX design while developing communication and interview skills."
    ]
  },
  second: {
    title: "Second Year",
    content: [
      "Learn data structures, backend development, and start working on real-world projects.",
      "Participate in coding contests and build team collaboration."
    ]
  },
  third: {
    title: "Third Year",
    content: [
      "Focus on open-source, internships, major projects, and hackathons.",
      "Get guidance on resume building and advanced technical interviews."
    ]
  },
  fourth: {
    title: "Fourth Year",
    content: [
      "Prepare for placements with mock interviews, company-specific training, and career strategy planning.",
      "Build a strong online presence."
    ]
  }
};

const TrainingSchedule = () => {
  const [selectedYear, setSelectedYear] = useState("first");
  const indicatorRef = useRef(null);
  const motionRef = useRef(0);

  const points = [
    { x: 50, y: 150, label: "1st Year" },
    { x: 150, y: 50, label: "2nd Year" },
    { x: 250, y: 150, label: "3rd Year" },
    { x: 350, y: 50, label: "4th Year" }
  ];

  const getFullPath = (fromIndex, toIndex) => {
    const forward = fromIndex < toIndex;
    const slice = points.slice(
      Math.min(fromIndex, toIndex),
      Math.max(fromIndex, toIndex) + 1
    );
    const ordered = forward ? slice : slice.reverse();
    return ordered
      .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x},${pt.y}`)
      .join(" ");
  };

  useEffect(() => {
    const currentIndex = ["first", "second", "third", "fourth"].indexOf(selectedYear);
    const previousIndex = motionRef.current;

    if (indicatorRef.current) {
      const fullPath = getFullPath(previousIndex, currentIndex);
      indicatorRef.current.setAttribute("path", fullPath);
      indicatorRef.current.beginElement();
      motionRef.current = currentIndex;
    }
  }, [selectedYear]);

  return (
    <section className="w-full">
     
    

      {/* About */}
      <div className="w-full px-6 py-10 md:px-32">
        <p className="font-semibold text-zinc-600">About Our Community</p>
        <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-4xl">
          <span className="text-orange-400">Super60</span> – 60 Minds, One Mission, Infinite Impact.
        </h2>
        <p className="leading-snug text-gray-700 md:pr-48">
          The Super60 Batch is a focused learning community built for driven and dedicated minds.
          We aim to empower selected students by offering a high-impact academic ecosystem through expert mentorship,
          peer collaboration, regular assessments, and goal-oriented sessions.
          Together, we turn potential into performance and dreams into results.
        </p>
      </div>

      {/* Training Section */}
      <section className="px-6 py-10 md:px-20">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 md:gap-5">
          {["first", "second", "third", "fourth"].map((id, i) => {
            const label = `${id} year`;
            const isActive = selectedYear === id;
            const selectedIndex = ["first", "second", "third", "fourth"].indexOf(selectedYear);

            let translateClass = "";
            if (selectedIndex !== -1) {
              if (i < selectedIndex) translateClass = "-translate-x-2 md:-translate-x-3";
              else if (i > selectedIndex) translateClass = "translate-x-2 md:translate-x-3";
            }

            return (
              <span
                key={id}
                onClick={() => setSelectedYear(id)}
                className={`relative inline-block transform transition-transform duration-500 ease-in-out text-sm md:text-base font-semibold px-4 md:px-6 py-2 rounded-xl border cursor-pointer
                  ${isActive
                    ? "bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 border-blue-300 shadow-lg scale-110 md:scale-125 z-10"
                    : "bg-white text-blue-800 border-gray-300 hover:bg-blue-50 hover:shadow-lg"}
                  ${translateClass}`}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Content & Path */}
        <div className="flex flex-col items-start justify-center gap-6 px-4 pb-10 lg:flex-row">
          {/* SVG Path */}
          <div className="flex justify-center w-full lg:w-1/2">
            <svg viewBox="0 0 400 200" className="w-full max-w-md">
              <path d="M50,150 L150,50 L250,150 L350,50" fill="none" stroke="#CBD5E0" strokeWidth="2" />
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="10" fill="#A0AEC0" />
                  <defs>
                    <filter id="orange-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="orange" floodOpacity="0.9" />
                    </filter>
                  </defs>
                  <text
                    x={pt.x - 20}
                    y={pt.y - 20}
                    fontSize="13"
                    fontWeight="bold"
                    fill="#2D3748"
                    fontFamily="sans-serif"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
              <circle r="12" fill="orange" filter="url(#orange-glow)">
                <animateMotion ref={indicatorRef} dur="0.8s" fill="freeze" />
              </circle>
            </svg>
          </div>

          {/* Animated Content */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full p-6 bg-gray-100 shadow-md rounded-2xl"
              >
                <h3 className="mb-4 text-xl font-semibold text-blue-800 md:text-2xl">
                  {yearData[selectedYear].title}
                </h3>
                <ul className="list-disc list-inside text-base md:text-lg text-[#4b5563] space-y-2 leading-snug">
                  {yearData[selectedYear].content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TrainingSchedule;