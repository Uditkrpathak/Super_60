import React from 'react';

const Home4 = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Light mint background shapes */}
        <div className="absolute bg-green-100 rounded-full top-20 right-10 w-96 h-96 opacity-30 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-20 w-80 h-80 bg-green-50 opacity-40 blur-2xl"></div>
        
        {/* Decorative star elements */}
        <div className="absolute text-green-400 top-16 left-1/3 opacity-60">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
            <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z"/>
          </svg>
        </div>
        
        <div className="absolute text-green-300 opacity-50 bottom-32 right-1/4">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="currentColor">
            <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z"/>
          </svg>
        </div>
        
        
        
        {/* Curved lines */}
        <div className="absolute top-1/4 left-1/4">
          <svg width="200" height="100" viewBox="0 0 200 100" className="text-green-200 opacity-40">
            <path d="M10 50 Q 100 10, 190 50" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 right-1/3">
          <svg width="150" height="80" viewBox="0 0 150 80" className="text-green-200 opacity-30">
            <path d="M10 40 Q 75 10, 140 40" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>

      <div className="container relative z-10 px-6 py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                We're a{' '}
                <span className="block">creative design</span>
                <span className="block">agency.</span>
              </h1>
              
              <p className="max-w-md text-lg leading-relaxed text-gray-600">
                A brilliant, modular agency template for startups build yours today.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-6">
              <button className="px-8 py-4 font-medium text-white transition-all duration-300 transform bg-gray-800 rounded-full shadow-lg hover:bg-gray-900 hover:scale-105">
                Get in touch
              </button>
              
              <button className="flex items-center space-x-3 text-gray-700 transition-colors duration-300 hover:text-gray-900 group">
                <div className="flex items-center justify-center w-12 h-12 transition-colors duration-300 bg-green-200 rounded-full hover:bg-green-300">
                  <svg className="w-5 h-5 ml-1 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
                <span className="font-medium">Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Side - Organic Image Layout */}
          <div className="relative min-h-[32rem]">
            {/* All ovals share the same x-axis (e.g., left-32), but different y-axis (top) */}
            {/* Large oval - top */}
            <div className="absolute top-0 overflow-hidden transform left-32 w-72 h-96 -rotate-12">
              <div className="w-full h-full overflow-hidden bg-gray-800 rounded-full shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop&crop=center" 
                  alt="Modern interior design" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* Medium oval - middle */}
            <div className="absolute w-64 overflow-hidden transform left-32 top-40 h-80 rotate-6">
              <div className="w-full h-full overflow-hidden bg-gray-700 rounded-full shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=350&h=500&fit=crop&crop=left" 
                  alt="Workspace design" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {/* Small oval - bottom */}
            <div className="absolute w-48 h-48 overflow-hidden transform left-32 top-80 rotate-12">
              <div className="w-full h-full overflow-hidden bg-gray-600 rounded-full shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=right" 
                  alt="Design detail" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute w-2 h-2 bg-green-400 rounded-full top-1/3 right-10 opacity-60 animate-pulse"></div>
      <div className="absolute w-1 h-12 transform bg-gray-300 rounded-full bottom-1/4 left-16 opacity-40 rotate-12"></div>
      <div className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-50 top-1/2 left-1/2"></div>
    </div>
  );
};

export default Home4;