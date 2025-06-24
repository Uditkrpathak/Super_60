import React, { useEffect, useRef, useState } from "react";

const skills = [
  {
    year: "First year",
    skills: ["Responsive front-end development", "UI/UX design principles"],
  },
  {
    year: "Second year",
    skills: ["API design and implementation", "Data structures & algorithms"],
  },
  {
    year: "Third year",
    skills: ["DevOps Integration", "Mobile-responsive frameworks"],
  },
  {
    year: "Fourth year",
    skills: ["Blockchain Development", "Smart Contract Implementation"],
  },
];

const Roadmap = () => {
  const sectionRef = useRef(null);
  const [orangeHeight, setOrangeHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const sectionMidInView = sectionTop < windowHeight / 2 && rect.bottom > windowHeight / 2;

      if (sectionMidInView) {
        const progressWithinSection = Math.min(
          Math.max(windowHeight / 2 - sectionTop, 0),
          sectionHeight
        );
        setOrangeHeight(progressWithinSection);
      } else {
        setOrangeHeight(0); // Reset when out of view
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full max-w-6xl mx-auto px-4 py-32">
      {/* Grey full-height center line */}
      <div className="absolute top-0 left-1/2 w-1 -translate-x-1/2 h-full bg-gray-300 z-0" />

      {/* Orange animated line from top to down */}
      <div
        className="absolute left-1/2 w-1 -translate-x-1/2 bg-orange-500 z-10 transition-all duration-300"
        style={{
          top: 0,
          height: `${orangeHeight}px`,
        }}
      />

      {/* Glowing orange tip at bottom */}
      {orangeHeight > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-400 blur-md opacity-60 z-20 transition-all duration-300"
          style={{
            top: `${orangeHeight - 6}px`,
          }}
        />
      )}

      {/* Year skill blocks */}
      <div className="flex flex-col gap-14 relative z-10">
        {skills.map((item, index) => {
          const isLeft = index % 2 === 0;
          const itemTop = 80 + index * 200; // Match spacing
          const isReached = orangeHeight >= itemTop;

          return (
            <div
              key={index}
              className={`relative flex ${isLeft ? "justify-start" : "justify-end"}`}
            >
              <div className="w-7/12 min-h-[160px] bg-gray-100 rounded-full shadow-[0_15px_25px_-5px_rgba(0,0,0,0.2)] px-6 py-6 flex items-center relative  transition-transform duration-300 hover:-translate-y-1">
                {/* Year badge */}
                <div
                  className={`absolute h-[130px] w-1/4 top-1/2 transform -translate-y-1/2 text-white text-lg tracking-wide font-bold px-5 py-2 flex justify-center items-center transition-all duration-300
                    ${isLeft
                      ? "right-4 rounded-r-full hover:rounded-l-full"
                      : "left-4 rounded-l-full hover:rounded-r-full"}
                    ${isReached
                      ? "bg-orange-500 shadow-[0_0_15px_4px_rgba(255,165,0,0.6)]"
                      : "bg-blue-900"}
                  `}
                >
                  {item.year}
                </div>

                {/* Skill content */}
                <div className={`text-left w-full ${isLeft ? "pr-44 pl-8" : "pl-44 pr-8"}`}>
                  <p className="text-xl font-semibold text-gray-800 mb-2 ml-2">
                    Key Skills Developed:
                  </p>
                  <div className="h-[1px] w-full bg-gray-400 mb-2 " />
                  <ul className="list-disc pl-5 text-base text-[#4b5563]">
                    {item.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
