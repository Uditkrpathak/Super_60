import HeroBg from "./backgrounds/herobg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 bg-white overflow-hidden">
        {/* Background Animation */}
     <HeroBg defaultPosition={{ x: 800, y: 520 }} />
      <div className="max-w-6xl w-full">
        {/* Section Tagline */}
        <p className="text-sm text-gray-500 mb-6 font-medium">
          The <span className="text-orange-600 font-semibold">Super60</span> Community
        </p>

        

        {/* Hero Headline with Orange Block */}
        <div className="relative inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-black break-words">
            A Community of Coders,
            <br />
            Creators & Achievers.
          </h1>

          {/* Orange Diamond */ }
                {/* <div className="absolute right-[-70px] top-6 rotate-45 bg-orange-500 w-20 h-20 z-0">
                <p className="absolute -rotate-45 text-xs text-black font-medium top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Super60
                </p>
                </div> */}
              </div>

              {/* Subheadline */}
        <p className="mt-6 text-gray-700 text-lg max-w-2xl">
          Unlock your true potential with the <span className="text-orange-600 font-semibold">Super60</span> Community — immersive learning, real-world projects, and a culture of excellence.
        </p>

        {/* CTA Button */}
        <button className="mt-10 px-6 py-3 bg-blue-900 text-white rounded-full text-sm font-medium hover:bg-blue-800 transition">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;