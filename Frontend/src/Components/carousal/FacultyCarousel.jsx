import React from "react";

const facultyData = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    title: "Principal",
    description: "Leading academic excellence with a focus on holistic student development.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFNTzTH8mq59w/profile-displayphoto-shrink_800_800/B56ZRLIxkMG8Ag-/0/1736427379944?e=1756339200&v=beta&t=BjOb7ejzjeE1HjemF5YGaOIu3XGQeb_V_nq1aYFaUq0",
  },
   {
    id: 1,
    name: "Dr. A. Sharma",
    title: "Principal",
    description: "Leading academic excellence with a focus on holistic student development.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQFNTzTH8mq59w/profile-displayphoto-shrink_800_800/B56ZRLIxkMG8Ag-/0/1736427379944?e=1756339200&v=beta&t=BjOb7ejzjeE1HjemF5YGaOIu3XGQeb_V_nq1aYFaUq0",
  },
 
];

const FacultyCarousel = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto overflow-hidden" aria-label="Faculty Carousel">
      {/* Viewport */}
      <ol className="flex overflow-x-auto max-w-7xl carousel-viewport scroll-smooth snap-x snap-mandatory">
        {facultyData.map((faculty, i) => (
          <li
            key={faculty.id}
            id={`slide${faculty.id}`}
            className="flex-shrink-0 w-full px-4 py-6 snap-center"
          >
            <div className="p-6 text-center bg-white shadow-md rounded-xl">
              <img
                src={faculty.image}
                alt={faculty.name}
                className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">{faculty.name}</h2>
              <h3 className="text-sm text-gray-500">{faculty.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{faculty.description}</p>
            </div>

            {/* Prev / Next arrows */}
            <a
              href={`#slide${(i - 1 + facultyData.length) % facultyData.length + 1}`}
              className="absolute p-2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 left-2"
            >
              ‹
            </a>
            <a
              href={`#slide${(i + 1) % facultyData.length + 1}`}
              className="absolute p-2 text-white -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 right-2"
            >
              ›
            </a>
          </li>
        ))}
      </ol>

      {/* Dots */}
      <div className="absolute flex justify-center w-full space-x-2 bottom-4">
        {facultyData.map((faculty) => (
          <a
            key={faculty.id}
            href={`#slide${faculty.id}`}
            className="w-3 h-3 bg-gray-700 border border-white rounded-full"
          ></a>
        ))}
      </div>

      {/* Internal CSS for animation */}
      <style>{`
        .carousel-viewport {
          animation: slideAuto 16s ease-in-out infinite;
        }

        @keyframes slideAuto {
          0%, 20%   { scroll-behavior: smooth; scroll-snap-align: center; scroll-margin-left: 0%; }
          25%, 45%  { scroll-margin-left: 100%; }
          50%, 70%  { scroll-margin-left: 200%; }
          75%, 95%  { scroll-margin-left: 300%; }
          100%      { scroll-margin-left: 0%; }
        }

        @media (hover: hover) {
          .carousel-viewport:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default FacultyCarousel;
