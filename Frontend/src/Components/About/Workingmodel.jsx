import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const steps = [
  {
    id: 1,
    title: "LEARN FROM INDUSTRY EXPERTS",
    description: "Engage with professionals through workshops and seminars to gain real-world insights and knowledge.",
  },
  {
    id: 2,
    title: "PEER TO PEER LEARNING",
    description: "Learn collaboratively with your peers through discussions, group projects, and shared experiences.",
  },
  {
    id: 3,
    title: "APPLY KNOWLEDGE PRACTICALLY",
    description: "Implement what you've learned in real projects, internships, and case studies for hands-on experience.",
  },
];

const WorkingModel = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Our Working Model
      </h2>
      <p className="text-gray-600 mb-12">
        The <span className="text-orange-500 font-semibold">Super 60</span> aren't just learners—they’re future leaders in the making
      </p>

      <div className="flex flex-col gap-16 relative">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col md:flex-row items-center justify-${index % 2 === 0 ? 'start' : 'end'} gap-6 relative`}
            data-aos="fade-up"
          >
            {/* Number Circle */}
            <div className="flex items-center justify-center bg-[#1a1a56] text-white font-bold w-10 h-10 rounded-full text-lg">
              {step.id}
            </div>

            {/* Text Block */}
            <div className="bg-gray-100 rounded-xl px-6 py-5 max-w-xl text-left shadow-md">
              <h3 className="text-md font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-1 text-sm">{step.description}</p>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="absolute md:block hidden left-1/2 top-full mt-4 transform -translate-x-1/2 z-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="orange"
                  strokeWidth="2"
                  className="rotate-[60deg]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkingModel;
