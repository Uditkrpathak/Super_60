import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ButtonWrapper = () => {
  return (
    <div className="flex items-center justify-center px-4 bg-[#002277] ">
      <SpotlightButton />
    </div>
  );
};

const SpotlightButton = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const button = btnRef.current;
    const span = spanRef.current;

    if (!button || !span) return;

    const handleMouseMove = (e) => {
      const { width, left } = button.getBoundingClientRect();
      const offset = e.clientX - left;
      const percent = (offset / width) * 100;

      span.animate({ left: `${percent}%` }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      span.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      ref={btnRef}
      className="relative w-full max-w-xs px-4 py-3 overflow-hidden text-lg font-medium text-white rounded-lg "
    >
      <span className="relative z-10 pointer-events-none mix-blend-difference">
        LogIn
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white transition-all duration-300 ease-in-out"
      />
    </motion.div>
  );
};

export default ButtonWrapper;
