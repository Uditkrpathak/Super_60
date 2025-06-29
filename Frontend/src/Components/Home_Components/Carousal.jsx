// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import photo1 from '../../assets/Photo.jpg';

// const images = [photo1, photo1, photo1, photo1];

// const carouselTexts = [
//   { title: "Batch 5.0", description: "Year : 2021-2025" },
//   { title: "Batch 6.0", description: "Year : 2022-2026" },
//   { title: "Batch 7.0", description: "Year : 2023-2027" },
//   { title: "Batch 8.0", description: "Year : 2024-2028" }
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
//     <section className="relative min-h-[32rem] sm:min-h-[40rem] md:min-h-[48rem] overflow-visible flex items-start">
//       {/* Rolling marquee text */}
//       <div className="absolute top-0 left-0 w-full py-2 overflow-hidden text-white bg-black z-[50] whitespace-nowrap">
//         <div className="text-sm font-medium tracking-wide animate-marquee sm:text-base">
//           {rollingText.repeat(10)}
//         </div>
//       </div>

//       {/* Image container */}
//       <div className="relative flex items-center justify-center w-full">
//         <div
//           className="relative  w-[95vw] sm:w-[80vw] md:w-[70rem] h-[15rem] sm:h-[20rem] md:h-[30rem] z-20 shadow-xl overflow-hidden border-4 border-white bg-white rounded-2xl"
//           style={{ perspective: "1200px" }}
//         >
//           {images.map((src, index) => {
//             if (index === currentIndex) {
//               return (
//                 <img
//                   key={index}
//                   src={src}
//                   alt={`Super60 Image ${index + 1}`}
//                   className="absolute top-0 left-0 object-cover w-full h-full carousel-img-current rounded-2xl"
//                   style={{ zIndex: 1 }}
//                   loading="eager"
//                 />
//               );
//             }
//             if (index === (currentIndex + 1) % images.length) {
//               return (
//                 <img
//                   key={index}
//                   src={src}
//                   alt={`Super60 Image ${index + 1}`}
//                   className="absolute top-0 left-0 object-cover w-full h-full carousel-img-next-slide rounded-2xl"
//                   style={{ zIndex: 2 }}
//                   loading="lazy"
//                 />
//               );
//             }
//             return null;
//           })}
//         </div>

//         {/* Info Block */}
//         <div className="absolute z-40 flex flex-col items-start gap-4 text-left bottom-6 right-20 sm:bottom-10 sm:right-8">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-xs px-4 py-3 text-white bg-black rounded-md shadow-md bg-opacity-70"
//           >
//             <h3 className="text-sm font-semibold text-orange-400">
//               {carouselTexts[currentIndex].title}
//             </h3>
//             <p className="mt-1 text-xs text-gray-300">
//               {carouselTexts[currentIndex].description}
//             </p>
//           </motion.div>

//           {/* Navigation & progress */}
//           <div className="flex flex-col items-end gap-2">
//             <div className="flex items-center gap-4 text-black">
//               <button
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     (prev - 1 + images.length) % images.length
//                   )
//                 }
//                 className="text-2xl font-bold hover:opacity-70"
//               >
//                 &lt;
//               </button>

//               <span className="text-sm tracking-wider">
//                 {String(currentIndex + 1).padStart(2, "0")} /{" "}
//                 {String(images.length).padStart(2, "0")}
//               </span>

//               <button
//                 onClick={() =>
//                   setCurrentIndex((prev) => (prev + 1) % images.length)
//                 }
//                 className="text-2xl font-bold hover:opacity-70"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="absolute w-[30%] h-1 bottom-0 bg-white/30 rounded-full overflow-hidden">
//           <div
//             className="h-full transition-all duration-500 bg-black"
//             style={{
//               width: `${((currentIndex + 1) / images.length) * 100}%`
//             }}
//           />
//         </div>
//       </div>

//       {/* Styles */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 50s linear infinite;
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
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(0); }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Carousel;

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import photo1 from '../../assets/Photo.jpg';

const images = [photo1, photo1, photo1, photo1];

const carouselTexts = [
  { title: "Batch 5.0", description: "Year : 2021-2025" },
  { title: "Batch 6.0", description: "Year : 2022-2026" },
  { title: "Batch 7.0", description: "Year : 2023-2027" },
  { title: "Batch 8.0", description: "Year : 2024-2028" }
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
    <section className="relative min-h-[32rem] sm:min-h-[40rem] md:min-h-[48rem] overflow-visible flex items-start">
      {/* Rolling marquee text */}
      <div className="absolute top-0 left-0 w-full py-2 overflow-hidden text-white bg-black z-[50] whitespace-nowrap">
        <div className="text-sm font-medium tracking-wide animate-marquee sm:text-base">
          {rollingText.repeat(10)}
        </div>
      </div>

      {/* Image container */}
      <div className="relative flex flex-col items-center justify-center w-full">
        <div
          className="relative  w-[95vw] sm:w-[80vw] md:w-[70rem] h-[15rem] sm:h-[20rem] md:h-[30rem] z-20 shadow-xl overflow-hidden border-4 border-white bg-white rounded-2xl"
          style={{ perspective: "1200px" }}
        >
          {images.map((src, index) => {
            if (index === currentIndex) {
              return (
                <img
                  key={index}
                  src={src}
                  alt={`Super60 Image ${index + 1}`}
                  className="absolute top-0 left-0 object-cover w-full h-full carousel-img-current rounded-2xl"
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
                  className="absolute top-0 left-0 object-cover w-full h-full carousel-img-next-slide rounded-2xl"
                  style={{ zIndex: 2 }}
                  loading="lazy"
                />
              );
            }
            return null;
          })}
        </div>

        {/* Info Block */}
        <div className="z-40 flex flex-col items-end w-full max-w-sm gap-2 px-4 mt-6">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full px-4 py-3 text-white bg-black rounded-md shadow-md sm:w-auto bg-opacity-70"
          >
            <h3 className="text-sm font-semibold text-orange-400">
              {carouselTexts[currentIndex].title}
            </h3>
            <p className="mt-1 text-xs text-gray-300">
              {carouselTexts[currentIndex].description}
            </p>
          </motion.div>

          <div className="flex items-center justify-between w-full gap-4 text-black sm:w-auto">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  (prev - 1 + images.length) % images.length
                )
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

        {/* Progress Bar */}
        <div className="w-[90%] sm:w-[60%] h-1 mt-4 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 bg-black"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 50s linear infinite;
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



