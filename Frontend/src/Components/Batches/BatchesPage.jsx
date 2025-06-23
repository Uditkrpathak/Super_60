import React, { useState } from "react";
import BatchTabs from "./BatchTabs";
import StudentCard from "./StudentCard";

const allStudents = [
  {
    name: "Sahil Kumar",
    image: "https://via.placeholder.com/300x200",
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


const BatchesPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  const filteredStudents =
    selectedBatch === "All Batches"
      ? allStudents
      : allStudents.filter((s) => s.batch === selectedBatch);

  return (
    <div className="p-6">
      <h1 className="mb-2 text-4xl font-bold text-center text-[#002277]">Our Batches</h1>
      <p className="mb-10 text-center text-gray-600 ">
        Explore the talented members of The Super 60.
      </p>

      <BatchTabs selected={selectedBatch} setSelected={setSelectedBatch} />

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {filteredStudents.map((student, idx) => (
          <StudentCard key={idx} student={student} />
        ))}
      </div>
    </div>
  );
};

export default BatchesPage;
