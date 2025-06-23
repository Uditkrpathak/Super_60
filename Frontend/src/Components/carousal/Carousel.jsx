import React, { useState } from 'react';

const Carousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cards = [
    {
      id: 1,
      title: "DESIGN CLUB",
      subtitle: "Creative Design Solutions",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "JOYEUX REPAS",
      subtitle: "Culinary Excellence",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "STUDIO FUGU",
      subtitle: "Digital Innovation",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      color: "from-gray-800 to-gray-900"
    },
    {
      id: 4,
      title: "WEBDESIGN + WEBFLOW",
      subtitle: "Modern Web Solutions",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 5,
      title: "AKROLAB",
      subtitle: "Research & Development",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      color: "from-teal-600 to-green-600"
    },
    {
      id: 6,
      title: "FACTOR E",
      subtitle: "Environmental Impact",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 7,
      title: "DROP",
      subtitle: "Brand Identity",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      color: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <div className="w-full bg-black py-20 overflow-visible relative">
      <div className="max-w-7xl mx-auto px-8">
        {/* Base line */}
        <div className="relative">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"></div>
          
          {/* Cards container */}
          <div className="flex items-end justify-center gap-4 pb-2 relative" style={{ height: '288px' }}>
            {cards.map((card, index) => {
              const isHovered = hoveredIndex === index;
              const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
              const isFarAway = hoveredIndex !== null && Math.abs(hoveredIndex - index) > 1;
              
              return (
                <div
                  key={card.id}
                  className={`
                    absolute bottom-0 transition-all duration-500 ease-out cursor-pointer
                    ${isHovered 
                      ? 'w-80 h-96 -translate-y-20 z-50 rotate-1' 
                      : isNeighbor 
                        ? 'w-48 h-64 -translate-y-4 z-20 scale-95' 
                        : isFarAway
                          ? 'w-32 h-48 -translate-y-1 scale-90 opacity-70 z-10'
                          : 'w-56 h-72 z-15'
                    }
                    ${isHovered ? 'shadow-2xl shadow-purple-500/30' : 'shadow-lg shadow-black/20'}
                  `}
                  style={{
                    left: `${index * 14 + 8}%`,
                    transformOrigin: 'bottom center'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div className={`
                    w-full h-full rounded-xl overflow-hidden relative
                    bg-gradient-to-br ${card.color}
                    transform transition-all duration-500
                    ${isHovered ? 'scale-105 shadow-2xl' : ''}
                    border border-white/10
                  `}>
                    {/* Background image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30"
                      style={{ backgroundImage: `url(${card.image})` }}
                    ></div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* 3D depth effect */}
                    {isHovered && (
                      <div className="absolute -inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl -z-10 blur-sm"></div>
                    )}
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <div className="text-white">
                        <h3 className={`
                          font-bold tracking-wider mb-2 transition-all duration-300
                          ${isHovered ? 'text-2xl drop-shadow-lg' : 'text-lg'}
                        `}>
                          {card.title}
                        </h3>
                        <p className={`
                          text-gray-300 transition-all duration-300
                          ${isHovered ? 'text-base opacity-100' : 'text-sm opacity-80'}
                        `}>
                          {card.subtitle}
                        </p>
                        
                        {/* Hover indicator */}
                        {isHovered && (
                          <div className="mt-4 flex items-center text-sm text-white/80 animate-fadeIn">
                            <span>View Project</span>
                            <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Glow effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Connection to base */}
                  <div className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2
                    w-3 h-3 bg-gradient-to-br ${card.color} rounded-full
                    transition-all duration-500
                    ${isHovered ? 'scale-150 shadow-lg' : 'scale-100'}
                  `}></div>
                </div>
              );
            })}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Section title */}
        {/* <div className="text-center mt-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio of creative solutions and innovative designs that push the boundaries of digital excellence.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Carousel;