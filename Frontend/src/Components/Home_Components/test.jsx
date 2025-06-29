import { useRef, useEffect } from "react";
import MaskUrl from "./svg/super60_heading.svg"; // Adjust the path as necessary
const MaskedDiv = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      circleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-[1354px] h-[375px] overflow-hidden bg-[rgba(55,53,65,0.08)]"
        style={{
        WebkitMaskImage: `url(${MaskUrl})`,
        maskImage: `url(${MaskUrl})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "cover",
        maskSize: "cover",
        }}
         ref={containerRef}
    >
      <div
        ref={circleRef}
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none transition-transform duration-200"
        style={{
          background: "radial-gradient(circle at center, #ffce55, #ff6848, transparent 80%)"
        }}
      />
    </div>
  );
};

// testing
export default MaskedDiv;
