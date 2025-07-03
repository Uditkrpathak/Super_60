// import React, { useState } from "react";
// import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";

// const members = [
//   {
//     name: "Mr. Vishal Garg",
//     position: "Director Secretarial and Administration",
//     image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum8xTTG5XlJfrKGuWUjb4n6NYRd3wE9DxCgy0v",
//     description:
//       "At SVGOI, we prioritize global standards in academia, fostering active engagement among teachers, students, and industry. Our focus is on holistic education, preparing students for the challenges of a globalized world...",
//     socials: {
//       linkedin: "#",
//       facebook: "#",
//     },
//   },
//   {
//     name: "Mr. Ashwani Garg",
//     position: "Chairman",
//     image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumv2ojXKUjtV3JMvxUIZnXbTfpBu58zRdYhQaF",
//     description: "Message from Chairman will go here...",
//     socials: {
//       linkedin: "#",
//       facebook: "#",
//     },
//   },
//   {
//     name: "Mr. Ashok Garg",
//     position: "President",
//     image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumltl0Dlu4P3qMiabZeUz87wrEkVfCgNntQHSJ",
//     description: "Message from President will go here...",
//     socials: {
//       linkedin: "#",
//       facebook: "#",
//     },
//   },
// ];

// const ManagementDesk = () => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const selected = members[selectedIndex];

//   return (
//     <section className="max-w-5xl px-6 py-16 mx-auto text-center">
//       <p className="mb-2 text-sm font-semibold tracking-wide text-red-600 uppercase">
//         Our Flag Bearers
//       </p>
//       <h2 className="mb-10 text-3xl font-extrabold text-gray-900 md:text-4xl">
//         From the <span className="text-red-600">Desk of Management</span>
//       </h2>

//        <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">
//         {members.map((member, idx) => (
//           <button
//             key={idx}
//             onClick={() => setSelectedIndex(idx)}
//             className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
//               idx === selectedIndex ? "border-red-500 scale-105" : "border-transparent hover:border-gray-300"
//             }`}
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="object-cover w-full h-full"
//             />
//           </button>
//         ))}
//       </div>

//       {/* Main Card */}
//       <div className="max-w-3xl mx-auto overflow-hidden bg-white shadow-xl rounded-xl">
//         <img
//           src={selected.image}
//           alt={selected.name}
//           className="object-cover w-full h-72"
//         />
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-800">{selected.name}</h3>
//           <p className="mb-4 text-sm text-gray-500">{selected.position}</p>
//           <p className="text-sm text-gray-700">{selected.description}</p>
//           <div className="flex justify-center gap-4 mt-4 text-xl text-gray-600">
//             <a href={selected.socials.linkedin} target="_blank" rel="noreferrer">
//               <FaLinkedin className="transition hover:text-blue-600" />
//             </a>
//             <a href={selected.socials.facebook} target="_blank" rel="noreferrer">
//               <FaFacebookSquare className="transition hover:text-blue-600" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Thumbnail selector */}
//       {/* <div className="flex flex-wrap justify-center gap-6 mt-10">
//         {members.map((member, idx) => (
//           <button
//             key={idx}
//             onClick={() => setSelectedIndex(idx)}
//             className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
//               idx === selectedIndex ? "border-red-500 scale-105" : "border-transparent hover:border-gray-300"
//             }`}
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="object-cover w-full h-full"
//             />
//           </button>
//         ))}
//       </div> */}
//     </section>
//   );
// };

// export default ManagementDesk;


import React, { useState } from "react";
import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import SectionHeader from "../Section/SectionHeader";

const members = [
  {
    name: "Mr. Vishal Garg",
    position: "Director Secretarial and Administration",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum8xTTG5XlJfrKGuWUjb4n6NYRd3wE9DxCgy0v",
    description:
      "At SVGOI, we prioritize global standards in academia, fostering active engagement among teachers, students, and industry. Our focus is on holistic education, preparing students for the challenges of a globalized world...",
    socials: {
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Mr. Ashwani Garg",
    position: "Chairman",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumv2ojXKUjtV3JMvxUIZnXbTfpBu58zRdYhQaF",
    description: "Message from Chairman will go here...",
    socials: {
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Mr. Ashok Garg",
    position: "President",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumltl0Dlu4P3qMiabZeUz87wrEkVfCgNntQHSJ",
    description: "Message from President will go here...",
    socials: {
      linkedin: "#",
      facebook: "#",
    },
  },
];

const ManagementDesk = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = members[selectedIndex];

  return (
    <section className="max-w-6xl px-4 py-16 mx-auto">
     <SectionHeader
        section="Our Flag Bearers"
        title="From the Desk of Management"
        subtitle="Meet the Visionaries"
        color="#002277"
     />

      {/* Avatar Thumbnails */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 mb-10">
        {members.map((member, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`w-44 h-44 rounded-full border-4 overflow-hidden transition-all duration-300 shadow-sm ${
              idx === selectedIndex
                ? "border-[#002277] scale-110"
                : "border-gray-400 hover:scale-105"
            }`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 overflow-hidden bg-white shadow-2xl md:grid-cols-2 rounded-3xl">
        {/* Image + Overlay */}
        <div className="relative group">
          <img
            src={selected.image}
            alt={selected.name}
            className="object-cover w-full h-full max-h-[450px] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-4 transition-all duration-500 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
            <div className="text-white">
              <p className="text-sm">{selected.position}</p>
              <h3 className="text-xl font-bold">{selected.name}</h3>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between p-8">
          <div>
            <h3 className="mb-1 text-2xl font-semibold text-gray-800">{selected.name}</h3>
            <p className="mb-4 text-sm font-medium text-[#C57726]">{selected.position}</p>
            <p className="text-sm leading-relaxed text-gray-700">
              {selected.description}
            </p>
          </div>
          <div className="flex gap-4 mt-6 text-2xl text-gray-600">
            <a href={selected.socials.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin className="transition hover:text-blue-600" />
            </a>
            <a href={selected.socials.facebook} target="_blank" rel="noreferrer">
              <FaFacebookSquare className="transition hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementDesk;
