import React from "react";
import { FaUsers, FaMedal } from "react-icons/fa";

const batches = [
  { label: "All Batches", icon: <FaUsers /> },
  { label: "Super60 6.0", icon: <FaMedal /> },
  { label: "Super60 7.0", icon: <FaMedal /> },
  { label: "Super60 8.0", icon: <FaMedal /> },
];

const BatchTabs = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {batches.map((batch, idx) => (
        <button
          key={idx}
          onClick={() => setSelected(batch.label)}
          className={`flex items-center gap-2 px-5 py-2 rounded-md font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
            selected === batch.label
              ? "bg-[#C57726] text-white"
              : "bg-white border border-gray-300 text-[#002277]"
          }`}
        >
          <span className="text-lg">{batch.icon}</span>
          <span>{batch.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BatchTabs;
