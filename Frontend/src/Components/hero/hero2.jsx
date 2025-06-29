import { useState, useEffect, useRef } from "react";
import HeroBg from "./backgrounds/herobg";
import JoinUsButtonHero from "./JoinUsButtonHero"
const Hero = () => {
  const [bgActive, setBgActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const fadeThreshold = heroHeight * 0.3;
      setIsVisible(currentScrollY < fadeThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
          }
        });
      },
      { threshold: 0.1 }
    );

    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollProgress = Math.min(scrollY / 400, 1);
  const heroOpacity = Math.max(0.2, 1 - scrollProgress * 0.8);
  const heroScale = Math.max(0.95, 1 - scrollProgress * 0.05);
  const blurAmount = scrollProgress * 3;

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 0.6);
          }
        }

        @keyframes textShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .floating-element {
          animation: floatAnimation 3s ease-in-out infinite;
        }

        .floating-element:nth-child(2) {
          animation-delay: -1s;
        }

        .floating-element:nth-child(3) {
          animation-delay: -2s;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #000 0%, #f97316 50%, #000 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s ease-in-out infinite;
        }

        .glow-button {
          animation: pulseGlow 2s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .parallax-layer {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden max-w-[90rem] mx-auto px-4 sm:px-8 md:px-12 mt-6"
        onMouseEnter={() => setBgActive(true)}
        onMouseLeave={() => setBgActive(false)}
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          filter: `blur(${blurAmount}px)`,
          transition: "all 0.3s ease-out",
        }}
      >
        {/* Backgrounds */}
        {/* <HeroLogoBg scrollY={scrollY} bgActive={bgActive} /> */}
        {/* <SBg scrollY={scrollY} bgActive={bgActive} /> */}
        <HeroBg active={bgActive} />

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-12 h-12 border-2 border-orange-300 rounded-full top-16 left-6 sm:left-12 floating-element opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
            }}
          />
          <div
            className="absolute w-10 h-10 border-2 border-blue-300 top-1/3 right-8 sm:right-16 floating-element opacity-20"
            style={{
              transform: `rotate(45deg) translate(${mousePosition.x * -8}px, ${mousePosition.y * 8}px)`,
            }}
          />
          <div
            className="absolute w-6 h-6 bg-orange-400 rounded-full opacity-25 bottom-24 left-1/3 floating-element"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -10}px)`,
            }}
          />
        </div>

        {/* Main Content */}
        <div
          className="z-10 w-full mx-auto max-w-7xl pt-28 md:pt-40 parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 3}px)`,
          }}
        >
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="mb-6 text-base font-medium text-center text-white opacity-0 sm:text-lg"
          >
            <span className="px-3 py-2 text-black border rounded-lg border-white/20">
              The <span className="font-semibold text-orange-500">Super60</span> Community
            </span>
          </p>

          <div
            ref={(el) => (textRefs.current[1] = el)}
            className="relative inline-block w-full text-center opacity-0"
          >
            <h1 className="px-4 text-4xl font-extrabold leading-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block shimmer-text">A Community of Coders,</span>
              <span className="block shimmer-text">Creators & </span>
              <span className="block text-orange-500">Achievers.</span>
            </h1>
            <div className="absolute w-6 h-6 bg-orange-600 rounded-full -top-3 -right-3 opacity-80 floating-element" />
            <div className="absolute w-5 h-5 bg-blue-500 rounded-full -bottom-2 -left-2 opacity-60 floating-element" />
          </div>

          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="max-w-xl px-4 mx-auto mt-6 text-sm text-center text-black opacity-0 sm:text-base md:text-lg"
          >
            Unlock your true potential with the{" "}
            <span className="font-semibold text-orange-500">Super60</span> Community — immersive
            learning, real-world projects, and a culture of excellence.
          </p>

          <div ref={(el) => (textRefs.current[3] = el)} className="mt-8 mb-10 text-center opacity-0">
            {/* <button className="px-6 py-3 text-base font-semibold text-white rounded-full sm:px-8 sm:py-4 sm:text-lg glow-button bg-gradient-to-r from-blue-600 to-blue-800">
              <span className="flex items-center justify-center gap-2">
                Join Us
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button> */}
            <JoinUsButtonHero />

          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute mt-24 text-white transform -translate-x-1/2 left-1/2 animate-bounce"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-medium sm:text-sm">Scroll to explore</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none sm:h-32 bg-gradient-to-t from-transparent to-transparent"
          style={{ opacity: scrollProgress }}
        />
      </section>
    </>
  );
};

export default Hero;

