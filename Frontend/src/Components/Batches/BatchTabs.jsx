import React from "react";

const batches = ["All Batches", "Super60 6.0", "Super60 7.0", "Super60 8.0"];

const BatchTabs = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {batches.map((batch, idx) => (
        <button
          key={idx}
          onClick={() => setSelected(batch)}
          className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all ${
            selected === batch
              ? "bg-[#C57726] text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          {batch}
        </button>
      ))}
    </div>
  );
};

export default BatchTabs;
