import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import photo1 from '../../assets/Photo.jpg';

const images = [photo1, photo1, photo1, photo1];

const carouselTexts = [
  {
    title: "Batch 5.0",
    description: "Year : 2021-2025"
  },
  {
    title: "Batch 6.0",
    description: "Year : 2022-2026"
  },
  {
    title: "Batch 7.0",
    description: "Year : 2023-2027"
  },
  {
    title: "Batch 8.0",
    description: "Year : 2024-2028"
  }
];

const rollingText =
  "Immersive Learning  →  Real World Projects  →  Peer Mentorship  →  Super60 Culture  →  Growth Begins Here  → ";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="relative min-h-[36rem] sm:min-h-[40rem] md:min-h-[48rem] overflow-visible flex items-start justify-center px-4 sm:px-6 md:px-10">
      {/* Rolling marquee text */}
      <div className="absolute top-0 left-0 w-full bg-black text-white py-2 overflow-hidden whitespace-nowrap z-30">
        <div className="animate-marquee text-xs sm:text-sm md:text-base font-medium tracking-wide">
          {rollingText.repeat(10)}
        </div>
      </div>

      {/* Carousel Box */}
      <div
        className="absolute -top-20 sm:-top-24 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-[18rem] sm:h-[24rem] md:h-[28rem] lg:h-[35rem] z-20 shadow-xl overflow-hidden border-4 border-white bg-white rounded-2xl"
        style={{ perspective: "1200px" }}
      >
        {images.map((src, index) => {
          if (index === currentIndex) {
            return (
              <img
                key={index}
                src={src}
                alt={`Super60 Image ${index + 1}`}
                className="carousel-img-current absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                style={{ zIndex: 1 }}
                loading="eager"
              />
            );
          }
          if (index === (currentIndex + 1) % images.length) {
            return (
              <img
                key={index}
                src={src}
                alt={`Super60 Image ${index + 1}`}
                className="carousel-img-next-slide absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                style={{ zIndex: 2 }}
                loading="lazy"
              />
            );
          }
          return null;
        })}

        {/* Bottom-right corner info block */}
        <div className="absolute w-[285px] bottom-12 right-6 flex flex-col items-start text-left gap-4 z-40">
          {/* Title + Description */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-md shadow-md max-w-xs"
          >
            <h3 className="text-sm text-orange-400 font-semibold">{carouselTexts[currentIndex].title}</h3>
            <p className="text-xs text-gray-300 mt-1">{carouselTexts[currentIndex].description}</p>
          </motion.div>

          {/* Navigation & progress */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 text-black">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
                }
                className="text-2xl font-bold hover:opacity-70"
              >
                &lt;
              </button>

              <span className="text-sm tracking-wider">
                {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>

              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % images.length)
                }
                className="text-2xl font-bold hover:opacity-70"
              >
                &gt;
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="absolute w-[30%] h-1 bottom-0 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 40s linear infinite;
        }

        .carousel-img-current {
          opacity: 1;
          transition: opacity 0.7s;
        }

        .carousel-img-next-slide {
          animation: slideInRight 0.7s cubic-bezier(.77,0,.18,1);
          opacity: 1;
        }

        @keyframes slideInRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default Carousel;

