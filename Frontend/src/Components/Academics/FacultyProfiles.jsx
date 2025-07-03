import React, { useEffect, useState } from "react";
import { FaSearch, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import BACKEND_URL from "../../utils/axiosConfig.js";

const FacultyProfiles = () => {
  const [faculty, setFaculty] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sort, setSort] = useState("None");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/faculty`);
        setFaculty(res.data);
      } catch (err) {
        console.error("Error fetching faculty:", err.message);
      }
    };
    fetchFaculty();
  }, []);

  useEffect(() => {
    let result = [...faculty];

    result = result.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "All" || item.department === department;
      return matchesSearch && matchesDept;
    });

    if (sort === "Most Experienced") {
      result.sort((a, b) => b.experience - a.experience);
    } else if (sort === "Recently Joined") {
      result.sort((a, b) => a.experience - b.experience);
    }

    setFiltered(result);
  }, [search, department, sort, faculty]);

  return (
    <div className="min-h-screen bg-white text-blue font-body">
      <div className="w-full px-6 py-10">
        <h2 className="text-3xl font-bold tracking-wide text-center sm:text-3xl font-heading">
          <span className="text-[#FF6B00]">FACULTY</span>{" "}
          <span className="text-[#002244]">PROFILES</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row">
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

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:w-1/4"
          >
            <option value="All">All Departments</option>
            {[...new Set(faculty.map(f => f.department))].map((dept, i) => (
              <option key={i} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm sm:w-1/4"
          >
            <option value="None">Sort by</option>
            <option value="Most Experienced">Most Experienced</option>
            <option value="Recently Joined">Recently Joined</option>
          </select>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-8">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div
              key={index}
              className="relative group bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#002244]/80 flex flex-col justify-center items-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm text-orange-200 mb-4">{item.descrip}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelected(item)}
                      className="bg-orange-500 text-white text-xs px-4 py-1 rounded-full hover:bg-orange-600"
                    >
                      View Profile
                    </button>
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-xl hover:text-[#0077b5]"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1">
                <h3 className="text-lg font-semibold text-[#002244]">{item.name}</h3>
                <p className="text-sm italic text-gray-600">{item.title}</p>
                <p className="text-xs font-medium text-orange-500">{item.department}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No faculty found matching your criteria.</p>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-orange-300"
              />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-[#002244]">{selected.name}</h2>
                <p className="text-sm italic text-gray-600">{selected.title}</p>
                <p className="text-sm text-orange-600 font-semibold">{selected.department}</p>
                <p className="mt-3 text-gray-700">{selected.descrip}</p>
                <p className="mt-2 text-sm text-gray-500">
                  <strong>Experience:</strong> {selected.experience}+ years
                </p>
                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[#0077b5] hover:underline font-medium"
                >
                  Visit LinkedIn Profile →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfiles;
