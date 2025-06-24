import { useEffect, useRef, useState } from "react";

const HeroBg = ({ active }) => {
  const [coords1, setCoords1] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const [coords2, setCoords2] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  
  const mouse = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  
  const defaultResting = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 1.4 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 1.8 : 0,
  });
  
  const time = useRef(0);
  const animationFrameRef = useRef(null);

  // Update default resting position on window resize
  useEffect(() => {
    const handleResize = () => {
      defaultResting.current = {
        x: window.innerWidth / 1.4,
        y: window.innerHeight / 1.8,
      };
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      time.current += 0.02;
      const driftX = Math.sin(time.current) * 10;
      const driftY = Math.cos(time.current) * 10;

      // Determine target position based on active state
      const targetX = active ? mouse.current.x : defaultResting.current.x;
      const targetY = active ? mouse.current.y : defaultResting.current.y;

      // Line 1 (faster)
      setCoords1((prev) => {
        const speed = active ? 0.08 : 0.05; // Slightly slower when returning to default
        return {
          x: lerp(prev.x, targetX + driftX, speed),
          y: lerp(prev.y, targetY + driftY, speed),
        };
      });

      // Line 2 (slower)
      setCoords2((prev) => {
        const speed = active ? 0.04 : 0.03; // Slightly slower when returning to default
        return {
          x: lerp(prev.x, targetX + driftX, speed),
          y: lerp(prev.y, targetY + driftY, speed),
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (active) {
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add mouse move listener only when active
    if (active) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Line 1 - 45° (faster) */}
      <div
        className="absolute w-[300vw] h-[2px] bg-gray-400 origin-center transition-opacity duration-500"
        style={{
          top: coords1.y,
          left: coords1.x,
          transform: `translate(-50%, -50%) rotate(45deg)`,
          opacity: active ? 1 : 0.3,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 bg-white px-2 rounded-sm"
          style={{
            transform: "translate(50%, -50%) rotate(0deg)",
          }}
        >
          <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
            Empowering the <span className="text-orange-500">Top 60 Minds</span>
          </p>
        </div>
      </div>
      
      {/* Line 2 - -45° (slower) */}
      <div
        className="absolute w-[300vw] h-[2px] bg-gray-400 origin-center transition-opacity duration-500"
        style={{
          top: coords2.y,
          left: coords2.x,
          transform: `translate(-50%, -50%) rotate(-45deg)`,
          opacity: active ? 1 : 0.3,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 bg-white px-2 rounded-sm"
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