import { useState, useEffect, useRef } from "react";

const Achievement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    revenue: 0,
    partners: 0,
    projects: 0,
    events: 0
  });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const achievements = [
    {
      id: 'revenue',
      value: 400000,
      prefix: '₹',
      suffix: '+',
      label: 'Revenue Generated',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'partners',
      value: 50,
      prefix: '',
      suffix: '+',
      label: 'Tech Partners',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'projects',
      value: 100,
      prefix: '',
      suffix: '+',
      label: 'Projects Delivered',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'events',
      value: 30,
      prefix: '',
      suffix: '+',
      label: 'Community Events',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Intersection observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          startCounterAnimation();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation function
  const startCounterAnimation = () => {
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;

    achievements.forEach((achievement) => {
      let currentFrame = 0;
      const increment = achievement.value / totalFrames;

      const animate = () => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(achievement.value * easeOutQuart);

        setCounters(prev => ({
          ...prev,
          [achievement.id]: currentValue
        }));

        if (currentFrame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          setCounters(prev => ({
            ...prev,
            [achievement.id]: achievement.value
          }));
        }
      };

      // Stagger the animations
      setTimeout(animate, achievements.indexOf(achievement) * 200);
    });
  };

  const formatNumber = (num) => {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes drawLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .achievement-card {
          animation: slideInFromBottom 0.8s ease-out both;
        }

        .achievement-card:nth-child(1) { animation-delay: 0.1s; }
        .achievement-card:nth-child(2) { animation-delay: 0.2s; }
        .achievement-card:nth-child(3) { animation-delay: 0.3s; }
        .achievement-card:nth-child(4) { animation-delay: 0.4s; }

        .section-header {
          animation: fadeInScale 1s ease-out both;
        }

        .decorative-line {
          animation: drawLine 1.5s ease-out 0.5s both;
        }

        .metric-grid {
          background: 
            linear-gradient(135deg, rgba(249, 115, 22, 0.02) 0%, rgba(59, 130, 246, 0.02) 100%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(249, 115, 22, 0.01) 50px,
              rgba(249, 115, 22, 0.01) 52px
            );
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .icon-glow {
          filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.3));
        }

        .number-animation {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="relative py-24 bg-gradient-to-br overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="metric-grid w-full h-full" />
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 border border-orange-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-blue-200 rotate-45 opacity-15 animate-bounce" />
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-30 animate-ping" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-20 ${isVisible ? 'section-header' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-16" />
              <span className="text-sm font-semibold text-orange-600 tracking-wider uppercase">
                Our Achievements
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-16" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Making an <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Impact</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our commitment to excellence drives measurable results. Here's how we're 
              transforming the landscape of technology and innovation.
            </p>

            {/* Decorative Line */}
            <div className="mt-8 flex justify-center">
              <div className="decorative-line h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full opacity-0" />
            </div>
          </div>

          {/* Achievement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`achievement-card glass-effect rounded-2xl p-8 text-center hover-lift group ${!isVisible ? 'opacity-0' : ''}`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} text-white mb-6 icon-glow group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>

                {/* Number */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 number-animation">
                    {achievement.prefix}
                    {achievement.id === 'revenue' 
                      ? formatNumber(counters[achievement.id]) 
                      : counters[achievement.id]
                    }
                    {achievement.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium text-lg">
                  {achievement.label}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${achievement.color} transition-all duration-2000 ease-out`}
                    style={{
                      width: isVisible ? '100%' : '0%',
                      transitionDelay: `${index * 200 + 600}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Accent */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 text-gray-500">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-20" />
              <span className="text-sm font-medium">Driving Innovation Forward</span>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-20" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Achievement;