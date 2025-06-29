// 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaArrowUpRightFromSquare } from "react-icons/fa6";

const MemberDirectory = () => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  
const members = [
  {
    name: "Sahil Kumar",
    image: "",
    branch: "B.Tech CSE",
    batch: "Super60 6.0",
    skills: ["React", "Node.js", "Tailwind"],
    achievements: 7,
    projects: 10,
  },
  {
    name: "Nisha Singh",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech IT",
    batch: "Super60 6.0",
    skills: ["HTML", "CSS", "JavaScript"],
    achievements: 4,
    projects: 5,
  },
  {
    name: "Aman Verma",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech CSE",
    batch: "Super60 8.0",
    skills: ["Java", "Spring Boot", "SQL"],
    achievements: 2,
    projects: 3,
  },
  {
    name: "Priyanka Rawat",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech AI",
    batch: "Super60 8.0",
    skills: ["Python", "TensorFlow", "ML"],
    achievements: 5,
    projects: 6,
  },
  {
    name: "Devansh Mishra",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech CSE",
    batch: "Super60 7.0",
    skills: ["C++", "DSA", "CP"],
    achievements: 1,
    projects: 2,
  },
  {
    name: "Ananya Gupta",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech CSE",
    batch: "Super60 7.0",
    skills: ["UI/UX", "Figma", "Framer"],
    achievements: 3,
    projects: 4,
  },
  {
    name: "Ravi Teja",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech ECE",
    batch: "Super60 6.0",
    skills: ["IoT", "Embedded C", "Microcontrollers"],
    achievements: 2,
    projects: 2,
  },
  {
    name: "Shruti Patel",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech CSE",
    batch: "Super60 6.0",
    skills: ["MERN Stack", "Redux", "API Integration"],
    achievements: 6,
    projects: 9,
  },
  {
    name: "Manav Arora",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech IT",
    batch: "Super60 7.0",
    skills: ["PHP", "Laravel", "MySQL"],
    achievements: 1,
    projects: 1,
  },
  {
    name: "Isha Yadav",
    image: "https://via.placeholder.com/300x200",
    branch: "B.Tech CSE",
    batch: "Super60 8.0",
    skills: ["Next.js", "TypeScript", "SCSS"],
    achievements: 5,
    projects: 7,
  },
];



  const batches = ["All Batches", "Super60 6.0", "Super60 7.0", "Super60 8.0"];
  const primaryColor = "#002277";

  const batchDescriptions = {
    "All Batches": "View the combined brilliance of every Super60 batch together.",
    "Super60 6.0": "Super60 6.0 laid the foundation for our elite community — known for its full-stack web development mastery and deep DSA preparation.",
    "Super60 7.0": "Super60 7.0 explored collaborative real-world projects, leadership skills, and cross-platform development.",
    "Super60 8.0": "Super60 8.0 is the most recent batch with a sharp focus on AI, open source, and startup building mindset.",
  };

  const filteredByBatch = selectedBatch === "All Batches"
    ? members
    : members.filter((m) => m.batch === selectedBatch);

  const filtered = filteredByBatch.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleMembers = showAll ? filtered : filtered.slice(0, 8);

  return (
    <div className="min-h-screen px-4 py-6 font-sans bg-white md:p-8">

                
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {batches.map((batch) => (
          <button
            key={batch}
            onClick={() => {
              setSelectedBatch(batch);
              setShowAll(false);
              setSearchTerm("");
            }}
            className={`px-4 py-2 rounded-full font-semibold border transition-all duration-300 whitespace-nowrap ${
              selectedBatch === batch
                ? "text-white bg-[#002277]"
                : "text-[#002277] border-[#002277] hover:bg-[#002277]/10"
            }`}
          >
            {batch}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002277]"
        />
      </div>

      {batchDescriptions[selectedBatch] && (
        <div className="relative max-w-4xl px-6 py-5 mx-auto mb-8 text-base text-gray-800 border-l-4 border-[#002277] bg-blue-50 rounded-lg shadow-sm">
          <p className="leading-relaxed">
            <span className="font-semibold text-[#002277]">{selectedBatch}:</span> {batchDescriptions[selectedBatch]}
          </p>
        </div>
      )}


      <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
        {selectedBatch} <span className="text-sm text-gray-500">({filtered.length})</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {visibleMembers.map((member) => (
          <div
            key={member.id}
            className="relative w-full max-w-xs p-5 transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-xl group"
          >
            <div className="relative overflow-hidden rounded-xl aspect-w-4 aspect-h-3">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute z-10 flex flex-col gap-2 top-3 right-3">
              <a href={member.github} target="_blank" rel="noreferrer">
                <FaGithub className="p-1 text-xl text-white bg-[#002277] rounded-full" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin className="p-1 text-xl text-white bg-[#002277] rounded-full" />
              </a>
            </div>
            <div className="mt-4 space-y-1">
              <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-[#002277] rounded-full">
                {member.batch}
              </span>
              <h2 className="text-lg font-semibold text-gray-900">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.degree}</p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {member.skills !== undefined && (
                  <span className="px-2 py-1 text-blue-700 rounded-full bg-blue-50">
                    {member.skills} Skills
                  </span>
                )}
                {member.achievements !== undefined && (
                  <span className="px-2 py-1 text-green-700 rounded-full bg-green-50">
                    🎖 {member.achievements} Achievements
                  </span>
                )}
                {member.projects !== undefined && (
                  <span className="px-2 py-1 text-orange-700 rounded-full bg-orange-50">
                    👜 {member.projects} Projects
                  </span>
                )}
              </div>
            </div>
            <div className="absolute p-2 text-white bg-[#002277] rounded-full bottom-3 right-3">
              <FaArrowUpRightFromSquare />
            </div>
          </div>
        ))}
      </div>

      {filtered.length > 8 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/batches")}
            className="px-6 py-2 text-white transition rounded-lg hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            View All Members
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;
