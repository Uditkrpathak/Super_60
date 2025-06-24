import React from "react";

const images = [
  "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAumzE9eFQAhYxgKZ6AOMFluBUJEmvVjiwbnNWpq",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",
];

export default function GalleryGrid() {
  return (
    <section className="px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2">A Glimpse of</h2>
      <h3 className="text-4xl font-extrabold text-[#002277] text-center mb-8">Our Exciting Achievements</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 row-span-2">
          <img src={images[0]} alt="Event 1" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
        <div>
          <img src={images[1]} alt="Event 2" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
        <div>
          <img src={images[2]} alt="Event 3" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <img src={images[3]} alt="Event 4" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
        <div>
          <img src={images[4]} alt="Event 5" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
        <div>
          <img src={images[5]} alt="Event 6" className="w-full h-72 object-cover rounded-xl shadow" />
        </div>
      </div>
    </section>
  );
}
