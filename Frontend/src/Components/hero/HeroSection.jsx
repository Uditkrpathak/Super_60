export default function HeroSection({heading1,heading2,subHeading,badge}) {
  return (
    <section className="relative px-6 py-24 mt-20 overflow-hidden text-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

      {/* Top Badge */}
      <div className="relative z-10 inline-flex items-center px-4 py-2 mx-auto bg-white border border-gray-300 rounded-full shadow-lg backdrop-blur-md">
        <span className="mr-3 text-sm font-medium text-gray-600">🔥 Don't Miss</span>
        <span className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white bg-[#002277] rounded-full hover:bg-[#001a5c] transition-all duration-200">
          {badge}
          <span className="text-xs">→</span>
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 max-w-3xl mx-auto mt-10 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl sm:leading-snug">
        {heading1}
        <span className="block mt-3 text-[#C57726]">
          ✦ {heading2} ✦
        </span>
      </h1>

      {/* Optional Subheading */}
      <p className="relative z-10 max-w-xl mx-auto mt-6 text-base text-gray-600 sm:text-lg">
        {subHeading}
      </p>

      {/* Decorative Wavy Line */}
      <div className="relative z-10 mt-10">
        <svg viewBox="0 0 1440 100" className="w-48 mx-auto" fill="none">
          <path
            fill="#C57726"
            d="M0,50 C150,100 300,0 450,50 C600,100 750,0 900,50 C1050,100 1200,0 1350,50 C1500,100 1500,100 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
