import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroBg from "./backgrounds/herobg";

const lines = [
  "Shaping Tech Leaders.",
];

const typeWords = ["Code.", "Build.", "Lead.", "Together."];

const typeSpeed = 100; // ms per character
const wordDelay = 700; // ms between words

const Hero = () => {
  const [bgActive, setBgActive] = useState(false);

  // Typewriter state for the second line
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timeout;
    if (charIdx < typeWords[wordIdx].length) {
      timeout = setTimeout(() => {
        setDisplayed(typeWords[wordIdx].slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, typeSpeed);
    } else {
      timeout = setTimeout(() => {
        setCharIdx(0);
        setWordIdx((wordIdx + 1) % typeWords.length);
        setDisplayed("");
      }, wordDelay);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, wordIdx]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-left px-48 overflow-hidden"
      onMouseEnter={() => setBgActive(true)}
      onMouseLeave={() => setBgActive(false)}
    >

      {/* Background Animation */}
      <HeroBg active={bgActive} />

      <div className="max-w-8xl w-full z-10 pt-32">
        {/* Section Tagline */}
        <p className="text-5xl text-gray-500 mb-6">
          <span className="bg-white/40 rounded-lg px-2 py-1">The </span>
          <span className="text-orange-600 font-semibold bg-white/40 rounded-lg px-2 py-1">
            Super60
          </span>{" "}
          <span className="bg-white/40 rounded-lg px-2 py-1">Community</span>
        </p>

        {/* Animated Hero Headline */}
        <div className="relative inline-block">
          <h1 className="font-montserrat text-5xl sm:text-6xl md:text-8xl leading-tight text-black bg-white/40 rounded-lg py-2 break-words">
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.8, duration: 0.7 }}
              >
                {line}
              </motion.span>
            ))}
            <span className="block text-orange-600 min-h-[2.5rem]">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="mt-6 text-gray-700 text-lg max-w-2xl bg-white/40 rounded-lg px-4 py-2">
          Beyond classrooms and curriculums —{" "}
          <span className="text-orange-600 font-semibold">Super60</span> builds
          future-ready developers through purpose, passion, and people.
        </p>

        {/* CTA Button */}
        <button className="mt-10 px-6 py-3 bg-blue-900 text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors duration-300">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;