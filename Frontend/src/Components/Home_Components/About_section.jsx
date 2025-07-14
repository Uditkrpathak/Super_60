import { useState, useRef, useEffect } from "react";
// import MaskUrl from "./leadership_heading.svg"
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

  // const containerRef = useRef(null);
  // const circleRef = useRef(null);

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const rect = containerRef.current.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;
  //     circleRef.current.style.transform = `translate(${x}px, ${y}px)`;
  //   };

  //   const container = containerRef.current;
  //   container.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     container.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative items-center min-h-screen px-8 overflow-hidden py-36"
    >
      {/* Large S60 Background Text */}
      {/* <div className="absolute transform -translate-y-1/2 pointer-events-none select-none top-1/2 right-1/4 translate-x-1/3">
        <div 
          className="text-orange-200/30 font-black text-[40rem] leading-none tracking-tighter"
          style={{ 
            fontFamily: 'Arial Black, sans-serif',
            textShadow: '0 0 100px rgba(251, 146, 60, 0.1)'
          }}
        >
          S60
        </div>
      </div> */}

      {/* Floating Cursor Follower */}
      <div 
        className="absolute z-20 transition-opacity duration-300 pointer-events-none"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          opacity: hoveredCard ? 1 : 0
        }}
      >
        <div className="w-5 h-5 bg-orange-500 rounded-full shadow-lg animate-pulse shadow-orange-500/50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block">
            <p 
              className="mb-3 text-base font-medium tracking-wide text-gray-500 transition-all duration-300 cursor-default hover:text-orange-500 hover:scale-105"
            >
              What is Super60
            </p>
          </div>
          
          <div className="relative px-32" ref={titleRef}>
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

                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-400/20 animate-pulse"></div>

                <div className="absolute delay-150 rounded-full inset-4 bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 animate-pulse"></div>

                <div className="absolute delay-300 rounded-full inset-8 bg-gradient-to-r from-orange-600/40 via-pink-600/40 to-purple-600/40 animate-pulse"></div>
              </div>
            </div> */}


            
            {/* About heading */}
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-center text-gray-900 sm:text-4xl md:text-5xl">
              The{" "}
              <span
                className="relative inline-block text-orange-500 transition-transform duration-300 cursor-default hover:scale-105"
                onMouseEnter={() => setHoveredCard("title")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                Super60
                <div className="absolute left-0 w-full h-1 transition-transform duration-300 scale-x-0 -bottom-1 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:scale-x-100"></div>
              </span>{" "}
              Community
              <br />
              <span className="block mt-2 text-lg font-medium text-orange-500 sm:text-xl md:text-2xl">
                Where Ambition Meets Action.
              </span>
            </h2>

             {/* <div className="relative w-[864px] h-[375px]  overflow-hidden bg-[rgba(55,53,65,0.08)]"
                    style={{
                    WebkitMaskImage: `url(${MaskUrl})`,
                    maskImage: `url(${MaskUrl})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "cover",
                    maskSize: "cover",
                    }}
                     ref={containerRef}
                >
                  <div
                    ref={circleRef}
                    className="absolute w-[200px] h-[200px] rounded-full pointer-events-none transition-transform duration-200"
                    style={{
                      background: "radial-gradient(circle at center, #ffce55, #ff6848, transparent 80%)"
                    }}
                  />
                </div> */}



          </div>

          <div className="max-w-3xl mx-auto">
            <p 
              className="text-lg leading-relaxed text-gray-600 transition-all duration-300 cursor-default hover:text-gray-800"
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
            className="mb-8 text-2xl font-bold text-center text-gray-900 transition-all duration-300 cursor-default hover:text-orange-600"
            onMouseEnter={() => setHoveredCard('focus-title')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            Our Main Focus
          </h3>

          {/* Focus Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
                  <div className="absolute w-3 h-3 bg-orange-400 rounded-full -top-1 -right-1 animate-bounce opacity-80" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute w-32 h-32 rounded-full top-20 left-10 bg-orange-200/20 blur-xl animate-pulse" />
      <div className="absolute w-48 h-48 delay-1000 rounded-full bottom-20 left-20 bg-blue-200/20 blur-2xl animate-pulse" />
      <div className="absolute w-24 h-24 delay-500 rounded-full top-40 right-20 bg-green-200/20 blur-xl animate-pulse" />
    </section>
  );
};

export default AboutSection;


