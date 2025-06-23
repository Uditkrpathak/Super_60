import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden w-[300px]">
      <img src={student.image} alt={student.name} className="object-cover w-full h-48" />
      <div className="p-4">
        <p className="inline-block px-2 py-1 mb-2 text-xs text-white bg-[#002277] rounded">
          {student.batch}
        </p>
        <h2 className="text-lg font-bold">{student.name}</h2>
        <p className="text-sm text-gray-600">{student.branch}</p>
        <div className="mt-3 space-y-1 text-sm">
          <p>🛠 {student.skills.length} Skills</p>
          <p>🏅 {student.achievements} Achievements</p>
          <p>📦 {student.projects} Projects</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
