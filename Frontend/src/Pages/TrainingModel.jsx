import React from "react";

const TrainingModel = () => {
  const places = [
    { id: 1, title: "PLACE WHERE VISITED" },
    { id: 2, title: "PLACE WHERE VISITED" },
    { id: 3, title: "PLACE WHERE VISITED" },
    { id: 4, title: "PLACE WHERE VISITED" },
  ];

  return (

<div>
  
    <div className="px-4 py-6 bg-white">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-10 pt-4 mb-10 sm:grid-cols-2">
      {places.map((place) => (
        <div
          key={place.id}
          className="flex items-center h-40 max-w-xl px-6 py-4 bg-gray-300 rounded-3xl w-96"
        >
          <div className="w-20 h-20 bg-[#ff6600] rounded-2xl flex items-center justify-center mr-4">
            <div className="w-12 h-12 bg-orange-800" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-black">{place.title}</h2>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  </div >
    
  );
};

export default TrainingModel;


