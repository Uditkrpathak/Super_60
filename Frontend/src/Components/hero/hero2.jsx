import { useState, useEffect, useRef } from "react";
import HeroBg from "./backgrounds/herobg";
import AnimatedBack from "./backgrounds/animated_bg";

const Hero = () => {
  const [bgActive, setBgActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Fade effect based on scroll
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const fadeThreshold = heroHeight * 0.3;
      setIsVisible(currentScrollY < fadeThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for text animations
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
        }

        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
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
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .parallax-layer {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
        onMouseEnter={() => setBgActive(true)}
        onMouseLeave={() => setBgActive(false)}
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          filter: `blur(${blurAmount}px)`,
          transition: 'all 0.3s ease-out'
        }}
      >
        {/* Animated Background Layer */}
        <AnimatedBack scrollY={scrollY} bgActive={bgActive} />
        
        {/* Crosshair Background Animation */}
        <HeroBg active={bgActive} />

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-16 h-16 border-2 border-orange-300 rounded-full floating-element opacity-30"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`
            }}
          />
          <div 
            className="absolute top-1/3 right-20 w-12 h-12 border-2 border-blue-300 floating-element opacity-20"
            style={{
              transform: `rotate(45deg) translate(${mousePosition.x * -8}px, ${mousePosition.y * 8}px)`
            }}
          />
          <div 
            className="absolute bottom-32 left-1/4 w-8 h-8 bg-orange-400 rounded-full floating-element opacity-25"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -10}px)`
            }}
          />
        </div>

        <div className="max-w-6xl w-full z-10 pt-32 parallax-layer"
             style={{
               transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 3}px)`
             }}>
          
          {/* Section Tagline */}
          <p 
            ref={el => textRefs.current[0] = el}
            className="text-lg text-gray-500 mb-6 font-large opacity-0"
          >
            <span className="bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
              The 
            </span>
            <span className="text-orange-600 font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg px-3 py-2 ml-2 shadow-lg">
              Super60
            </span>{" "}
            <span className="bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 ml-2 border border-white/20 shadow-lg">
              Community
            </span>
          </p>

          {/* Hero Headline */}
          <div 
            ref={el => textRefs.current[1] = el}
            className="relative inline-block opacity-0"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4 break-words border border-white/30 shadow-2xl">
              <span className="shimmer-text">A Community of Coders,</span>
              <br />
              <span className="text-gray-800">Creators & </span>
              <span className="text-orange-600">Achievers.</span>
            </h1>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-80 floating-element" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60 floating-element" />
          </div>

          {/* Subheadline */}
          <p 
            ref={el => textRefs.current[2] = el}
            className="mt-8 text-gray-700 text-lg max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30 shadow-xl opacity-0"
          >
            Unlock your true potential with the{" "}
            <span className="text-orange-600 font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Super60
            </span>{" "}
            Community — immersive learning, real-world projects, and a culture of excellence.
          </p>

          {/* CTA Button */}
          <div 
            ref={el => textRefs.current[3] = el}
            className="mt-12 opacity-0"
          >
            <button className="glow-button px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-900 backdrop-blur-sm border border-blue-300/30 shadow-2xl">
              <span className="flex items-center gap-2">
                Join Us
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute mt-32 left-1/2  text-gray-400 animate-bounce"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Gradient Overlay for smooth transition */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"
          style={{ opacity: scrollProgress }}
        />
      </section>
    </>
  );
};

export default Hero;