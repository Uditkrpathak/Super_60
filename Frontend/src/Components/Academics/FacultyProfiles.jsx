import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const data = [
  {
    name: "Kristin Meyer",
    title: "Associate professor of Biology",
    department: "Biology",
    experience: 10,
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop",
    descrip:
      "Dr. Kristin is a passionate educator with 10+ years of research in cell biology and genetics.",
  },
  {
    name: "Robert Langdon",
    title: "Professor of Symbology",
    department: "Humanities",
    experience: 20,
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop",
    descrip:
      "World-renowned for decoding historical secrets. Teaches ancient symbols and cryptology.",
  },
  {
    name: "Lara Grant",
    title: "Assistant Professor of AI",
    department: "Computer Science",
    experience: 3,
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop",
    descrip:
      "Loves machine learning and deep neural networks. Published 30+ papers in last 3 years.",
  },
  {
    name: "Alex Johnson",
    title: "Professor of Mechanical Engineering",
    department: "Mechanical",
    experience: 15,
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop",
    descrip:
      "Specializes in thermodynamics and robotics. Runs a lab on autonomous systems.",
  },
];

const FacultyProfiles = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortOption, setSortOption] = useState("None");

  const filteredData = data
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "All" || item.department === department;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortOption === "Most Experienced") return b.experience - a.experience;
      if (sortOption === "Recently Joined") return a.experience - b.experience;
      return 0;
    });

  return (
    <div className="min-h-screen bg-white font-body text-blue">
      <div className="w-full px-6 py-10">
        <h2 className="text-3xl font-bold tracking-wide text-center sm:text-3xl font-heading">
          <span className="text-[#FF6B00]">FACULTY</span>{" "}
          <span className="text-[#002244]">PROFILES</span>
        </h2>

        {/* Search & Filter Section */}
        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search by name or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange font-body"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
              <FaSearch />
            </span>
          </div>

          {/* Department Filter */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange font-sub"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Biology">Biology</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Humanities">Humanities</option>
          </select>

          {/* Sorting */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-orange font-sub"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="None">Sort by</option>
            <option value="Most Experienced">Most Experienced</option>
            <option value="Recently Joined">Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-8">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="relative group h-[320px] bg-black rounded-xl overflow-hidden shadow-md transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 ease-in-out transform group-hover:scale-110 group-hover:translate-y-12 group-hover:opacity-30"
              />
              <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-[#002244] bg-transparent flex flex-col justify-end p-6 z-10">
                <div className="text-white transition-opacity duration-500 font-heading group-hover:opacity-0">
                  <p className="mb-2 text-sm font-semibold uppercase text-orange">
                    RESEARCH REPORT
                  </p>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm italic font-sub">{item.title}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
                  <p className="text-sm max-w-sm transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-in-out font-body text-[#C57726]">
                    {item.descrip}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-10 text-lg text-center text-gray-500 col-span-full">
            No faculty found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default FacultyProfiles;
