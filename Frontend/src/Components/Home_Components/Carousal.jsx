// import { useState, useEffect, useRef } from "react";
// import photo1 from '../../assets/Photo.jpg';


// const images = [
//   photo1,
//   photo1,
//   photo1,
//   photo1
// ];

// const rollingText =
//   "Immersive Learning  →  Real World Projects  →  Peer Mentorship  →  Super60 Culture  →  Growth Begins Here  → ";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   return (
//     <section className="relative h-[48rem]  overflow-visible  flex items-start">

//       <div className="absolute top-0 left-0 w-full bg-black text-white py-2 overflow-hidden whitespace-nowrap">
//         <div className="animate-marquee text-sm sm:text-base font-medium tracking-wide">
//           {rollingText.repeat(10)}
//         </div>
//       </div>

//       <style>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }

//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 50s linear infinite; // <-- Slower speed (was 30s)
//         }
//       `}</style>
//       {/* Small Carousel Image on the left, raised up */}
//       <div className="absolute -top-24 left-8 w-[75rem] h-[35rem] z-20 shadow-xl overflow-hidden border-4 border-white bg-white rounded-2xl" style={{ perspective: "1200px" }}>
//         {images.map((src, index) => {
//           // Show current and next image only
//           if (index === currentIndex) {
//             // Current image stays in place
//             return (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Super60 Image ${index + 1}`}
//                 className="carousel-img-current absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
//                 style={{ zIndex: 1 }}
//                 loading="eager"
//               />
//             );
//           }
//           // Next image slides in from left to right
//           if (index === (currentIndex + 1) % images.length) {
//             return (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Super60 Image ${index + 1}`}
//                 className="carousel-img-next-slide absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
//                 style={{ zIndex: 2 }}
//                 loading="lazy"
//               />
//             );
//           }
//           return null;
//         })}
//       </div>

//       <style>{`
//         .carousel-img-hidden {
//           opacity: 0;
//           pointer-events: none;
//           transform: translateX(100%);
//           transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
//         }
//         .carousel-img-active {
//           opacity: 1;
//           pointer-events: auto;
//           transform: translateX(0);
//           transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
//         }
//         .carousel-img-prev {
//           opacity: 0;
//           pointer-events: none;
//           transform: translateX(-100%);
//           transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
//         }
//         .carousel-img-next {
//           opacity: 0;
//           pointer-events: none;
//           transform: translateX(100%);
//           transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
//         }
//         .carousel-img-current {
//           opacity: 1;
//           transition: opacity 0.7s;
//         }
//         .carousel-img-next-slide {
//           animation: slideInRight 0.7s cubic-bezier(.77,0,.18,1);
//           opacity: 1;
//         }
//         @keyframes slideInRight {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(0%);
//           }
//         }
//       `}</style>
//       {/* Rolling Text Bar */}

//     </section>
//   );
// };

// export default Carousel;

import { useState, useEffect, useRef } from "react";
import photo1 from "../../assets/Photo.jpg";

const images = [photo1, photo1, photo1, photo1];

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
      {/* Rolling Text */}
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

        .carousel-img-hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateX(100%);
          transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
        }

        .carousel-img-active {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
          transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
        }

        .carousel-img-prev {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-100%);
          transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
        }

        .carousel-img-next {
          opacity: 0;
          pointer-events: none;
          transform: translateX(100%);
          transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.5s;
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
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;

