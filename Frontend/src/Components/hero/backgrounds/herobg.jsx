import { useEffect, useRef, useState } from "react";

const HeroBg = () => {
  const [coords, setCoords] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;
    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      setCoords((prev) => {
        const speed = 0.08;
        const newX = lerp(prev.x, mouse.current.x, speed);
        const newY = lerp(prev.y, mouse.current.y, speed);
        return { x: newX, y: newY };
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Line 1 - 45° */}
      <div
        className="absolute w-[300vw] h-[2px] bg-gray-400 origin-center"
        style={{
          top: coords.y,
          left: coords.x,
          transform: `translate(-50%, -50%) rotate(45deg)`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2"
          style={{
            transform: 'translate(50%, -50%) rotate(0deg)', // Match the line’s rotation!
          }}
        >
          <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
            Empowering the Top 60 Minds
          </p>
        </div>
      </div>

      {/* Line 2 - -45° */}
      <div
        className="absolute w-[300vw] h-[2px] bg-gray-400 origin-center"
        style={{
          top: coords.y,
          left: coords.x,
          transform: `translate(-50%, -50%) rotate(-45deg)`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2"
          style={{
            transform: 'translate(50%, -50%) rotate(0deg)', // Match the line’s rotation!
          }}
        >
          <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
            Innovating with Purpose
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBg;
