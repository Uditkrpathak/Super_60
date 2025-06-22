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

  const defaultResting = {
    x: window.innerWidth / 1.4, // 👈 your custom fallback position
    y: window.innerHeight / 1.8, // 👈 your custom fallback position
  };

  const time = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = defaultResting; // Move back to default when cursor leaves
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    let animationFrame;
    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      time.current += 0.02;
      const driftX = Math.sin(time.current) * 10;
      const driftY = Math.cos(time.current) * 10;

      setCoords((prev) => {
        const speed = 0.08;
        const newX = lerp(prev.x, mouse.current.x + driftX, speed);
        const newY = lerp(prev.y, mouse.current.y + driftY, speed);
        return { x: newX, y: newY };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
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
          className="absolute left-1/2 top-1/2 bg-white px-2"
          style={{
            transform: "translate(50%, -50%) rotate(0deg)",
          }}
        >
          <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
            Empowering the <span className="text-orange-500">Top 60 Minds</span>
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
          className="absolute left-1/2 top-1/2 bg-white px-2"
          style={{
            transform: "translate(50%, -50%) rotate(0deg)",
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
