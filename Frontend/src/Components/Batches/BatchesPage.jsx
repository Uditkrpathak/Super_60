import { useState } from "react";
import BatchTabs from "./BatchTabs";
import StudentCard from "./StudentCard";
import { useEffect } from "react";
import axios from 'axios';
import BACKEND_URL from "../../utils/axiosConfig";

const allStudents = [
  {
    name: "Sahil Kumar",
    image: "https://www.profilebakery.com/wp-content/uploads/2023/04/Profile-Image-AI.jpg",
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

  const [students, setStudents] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/student/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  const filteredStudents =
    selectedBatch === "All Batches"
      ? students
      : students.filter((s) => s.batch === selectedBatch);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-4xl md:max-w-7xl">
      <h1 className="mb-2 text-3xl sm:text-4xl font-bold text-center text-[#002277]">
        Our Batches
      </h1>
      <p className="mb-10 text-sm sm:text-base font-semibold text-center text-gray-600">
        Explore the talented members of <span className="text-[#002277] font-bold">The Super 60</span>.
      </p>

      <BatchTabs selected={selectedBatch} setSelected={setSelectedBatch} />

      <div className="grid gap-6 mt-10 pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student, idx) => (
          <div key={idx} className="transition-transform duration-500 hover:scale-102">
            <StudentCard student={student} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchesPage;
