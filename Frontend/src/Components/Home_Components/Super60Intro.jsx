// import React from "react";
// import { FaUsers, FaTools, FaRocket, FaLightbulb } from "react-icons/fa";

// const features = [
//   {
//     title: "Global Collaboration",
//     description:
//       "Join a tight-knit peer group, exchange knowledge, and grow together with fellow Super 60 members.",
//     icon: <FaUsers className="text-3xl text-red-600" />,
//     type: "light",
//   },
//   {
//     title: "Hands-On Projects",
//     description:
//       "Learn by doing through real-world projects in DSA, AI, web dev, and beyond with mentors to guide you.",
//     icon: <FaTools className="text-3xl text-white" />,
//     type: "dark",
//   },
//   {
//     title: "Career Acceleration",
//     description:
//       "Get curated career prep, mock interviews, mentorship, and exposure to top recruiters.",
//     icon: <FaRocket className="text-3xl text-white" />,
//     type: "dark",
//   },
//   {
//     title: "Showcase Innovation",
//     description:
//       "Pitch ideas, demo projects, and get spotlighted in the community as a future leader.",
//     icon: <FaLightbulb className="text-3xl text-red-600" />,
//     type: "light",
//   },
// ];

// const Super60Intro = () => {
//   return (
//     <section className="px-6 py-20 bg-white md:px-16">
//       {/* Intro Header */}
//       <div className="max-w-4xl mx-auto text-center mb-14">
//         <p className="mb-2 text-sm font-semibold tracking-wider text-red-600">
//           A Community Like No Other
//         </p>
//         <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
//           Driving Innovation Through{" "}
//           <span className="text-red-600">Collaboration & Vision</span>
//         </h2>
//       </div>

//       {/* Grid Feature Cards */}
//       <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2">
//         {features.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl shadow-md transition duration-300 ${
//               item.type === "dark"
//                 ? "bg-red-600 text-white"
//                 : "bg-white text-gray-800 border"
//             }`}
//           >
//             <div className="mt-1">{item.icon}</div>
//             <div>
//               <h3
//                 className={`text-lg font-bold mb-1 ${
//                   item.type === "dark" ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p
//                 className={`text-sm ${
//                   item.type === "dark" ? "text-white/90" : "text-gray-600"
//                 }`}
//               >
//                 {item.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Super60Intro;

import React from "react";
import {
  FaStar,
  FaUsers,
  FaBullseye,
  FaLeaf
} from "react-icons/fa";

const focusAreas = [
  {
    title: "Academic Excellence",
    description:
      "Guiding students to achieve top ranks through structured learning, mock tests, and expert mentorship.",
    icon: <FaStar className="text-3xl text-red-600" />,
    type: "light",
  },
  {
    title: "Peer Learning",
    description:
      "Fostering a culture of teamwork and knowledge sharing to help everyone grow together.",
    icon: <FaUsers className="text-3xl text-white" />,
    type: "dark",
  },
  {
    title: "Goal-Oriented Training",
    description:
      "Custom strategies and focused sessions that align with each student's individual academic goals.",
    icon: <FaBullseye className="text-3xl text-white" />,
    type: "dark",
  },
  {
    title: "Holistic Development",
    description:
      "Beyond academics — enhancing soft skills, confidence, and problem-solving for all-round growth.",
    icon: <FaLeaf className="text-3xl text-red-600" />,
    type: "light",
  },
];

const AboutSection = () => {
  return (
    <section className="px-6 py-20 bg-white md:px-16">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="mb-2 text-sm font-semibold tracking-wider text-red-600">
          What is Super60
        </p>
        <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          The <span className="text-red-600">Super60</span> Community
          <br />
          <span className="block mt-2 text-xl font-medium text-red-500 md:text-2xl">
            Where Ambition Meets Action.
          </span>
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg leading-relaxed text-gray-600">
          The Super 60 Batch is a focused learning community built for driven and
          dedicated minds. We empower selected students through expert mentorship,
          peer collaboration, and goal-oriented sessions.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2">
        {focusAreas.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl shadow-md transition duration-300 ${
              item.type === "dark"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-800 border"
            }`}
          >
            <div className="mt-1">{item.icon}</div>
            <div>
              <h3
                className={`text-lg font-bold mb-1 ${
                  item.type === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm ${
                  item.type === "dark" ? "text-white/90" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;

