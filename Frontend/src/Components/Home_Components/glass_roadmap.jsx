import React, { useRef, useEffect, useState } from "react";
import Glass_rdbg from "./glass_roadmap_bg/glass_rdbg";
import { AnimatePresence, motion } from "framer-motion";

const sectionData = [
  {
    id: "top-left",
    title: "Fundamentals of Design & Editing",
    description:
      "From ideas to polished designs — Figma, branding, and editing essentials.",
    customStyle: { marginTop: "0rem" },
    items: [
      {
        title: "Graphic Design Basics",
        badge: null,
        x: "0rem",
        width: "90%",
        description: "Learn the basics of graphic design.",
      },
      {
        title: "Video Editing Fundamentals",
        badge: "+ Revisions",
        x: "2rem",
        width: "90%",
        description: "Master Adobe Premiere Pro and DaVinci Resolve basics.",
      },
      {
        title: "Marketing & Engagement",
        badge: null,
        x: "-3rem",
        width: "90%",
        description: "Understand how to reach audiences effectively.",
      },
      {
        title: "Real-World Application",
        badge: "+ Revisions",
        x: "2rem",
        width: "90%",
        description: "Apply your skills to real client-based tasks.",
      },
    ],
  },
  {
    id: "top-right",
    title: "Web Development Training Model",
    description:
      "Build from scratch to production-ready — HTML to frameworks with hands-on projects.",
    customStyle: { marginTop: "35rem" },
    items: [
      {
        title: "HTML, CSS, & JavaScript",
        badge: "+ Revisions",
        x: "3rem",
        width: "85%",
        description: "Learn to build and style modern web pages.",
      },
      {
        title: "Responsive Design",
        badge: null,
        x: "0rem",
        width: "90%",
        description: "Make your websites adaptable to all screens.",
      },
      {
        title: "Frameworks & Tools",
        badge: "+ Revisions",
        x: "3rem",
        width: "85%",
        description: "Explore React, Tailwind, and version control with Git.",
      },
      {
        title: "Client-Ready Projects",
        badge: null,
        x: "0rem",
        width: "90%",
        description: "Deploy polished apps for real-world users.",
      },
    ],
  },
  {
    id: "bottom-left",
    title: "Branding & Identity Design",
    description:
      "Creating memorable digital identities that connect with real audiences.",
    customStyle: { marginTop: "2rem" },
    items: [
      {
        title: "Peer Learning",
        badge: "+ Sessions",
        x: "1.5rem",
        width: "88%",
        description: "Learn through collaboration and feedback.",
      },
      {
        title: "Real Projects",
        badge: null,
        x: "0rem",
        width: "95%",
        description: "Design logos, kits, and materials for real clients.",
      },
    ],
  },
  {
    id: "bottom-right",
    title: "Event Management & Public Execution",
    description:
      "Lead, coordinate, and execute high-impact tech events inside and outside campus.",
    customStyle: { marginTop: "35rem" },
    items: [
      {
        title: "C++ Workshop",
        badge: "+ Coordination",
        x: "2rem",
        width: "90%",
        description: "Organize and teach technical workshops.",
      },
      {
        title: "SkillUp Sessions",
        badge: "+ Feedback",
        x: "1rem",
        width: "85%",
        description: "Plan, run, and review learning events.",
      },
    ],
  },
];

const GlassRoadmap = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState({}); // key: `${section.id}-${index}`

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      let p = 1 - Math.min(Math.max(rect.top / windowH, 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = (sectionId, idx) => {
    const key = `${sectionId}-${idx}`;
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen px-4 py-32 mt-20 overflow-hidden text-black transition-colors duration-700 bg-orange-600"
    >
      <Glass_rdbg progress={progress} />

      {/* Title */}
      <div className="relative z-10 mb-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold font-[Montserrat] text-white">
          The Super60 Roadmap
        </h1>
        <p className="mt-4 text-lg text-orange-100 font-[Roboto]">
          A structured journey through design, development, leadership, and delivery.
        </p>
      </div>

      {/* Grid Sections */}
      <div className="relative z-10 grid grid-cols-1 grid-rows-2 gap-20 mx-auto md:grid-cols-2 max-w-7xl">
        {sectionData.map((section) => (
          <div
            key={section.id}
            className="relative flex flex-col px-6 md:px-12"
            style={section.customStyle}
          >
            {/* Line + Dot */}
            <div className="absolute top-0 left-0 w-1 h-full rounded-full bg-white/20">
              <div className="absolute top-0 w-4 h-4 bg-white border-2 border-orange-300 rounded-full -left-1" />
            </div>

            {/* Section Title */}
            <div className="pl-6 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-[Montserrat] text-white">
                {section.title}
              </h2>
              <p className="text-orange-100 text-md mt-2 font-[Roboto] max-w-lg">
                {section.description}
              </p>
            </div>

            {/* Items */}
            <div className="relative flex flex-col gap-6 ml-6">
              {section.items.map((step, index) => {
                const key = `${section.id}-${index}`;
                const isOpen = expanded[key];
                return (
                  <div
                    key={key}
                    className={`relative bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 pl-6 pr-6 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                    style={{
                      marginLeft: step.x || "0rem",
                      width: step.width || "90%",
                    }}
                    onClick={() => handleToggle(section.id, index)}
                  >
                    {/* Title & Badge */}
                    <div className="flex flex-col font-[DM Sans]">
                      <span className="text-base font-semibold">{step.title}</span>
                      {step.badge && (
                        <span className="mt-1 text-sm text-orange-200">{step.badge}</span>
                      )}
                    </div>

                    {/* Plus icon animated */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute text-xl font-light select-none right-4 top-4"
                    >
                      +
                    </motion.div>

                    {/* Description Expandable */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <p className="text-orange-100 text-sm font-[Roboto]">
                            {step.description ||
                              "This is a detailed description for this step. You can customize this per item."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Center Line */}
      <div className="absolute top-0 bottom-0 z-0 w-1 left-1/2 bg-white/10" />
    </div>
  );
};

export default GlassRoadmap;
