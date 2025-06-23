import React from "react";
import { FaSearch } from "react-icons/fa";

const data = [
  {
    name: "Kristin Meyer",
    title: "Associate professor of Biology",
    descrip:
      "Dr. Kristin is a passionate educator with 10+ years of research in cell biology and genetics. Passionate about nurturing curiosity in young minds and guiding them through hands-on projects.",
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Robert Langdon",
    title: "Professor of Symbology",
    descrip:
      "World-renowned for decoding historical secrets. Teaches ancient symbols and cryptology. Passionate about nurturing curiosity in young minds and guiding them through hands-on projects.",
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lara Grant",
    title: "Assistant Professor of AI",
    descrip:
      "Loves machine learning and deep neural networks. Published 30+ papers in last 3 years. Passionate about nurturing curiosity in young minds and guiding them through hands-on projects.",
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lara Grant",
    title: "Assistant Professor of AI",
    descrip:
      "Loves machine learning and deep neural networks. Published 30+ papers in last 3 years. Passionate about nurturing curiosity in young minds and guiding them through hands-on projects.",
    image:
      "https://images.unsplash.com/photo-1749741335932-f5295ee9afd0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const FacultyProfiles = () => {
  return (
    <div className="bg-white min-h-screen font-body text-blue">
      {/* Header Section */}
      <div className="w-full px-6 py-10">
        <h2 className="text-center text-3xl sm:text-3xl font-heading font-bold tracking-wide">
          <span className="text-[#FF6B00]">FACULTY</span>{" "}
          <span className="text-[#002244]">PROFILES</span>
        </h2>

        {/* Search & Filter Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange font-body"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-lg">
              <FaSearch />
            </span>
          </div>

          <select className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange font-sub">
            <option>Department</option>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Mechanical</option>
          </select>

          <select className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange font-sub">
            <option>Filters</option>
            <option>Most Experienced</option>
            <option>Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative group h-[320px] bg-black rounded-xl overflow-hidden shadow-md transition-all duration-500"
          >
            {/* Image with zoom + visible slide down */}
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:translate-y-12 group-hover:opacity-30"
            />

            {/* Overlay */}
            <div className="absolute inset-0 transition-colors duration-500 group-hover:bg-[#002244] bg-transparent flex flex-col justify-end p-6 z-10">
              {/* Name + Title - HIDE on Hover */}
              <div className="font-heading transition-opacity duration-500 group-hover:opacity-0 text-white">
                <p className="text-sm font-semibold uppercase mb-2 text-orange">
                  RESEARCH REPORT
                </p>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm italic font-sub">{item.title}</p>
              </div>

              {/* Description slides in from right */}
              <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
                <p className="text-sm max-w-sm transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-in-out font-body text-[#C57726]">
                  {item.descrip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyProfiles;
