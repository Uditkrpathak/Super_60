import React from "react";

const SectionHeader = ({
  section = "Section",
  title = "This is the title",
  subtitle = "This is the subtitle",
  color = "#002277",
}) => {
  return (
    <section className="relative px-4 py-12 bg-white md:px-12">
      {/* Optional grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='" +
            encodeURIComponent(color) +
            "' stroke-width='1'%3E%3Cpath d='M 50 0 L 50 100%25 M 100 0 L 100 100%25 M 150 0 L 150 100%25 M 200 0 L 200 100%25'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Content Box */}
      <div className="relative z-10 px-6 mx-auto text-center max-w-7xl">
       <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              <span className="text-sm font-semibold tracking-wider text-orange-600 uppercase">
                {section}
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            </div>
        <h1 className="text-xl font-bold text-black md:text-2xl">{title}</h1>
        <h2 className="mt-2 text-2xl font-extrabold md:text-4xl" style={{ color }}>
          {subtitle}
        </h2>
      </div>
    </section>
  );
};

export default SectionHeader;
