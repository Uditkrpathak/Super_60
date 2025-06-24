import { useState, useRef, useEffect } from "react";

const AboutSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const focusAreas = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: "Academic Excellence",
      description: "Guiding students to achieve top ranks through structured learning, mock tests, and expert mentorship."
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99l-2.98 3.67a.5.5 0 0 0 .39.84H14v6h6zm-11.5 0v-4.5h2.5V22h3v-6.5c0-.83-.67-1.5-1.5-1.5H9.5l-1.68-3.37A1.5 1.5 0 0 0 6.48 10H3.5c-.83 0-1.5.67-1.5 1.5V22h4z" />
        </svg>
      ),
      title: "Peer Learning",
      description: "Fostering a culture of teamwork and knowledge sharing to help everyone grow together."
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      title: "Goal-Oriented Training",
      description: "Custom strategies and focused sessions that align with each student's individual academic goals."
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Holistic Development",
      description: "Beyond academics — enhancing soft skills, confidence, and problem-solving for all-round growth."
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }

      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setOrbPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-8 overflow-hidden"
    >
      {/* Large S60 Background Text */}
      <div className="absolute top-1/2 right-1/4 transform translate-x-1/3 -translate-y-1/2 pointer-events-none select-none">
        <div 
          className="text-orange-200/30 font-black text-[40rem] leading-none tracking-tighter"
          style={{ 
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '0 0 100px rgba(251, 146, 60, 0.1)'
          }}
        >
          S60
        </div>
      </div>

      {/* Floating Cursor Follower */}
      <div 
        className="absolute pointer-events-none z-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          opacity: hoveredCard ? 1 : 0
        }}
      >
        <div className="w-5 h-5 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <p 
              className="text-gray-500 text-base mb-3 font-medium tracking-wide transition-all duration-300 hover:text-orange-500 hover:scale-105 cursor-default"
            >
              About Our Batch
            </p>
          </div>
          
          <div className="relative" ref={titleRef}>
            {/* Hover Orb Effect */}
            {/* <div 
              className={`absolute pointer-events-none transition-opacity duration-500 ${
                hoveredCard === 'title' ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: orbPosition.x - 100,
                top: orbPosition.y - 100,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative w-48 h-48">

                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20 rounded-full animate-pulse"></div>

                <div className="absolute inset-4 bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 rounded-full animate-pulse delay-150"></div>

                <div className="absolute inset-8 bg-gradient-to-r from-orange-600/40 via-pink-600/40 to-purple-600/40 rounded-full animate-pulse delay-300"></div>
              </div>
            </div> */}

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
              The{" "}
              <span 
                className="text-orange-500 relative inline-block transition-all duration-300 hover:scale-110 cursor-default"
                onMouseEnter={() => setHoveredCard('title')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                Super60
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </span>{" "}
              Batch –
              <br />
              <span className="relative">
                Learn Boldly,{" "}
                <span 
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-300 cursor-default"
                  onMouseEnter={() => setHoveredCard('compete')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  Compete
                </span>
                <br />
                Bravely,{" "}
                <span 
                  className="text-green-600 hover:text-green-700 transition-colors duration-300 cursor-default"
                  onMouseEnter={() => setHoveredCard('achieve')}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  Achieve
                </span>{" "}
                Exceptionally.
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <p 
              className="text-gray-600 text-lg leading-relaxed transition-all duration-300 hover:text-gray-800 cursor-default"
              onMouseEnter={() => setHoveredCard('description')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              The Super 60 Batch is a focused learning community built for driven and dedicated 
              minds. We empower selected students through expert mentorship, peer collaboration, 
              and goal-oriented sessions.
            </p>
          </div>
        </div>

        {/* Main Focus Section */}
        <div className="mb-8">
          <h3 
            className="text-2xl font-bold text-gray-900 text-center mb-8 transition-all duration-300 hover:text-orange-600 cursor-default"
            onMouseEnter={() => setHoveredCard('focus-title')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            Our Main Focus
          </h3>

          {/* Focus Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {focusAreas.map((area, index) => (
              <div
                key={area.id}
                className={`
                  relative group p-4 rounded-xl transition-all duration-500 cursor-pointer
                  ${hoveredCard === area.id 
                    ? 'bg-white shadow-xl shadow-orange-500/15 scale-105 -translate-y-1' 
                    : 'bg-white/70 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50'
                  }
                  border border-gray-100 hover:border-orange-200
                `}
                onMouseEnter={() => setHoveredCard(area.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transformOrigin: 'center',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`
                  absolute inset-0 rounded-xl transition-opacity duration-500
                  bg-gradient-to-br from-orange-50 to-blue-50
                  ${hoveredCard === area.id ? 'opacity-50' : 'opacity-0'}
                `} />

                {/* Icon */}
                <div className={`
                  inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 relative z-10
                  transition-all duration-500
                  ${hoveredCard === area.id 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-110 rotate-12' 
                    : 'bg-blue-900 text-white group-hover:bg-orange-500'
                  }
                `}>
                  {area.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h4 className={`
                    text-lg font-bold mb-2 transition-all duration-300
                    ${hoveredCard === area.id 
                      ? 'text-orange-600 transform -translate-y-1' 
                      : 'text-gray-900 group-hover:text-blue-900'
                    }
                  `}>
                    {area.title}
                  </h4>
                  
                  <p className={`
                    text-gray-600 text-sm leading-relaxed transition-all duration-300
                    ${hoveredCard === area.id 
                      ? 'text-gray-700 transform -translate-y-1' 
                      : 'group-hover:text-gray-700'
                    }
                  `}>
                    {area.description}
                  </p>
                </div>

                {/* Hover Effect Lines */}
                <div className={`
                  absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-xl
                  transform origin-left transition-transform duration-500
                  ${hoveredCard === area.id ? 'scale-x-100' : 'scale-x-0'}
                `} />
                
                <div className={`
                  absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-r-xl
                  transform origin-bottom transition-transform duration-500 delay-100
                  ${hoveredCard === area.id ? 'scale-y-100' : 'scale-y-0'}
                `} />

                {/* Floating Elements */}
                {hoveredCard === area.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-80" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-green-200/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};

export default AboutSection;