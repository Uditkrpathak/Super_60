import { useEffect, useRef } from "react";
import gsap from "gsap";

const JoinUsButtonHero = () => {
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      boxShadow: "0 0 8px rgba(0, 34, 119, 0.5)",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: 6,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(iconRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="px-6 py-3 text-sm font-medium text-white rounded-full"
      style={{
        backgroundColor: "#002277",
        boxShadow: "0 4px 12px rgba(0, 34, 119, 0.3)",
      }}
    >
      <span className="flex items-center justify-center gap-1">
        Join Us
      </span>
    </button>
  );
};

export default JoinUsButtonHero;
