import React from "react";

const trainers = [
  {
    name: "John Doe",
    category: "Strength Coach",
    image:
      "https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Jane Smith",
    category: "Yoga Expert",
    image:
      "https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Alex Johnson",
    category: "Nutritionist",
    image:
      "https://images.unsplash.com/photo-1556680262-9990363a3e6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Sophie Lee",
    category: "Fitness Model",
    image:
      "https://images.unsplash.com/photo-1557004396-66e4174d7bf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  },
];

const TrainerGrid = () => {
  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-[#0f4667] to-[#2a6973]">
      <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer, index) => (
          <a
            key={index}
            href="#"
            className="relative block overflow-hidden group rounded-2xl"
          >
            <div
              className="absolute inset-0 transition-transform duration-300 ease-in-out transform bg-center bg-cover group-hover:scale-105"
              style={{ backgroundImage: `url(${trainer.image})` }}
            />
            <div className="absolute inset-0 transition duration-300 bg-black bg-opacity-50 group-hover:bg-opacity-30" />
            <div className="relative z-10 p-6">
              <p className="text-sm tracking-widest text-white uppercase opacity-70">
                {trainer.category}
              </p>
              <h3 className="mt-2 text-xl font-bold text-white drop-shadow-lg">
                {trainer.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrainerGrid;
