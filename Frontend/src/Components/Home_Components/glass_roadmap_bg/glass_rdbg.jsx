import React from "react";

const glass_rdbg = ({ progress = 0 }) => {
  // progress: 0 (not visible) to 1 (fully visible)
  // Animate ovals: more vertical (ry), less horizontal (rx), more wavy (baseFrequency)
  const minRx = 180, maxRx = 450;
  const minRy = 350, maxRy = 300;
  const minFreq = 0.008, maxFreq = 0.003;

  // Interpolate values based on progress (slower than scroll: progress * 0.5)
  const t = Math.min(progress * 0.5, 1);
  const rx = maxRx - (maxRx - minRx) * t;
  const ry = maxRy + (minRy - maxRy) * t;
  const baseFrequency = maxFreq + (minFreq - maxFreq) * t;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="wavy">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${baseFrequency} ${baseFrequency * 2.5}`}
              numOctaves="2"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g filter="url(#wavy)" stroke="white" strokeOpacity="0.08" fill="none">
          <ellipse cx="500" cy="500" rx={rx} ry={ry} strokeWidth="1.5" />
          <ellipse cx="500" cy="500" rx={rx - 50} ry={ry - 40} strokeWidth="1.5" />
          <ellipse cx="500" cy="500" rx={rx - 100} ry={ry - 80} strokeWidth="1.5" />
          <ellipse cx="500" cy="500" rx={rx - 150} ry={ry - 120} strokeWidth="1.5" />
          <ellipse cx="500" cy="500" rx={rx - 200} ry={ry - 160} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

export default glass_rdbg;
