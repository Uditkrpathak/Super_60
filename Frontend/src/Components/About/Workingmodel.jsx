import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    id: 1,
    title: "Learn from Industry Experts",
    description:
      "Engage with professionals through workshops and seminars to gain real-world insights and knowledge.",
  },
  {
    id: 2,
    title: "Peer-to-Peer Learning",
    description:
      "Collaborate with peers across different batches, fostering a community of shared learning and growth.",
  },
  {
    id: 3,
    title: "Apply Knowledge Practically",
    description:
      "Implement your learning through live projects and real-world applications, bridging the gap between theory and practice.",
  },
];

const WorkingModel = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-20 px-4 md:px-12 bg-white">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Our Working Model
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg text-center">
  The <span className="text-orange-500 font-semibold">Super60</span> program is designed to provide a holistic learning experience that combines expert guidance, peer collaboration, and practical application. Here's how it works:
</p>

      </div>

     
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.id}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform transition-transform hover:-translate-y-1 flex-1 text-center flex flex-col items-center"
          >
         
            <div className="w-12 h-12 mb-4 rounded-full border-4 border-orange-500 bg-white text-orange-600 font-bold text-lg flex items-center justify-center shadow-inner">
              {step.id}
            </div>

         
            <h3 className="text-lg font-semibold text-gray-800">
              {step.title}
            </h3>

            
            <p className="text-sm text-gray-600 mt-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkingModel;
