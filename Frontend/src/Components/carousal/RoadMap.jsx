// import React, { useState } from "react";
// import classNames from "classnames";
// import { AnimatePresence, motion } from "framer-motion";

// const roadmapContent = {
//   "Round-I": {
//     title: "Foundation of Design & Editing",
//     icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
//     topics: [
//       {
//         title: "Graphic Design Basics",
//         desc: "Introduction to Adobe Photoshop, Illustrator, and Canva for social media marketing, engagement posts, and printables.",
//         icon: "🖌️",
//       },
//       {
//         title: "Video Editing Fundamentals",
//         desc: "Learning After Effects, CapCut, and Canva for creating professional and engaging video content.",
//         icon: "🎬",
//       },
//       {
//         title: "Marketing & Engagement",
//         desc: "Understanding how to design content that boosts brand awareness and audience engagement on digital platforms.",
//         icon: "📣",
//       },
//       {
//         title: "Real-World Application",
//         desc: "Students are encouraged to find clients on digital platforms, applying their skills in real-world scenarios.",
//         icon: "💼", 
//       },
//     ],
//   },
//   "Round-II": {
//     title: "Web Development Training Model",
//     icon: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
//     topics: [
//       {
//         title: "HTML, CSS, & JavaScript",
//         desc: "Students start by learning HTML, CSS, and JavaScript to build responsive, interactive websites from scratch.",
//         icon: "💻",
//       },
//       {
//         title: "Responsive Design",
//         desc: "Focused on creating websites that adapt seamlessly to all screen sizes using competitive development techniques.",
//         icon: "🖥️",
//       },
//       {
//         title: "Frameworks & Tools",
//         desc: "Introduction to frameworks like Bootstrap, Tailwind, and the use of CDNs for faster website development.",
//         icon: "🧰",
//       },
//       {
//         title: "Client-Ready Projects",
//         desc: "Preparing students for real-world projects, making them market-ready to offer their services.",
//         icon: "🚀",
//       },
//     ],
//   },
//   "Round-III": {
//     title: "Branding & Identity Design",
//     icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
//     topics: [
//       {
//         title: "Logo Design Principles",
//         desc: "Understanding form, symbolism, and branding psychology in designing effective logos.",
//         icon: "🎨",
//       },
//       {
//         title: "Typography & Colors",
//         desc: "Learning to choose fonts and color schemes that align with brand values.",
//         icon: "🔤",
//       },
//       {
//         title: "Social Media Branding",
//         desc: "Creating cohesive social media kits for consistent online presence.",
//         icon: "📱",
//       },
//       {
//         title: "Case Study Analysis",
//         desc: "Analyzing successful branding campaigns and redesigns.",
//         icon: "📊",
//       },
//     ],
//   },
//   "Round-IV": {
//     title: "Portfolio & Personal Branding",
//     icon: "https://cdn-icons-png.flaticon.com/512/3304/3304566.png",
//     topics: [
//       {
//         title: "Online Portfolio Setup",
//         desc: "Creating an online portfolio using Behance or personal websites.",
//         icon: "🌐",
//       },
//       {
//         title: "LinkedIn Optimization",
//         desc: "How to build a compelling LinkedIn profile and network strategically.",
//         icon: "🔗",
//       },
//       {
//         title: "Personal Brand Story",
//         desc: "Crafting a narrative around your work and journey.",
//         icon: "📖",
//       },
//       {
//         title: "Mock Interviews & Feedback",
//         desc: "Practicing interviews and improving based on feedback.",
//         icon: "🗣️",
//       },
//     ],
//   },
// };

// const RoadMap = () => {
//   const rounds = Object.keys(roadmapContent);
//   const [selected, setSelected] = useState("Round-I");

//   return (
//    <div>
//                 <section className="relative px-6 py-20 bg-white">
//   {/* Grid Background */}
//   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')] opacity-10 pointer-events-none"></div>

//   {/* Content */}
//   <div className="relative z-10 max-w-5xl mx-auto">
//     {/* Tag */}
//     <div className="flex items-center gap-2 mb-4">
//       <div className="w-1 h-6 bg-[#002277]" />
//       <span className="text-sm font-semibold tracking-wider text-black uppercase">
//         Super60 Roadmap
//       </span>
//     </div>

//     {/* Heading */}
//     <h2 className="text-4xl font-semibold leading-snug text-black">
//       Unleash Your Potential through <br />
//       <span className="text-[#002277] font-bold">Structured & Impactful Learning</span>
//     </h2>
//   </div>

//   {/* Bottom divider */}
//   <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100" />
// </section>

//                  <div className="flex min-h-screen font-sans bg-gray-100 ">
//       {/* Sidebar */}
//       <div className="w-[220px] border-r border-gray-200 bg-white py-8 px-5 flex flex-col gap-y-6">
//         <h3 className="text-xl font-bold text-[#002277] mb-2 pl-1">RoadMap</h3>
//         {rounds.map((round) => (
//           <button
//             key={round}
//             onClick={() => setSelected(round)}
//             className={classNames(
//               "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border",
//               selected === round
//                 ? "bg-[#002277] text-white border-[#002277] shadow"
//                 : "text-[#002277] border-transparent hover:border-[#d1d5db] hover:bg-[#f0f4ff]"
//             )}
//           >
//             <span className="text-2xl">⚙️</span>
//             <span className="text-[15px] font-semibold">{round}</span>
//           </button>
//         ))}
//       </div>

//       {/* Center Graphic */}
//       <div className="w-[250px] flex justify-center items-center p-6 bg-[#f5f7fb]">
//         <img
//           src={roadmapContent[selected].icon}
//           alt="round icon"
//           className="object-contain w-28 h-28 animate-fadeIn"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="flex-1 p-10 overflow-y-auto">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selected}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.4 }}
//           >
//             <h2 className="text-4xl font-bold text-[#002277] mb-8">
//               {roadmapContent[selected].title}
//             </h2>
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               {roadmapContent[selected].topics.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
//                 >
//                   <div className="mb-4 text-4xl">{item.icon}</div>
//                   <h3 className="text-lg font-semibold text-[#002277] mb-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm text-gray-600">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//    </div>
//   );
// };


// export default RoadMap;

import React, { useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

const roadmapContent = {
  "Round-I": {
    title: "Foundation of Design & Editing",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    topics: [
      {
        title: "Graphic Design Basics",
        desc: "Introduction to Adobe Photoshop, Illustrator, and Canva for social media marketing, engagement posts, and printables.",
        icon: "🖌️",
      },
      {
        title: "Video Editing Fundamentals",
        desc: "Learning After Effects, CapCut, and Canva for creating professional and engaging video content.",
        icon: "🎬",
      },
      {
        title: "Marketing & Engagement",
        desc: "Understanding how to design content that boosts brand awareness and audience engagement on digital platforms.",
        icon: "📣",
      },
      {
        title: "Real-World Application",
        desc: "Students are encouraged to find clients on digital platforms, applying their skills in real-world scenarios.",
        icon: "💼", 
      },
    ],
  },
  "Round-II": {
    title: "Web Development Training Model",
    icon: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
    topics: [
      {
        title: "HTML, CSS, & JavaScript",
        desc: "Students start by learning HTML, CSS, and JavaScript to build responsive, interactive websites from scratch.",
        icon: "💻",
      },
      {
        title: "Responsive Design",
        desc: "Focused on creating websites that adapt seamlessly to all screen sizes using competitive development techniques.",
        icon: "🖥️",
      },
      {
        title: "Frameworks & Tools",
        desc: "Introduction to frameworks like Bootstrap, Tailwind, and the use of CDNs for faster website development.",
        icon: "🧰",
      },
      {
        title: "Client-Ready Projects",
        desc: "Preparing students for real-world projects, making them market-ready to offer their services.",
        icon: "🚀",
      },
    ],
  },
  "Round-III": {
    title: "Branding & Identity Design",
    icon: "https://cdn-icons-png.flaticon.com/512/2541/2541991.png",
    topics: [
      {
        title: "Logo Design Principles",
        desc: "Understanding form, symbolism, and branding psychology in designing effective logos.",
        icon: "🎨",
      },
      {
        title: "Typography & Colors",
        desc: "Learning to choose fonts and color schemes that align with brand values.",
        icon: "🔤",
      },
      {
        title: "Social Media Branding",
        desc: "Creating cohesive social media kits for consistent online presence.",
        icon: "📱",
      },
      {
        title: "Case Study Analysis",
        desc: "Analyzing successful branding campaigns and redesigns.",
        icon: "📊",
      },
    ],
  },
  "Round-IV": {
    title: "Portfolio & Personal Branding",
    icon: "https://cdn-icons-png.flaticon.com/512/3304/3304566.png",
    topics: [
      {
        title: "Online Portfolio Setup",
        desc: "Creating an online portfolio using Behance or personal websites.",
        icon: "🌐",
      },
      {
        title: "LinkedIn Optimization",
        desc: "How to build a compelling LinkedIn profile and network strategically.",
        icon: "🔗",
      },
      {
        title: "Personal Brand Story",
        desc: "Crafting a narrative around your work and journey.",
        icon: "📖",
      },
      {
        title: "Mock Interviews & Feedback",
        desc: "Practicing interviews and improving based on feedback.",
        icon: "🗣️",
      },
    ],
  },
};

const RoadMap = () => {
  const rounds = Object.keys(roadmapContent);
  const [selected, setSelected] = useState("Round-I");

  return (
    <div>
      {/* Header Section */}
      <section className="relative px-6 py-20 bg-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/squared-metal.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-[#002277]" />
            <span className="text-sm font-semibold tracking-wider text-black uppercase">
              Super60 Roadmap
            </span>
          </div>
          <h2 className="text-3xl font-semibold leading-snug text-black sm:text-4xl">
            Unleash Your Potential through <br />
            <span className="text-[#002277] font-bold">Structured & Impactful Learning</span>
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100" />
      </section>

      {/* Roadmap Layout */}
      <div className="min-h-screen font-sans bg-gray-100 grid grid-cols-1 lg:grid-cols-[220px_250px_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col px-4 py-6 bg-white border-r border-gray-200 sm:px-6 gap-y-5">
          <h3 className="text-xl font-bold text-[#002277] mb-2">RoadMap</h3>
          {rounds.map((round) => (
            <button
              key={round}
              onClick={() => setSelected(round)}
              className={classNames(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border",
                selected === round
                  ? "bg-[#002277] text-white border-[#002277] shadow"
                  : "text-[#002277] border-transparent hover:border-[#d1d5db] hover:bg-[#f0f4ff]"
              )}
            >
              <span className="text-2xl">⚙️</span>
              <span className="text-sm sm:text-[15px] font-semibold">{round}</span>
            </button>
          ))}
        </div>

        {/* Center Graphic */}
        <div className="flex justify-center items-center bg-[#f5f7fb] p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
          <img
            src={roadmapContent[selected].icon}
            alt="round icon"
            className="object-contain w-20 h-20 sm:w-24 sm:h-24 animate-fadeIn"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002277] mb-6">
                {roadmapContent[selected].title}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {roadmapContent[selected].topics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 transition bg-white border border-gray-200 shadow-sm sm:p-6 rounded-xl hover:shadow-md"
                  >
                    <div className="mb-3 text-3xl sm:text-4xl">{item.icon}</div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#002277] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;

