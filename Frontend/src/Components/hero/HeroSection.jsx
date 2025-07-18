// export default function HeroSection({heading1,heading2,subHeading,badge,svg}) {
//   return (
//     <section className="relative px-6 py-24 mt-20 overflow-hidden text-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       {/* Dotted Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>

//       {/* Top Badge */}
//       <div className="relative z-10 inline-flex items-center px-4 py-2 mx-auto bg-white border border-gray-300 rounded-full shadow-lg backdrop-blur-md">
//         <span className="mr-3 text-sm font-medium text-gray-600">🔥 Don't Miss</span>
//         <span className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white bg-[#002277] rounded-full hover:bg-[#001a5c] transition-all duration-200">
//           {badge}
//           <span className="text-xs">→</span>
//         </span>
//       </div>

//       {/* Heading */}
//       <h1 className="relative z-10 max-w-3xl mx-auto mt-10 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl sm:leading-snug">
//         {heading1}
//         <span className="block mt-3 text-[#C57726]">
//           ✦ {heading2} ✦
//         </span>
//       </h1>

//       {/* Optional Subheading */}
//       <p className="relative z-10 max-w-xl mx-auto mt-6 text-base text-gray-600 sm:text-lg">
//         {subHeading}
//       </p>

//       {/* Decorative Wavy Line */}
//       <div className="relative z-10 mt-10">
//         <img src={svg} alt="" />
//       </div>
//     </section>
//   );
// }

import React from 'react';

export default function HeroSection({heading1, heading2, subHeading, badge, svg}) {
  return (
    <section className="relative px-6 py-24 mt-20 overflow-hidden text-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Background Components */}
      
      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Circle */}
        <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-gradient-to-br from-blue-100 to-blue-200 blur-xl opacity-40 animate-pulse"></div>
        
        {/* Top Right Triangle */}
        <div className="absolute top-20 right-16 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px] border-l-transparent border-r-transparent border-b-orange-200 opacity-30 animate-bounce"></div>
        
        {/* Bottom Left Hexagon */}
        <div className="absolute w-24 h-24 rotate-45 rounded-lg bottom-20 left-20 bg-gradient-to-r from-orange-100 to-orange-200 opacity-40 animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Bottom Right Circle */}
        <div className="absolute w-40 h-40 rounded-full bottom-32 right-32 bg-gradient-to-tr from-blue-100 to-purple-100 blur-2xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Center Background Orb */}
        {/* <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-orange-50 blur-3xl opacity-20 animate-pulse" style={{animationDuration: '8s'}}></div> */}
      </div>
      
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-10"></div>
      
      {/* Floating SVG Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Star */}
        <svg className="absolute w-8 h-8 text-blue-300 top-1/4 left-1/4 opacity-30 animate-spin" style={{animationDuration: '15s'}} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        
        {/* Floating Diamond */}
        <svg className="absolute w-6 h-6 text-orange-300 top-1/3 right-1/3 opacity-40 animate-bounce" style={{animationDelay: '1s'}} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l4 7h6l-8 8-8-8h6l4-7z"/>
        </svg>
        
        {/* Floating Circle */}
        <svg className="absolute w-4 h-4 text-purple-300 bottom-1/4 left-1/3 opacity-30 animate-pulse" style={{animationDelay: '3s'}} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        
        {/* Floating Plus */}
        <svg className="absolute w-5 h-5 text-blue-400 opacity-25 bottom-1/3 right-1/4 animate-spin" style={{animationDuration: '12s', animationDelay: '2s'}} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/30 via-transparent to-white/30"></div>
      
      {/* Radial Gradient Spotlight */}
      <div className="absolute top-0 w-full h-full transform -translate-x-1/2 pointer-events-none left-1/2 bg-radial-gradient from-white/20 via-transparent to-transparent opacity-60"></div>
      
      {/* Top Badge */}
      <div className="relative z-10 inline-flex items-center px-4 py-2 mx-auto transition-all duration-300 border border-gray-300 rounded-full shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl">
        <span className="mr-3 text-sm font-medium text-gray-600">🔥 Don't Miss</span>
        <span className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-white bg-[#002277] rounded-full hover:bg-[#001a5c] transition-all duration-200 hover:scale-105">
          {badge}
          <span className="text-xs transition-transform duration-200 hover:translate-x-1">→</span>
        </span>
      </div>
      
      {/* Heading */}
      <h1 className="relative z-10 max-w-3xl mx-auto mt-10 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl sm:leading-snug">
        <span className="relative">
          {heading1}
          {/* Text Decoration */}
          <div className="absolute rounded-lg -inset-1 blur-sm -z-10"></div>
        </span>
        <span className="block mt-3 text-[#C57726] relative">
          <span className="inline-block animate-pulse">✦</span> {heading2} <span className="inline-block animate-pulse" style={{animationDelay: '1s'}}>✦</span>
          {/* Underline Decoration */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#C57726] to-transparent rounded-full"></div>
        </span>
      </h1>
      
      {/* Optional Subheading */}
      <p className="relative z-10 max-w-xl mx-auto mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
        {subHeading}
      </p>
      
      {/* Decorative Wavy Line */}
      <div className="relative z-10 mt-10">
        <div className="relative inline-block">
          <img src={svg} alt="" className="relative z-10" />
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300/20 via-orange-300/20 to-blue-300/20 blur-xl -z-10"></div>
        </div>
      </div>
      
      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-white via-white/50 to-transparent"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-orange-400 opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}
