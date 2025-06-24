import { useState } from "react";
import HeroBg from "./backgrounds/herobg";

const Hero = () => {
  const [bgActive, setBgActive] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
      onMouseEnter={() => setBgActive(true)}
      onMouseLeave={() => setBgActive(false)}
    >
      {/* Background Animation */}
      <HeroBg active={bgActive} />
      
      <div className="max-w-6xl w-full z-10 pt-32">
        {/* Section Tagline */}
        <p className="text-lg text-gray-500 mb-6 font-large">
          <span className="bg-white/40 rounded-lg px-2 py-1">The </span>
          <span className="text-orange-600 font-semibold bg-white/40 rounded-lg px-2 py-1">
            Super60
          </span>{" "}
          <span className="bg-white/40 rounded-lg px-2 py-1">Community</span>
        </p>
        
        {/* Hero Headline */}
        <div className="relative inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-black bg-white/40 rounded-lg px-4 py-2 break-words">
            A Community of Coders,
            <br />
            Creators & Achievers.
          </h1>
        </div>
        
        {/* Subheadline */}
        <p className="mt-6 text-gray-700 text-lg max-w-2xl bg-white/40 rounded-lg px-4 py-2">
          Unlock your true potential with the{" "}
          <span className="text-orange-600 font-semibold">Super60</span> Community
          — immersive learning, real-world projects, and a culture of excellence.
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