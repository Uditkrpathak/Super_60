import { useState, useEffect, useRef } from "react";
import HeroBg from "./backgrounds/herobg";
import JoinUsButtonHero from "./JoinUsButtonHero";

const Hero = () => {
  const [bgActive, setBgActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
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
      `}</style>

      <section
        ref={heroRef}
        className="relative w-full min-h-screen px-4 mx-auto overflow-hidden max-w-screen-2xl sm:px-6 lg:px-12"
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
        <HeroBg active={bgActive} />

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-10 h-10 border-2 border-orange-300 rounded-full top-12 left-4 sm:left-10 floating-element opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
            }}
          />
          <div
            className="absolute w-8 h-8 border-2 border-blue-300 top-1/3 right-4 sm:right-12 floating-element opacity-20"
            style={{
              transform: `rotate(45deg) translate(${mousePosition.x * -8}px, ${mousePosition.y * 8}px)`,
            }}
          />
          <div
            className="absolute w-5 h-5 bg-orange-400 rounded-full opacity-25 bottom-20 left-1/3 floating-element"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -10}px)`,
            }}
          />
        </div>

        {/* Main Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center pt-28 sm:pt-36 md:pt-44 lg:pt-52"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 3}px)`,
          }}
        >
          <p
            ref={(el) => (textRefs.current[0] = el)}
            className="mb-6 text-sm font-medium text-white opacity-0 sm:text-base md:text-lg"
          >
            <span className="px-3 py-1.5 text-black border border-white/20 rounded-lg">
              The <span className="font-semibold text-orange-500">Super60</span> Community
            </span>
          </p>

          <h1
            ref={(el) => (textRefs.current[1] = el)}
            className="px-4 font-extrabold leading-tight tracking-tight text-black opacity-0"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
              lineHeight: "1.1",
            }}
          >
            <span className="block shimmer-text">A Community of Coders,</span>
            <span className="block shimmer-text">Creators &</span>
            <span className="block text-orange-500">Achievers.</span>
          </h1>

          <p
            ref={(el) => (textRefs.current[2] = el)}
            className="max-w-2xl px-4 mt-6 text-sm text-black opacity-0 sm:text-base md:text-lg"
          >
            Unlock your true potential with the{" "}
            <span className="font-semibold text-orange-500">Super60</span> Community — immersive
            learning, real-world projects, and a culture of excellence.
          </p>

          <div ref={(el) => (textRefs.current[3] = el)} className="mt-8 opacity-0">
            <JoinUsButtonHero />
          </div>

          {/* Scroll Indicator */}
          <div
            className="mt-20 text-white animate-bounce"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs sm:text-sm">Scroll to explore</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Fade Shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none sm:h-28 bg-gradient-to-t from-white to-transparent"
          style={{ opacity: scrollProgress }}
        />
      </section>
    </>
  );
};

export default Hero;
