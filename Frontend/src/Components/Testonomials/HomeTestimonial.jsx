import { useState, useEffect, useRef } from "react";

const HomeTestimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=150&h=150&fit=crop&crop=face",
      quote: "Super60 transformed my career trajectory. The community's focus on real-world projects and mentorship helped me land my dream role at Meta. The professional network I built here is invaluable.",
      rating: 5,
      project: "AI-Powered Analytics Dashboard"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Google",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The caliber of professionals in Super60 is exceptional. Working alongside industry leaders on challenging projects accelerated my growth exponentially. It's not just a community—it's a career catalyst.",
      rating: 5,
      project: "Enterprise SaaS Platform"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Lead Designer",
      company: "Adobe",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Super60's emphasis on excellence and innovation pushed me beyond my comfort zone. The collaborative environment and high standards helped me secure my leadership position at Adobe.",
      rating: 5,
      project: "Design System Architecture"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Technical Lead",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The technical depth and professional standards at Super60 are unmatched. Every project is a masterclass in engineering excellence. This community shapes industry leaders.",
      rating: 5,
      project: "Cloud Infrastructure Platform"
    },
    {
      id: 5,
      name: "Elena Volkov",
      role: "Data Scientist",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      quote: "Super60's data-driven approach and cutting-edge projects gave me the expertise to contribute to Tesla's autonomous driving technology. The community's impact on my career is immeasurable.",
      rating: 5,
      project: "Machine Learning Pipeline"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, testimonials.length]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // More sensitive visibility detection for smooth transitions
        const isInView = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2;
        setIsVisible(isInView);
      }
    };

    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', smoothScroll);
  }, []);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('[data-animate]');
      elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 200}ms`;
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-8 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.04) 0%, transparent 50%),
          linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)
        `
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(180deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div 
            data-animate
            className="opacity-0 translate-y-8 transition-all duration-1000"
          >
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-50 to-orange-50 text-gray-700 rounded-full text-sm font-semibold tracking-wide border border-gray-200/50 shadow-sm mb-6">
              SUCCESS STORIES
            </span>
          </div>
          
          <h2 
            data-animate
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 opacity-0 translate-y-12 transition-all duration-1200"
          >
            Voices of Excellence
          </h2>
          
          <p 
            data-animate
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0 translate-y-8 transition-all duration-1000"
          >
            Discover how Super60 community members have transformed their careers and achieved unprecedented success in the tech industry.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div 
          data-animate
          className="opacity-0 translate-y-12 transition-all duration-1200"
        >
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-2xl border border-gray-200/30 max-w-5xl mx-auto">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-12">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="grid md:grid-cols-3 gap-12 items-center">
              {/* Profile */}
              <div className="text-center md:text-left">
                <div className="relative mb-6">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-32 h-32 rounded-2xl mx-auto md:mx-0 object-cover shadow-lg border-4 border-white"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentTestimonial.name}
                </h3>
                <p className="text-gray-600 font-medium mb-1">
                  {currentTestimonial.role}
                </p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600 mb-4">
                  {currentTestimonial.company}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="md:col-span-2">
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8 italic">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full font-medium">
                    Project: {currentTestimonial.project}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div 
          data-animate
          className="flex justify-center items-center gap-6 mt-12 opacity-0 translate-y-8 transition-all duration-1000"
        >
          {/* Navigation Dots */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === activeTestimonial
                    ? 'bg-gradient-to-r from-blue-600 to-orange-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transform group-hover:-translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transform group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div 
          data-animate
          className="mt-24 opacity-0 translate-y-12 transition-all duration-1200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "98%", label: "Career Growth Rate", icon: "📈" },
              { number: "87%", label: "Salary Increase", icon: "💰" },
              { number: "45+", label: "Top Companies", icon: "🏢" },
              { number: "4.9/5", label: "Community Rating", icon: "⭐" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        [data-animate] {
          transition-property: opacity, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
};

export default HomeTestimonial;