// 
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const faqs = [
  {
    question: "What is Super 60 and who is it for?",
    answer:
      "Super 60 is a premier mentorship-driven program designed for highly motivated students aiming for excellence in academics, coding, research, and career preparation. It is ideal for B.Tech students looking for real-world skills and competitive advantage.",
  },
  {
    question: "What makes Super 60 different from other learning platforms?",
    answer:
      "Super 60 offers personalized mentorship, real-time projects, peer learning, exclusive resources, and one-on-one guidance unlike generic online platforms. The focus is on quality over quantity with a limited, elite batch of 60 students.",
  },
  {
    question: "How can I join the Super 60 program?",
    answer:
      "Admission is based on a selection process which may include an aptitude test, coding challenge, and interview. Interested students can apply through the official website when applications open.",
  },
  {
    question: "What subjects or skills are covered in Super 60?",
    answer:
      "The program covers Data Structures & Algorithms, Web Development, Machine Learning, System Design, Git, Open Source Contributions, and soft skills like communication, leadership, and interview prep.",
  },
  {
    question: "Do I get any certification or recognition after completing the program?",
    answer:
      "Yes, upon successful completion, participants receive a certificate, performance evaluation, GitHub profile reviews, and alumni access for future collaborations and opportunities.",
  },
  {
    question: "Is there any placement or internship support from Super 60?",
    answer:
      "Yes, Super 60 provides guidance and mock interviews, resume reviews, and connects top performers with internship and job opportunities through our partner network and alumni base.",
  },
  {
    question: "Who are the mentors in the Super 60 program?",
    answer:
      "Mentors are experienced developers, educators, and alumni who have worked at top companies and universities. They bring hands-on experience and personal guidance to the cohort.",
  },
];


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % faqs.length);
  };

  const getCardStyle = (index) => {
    if (index === activeIndex) return "bg-blue-800 text-white scale-105 z-20";
    return "bg-gray-100 text-gray-700 opacity-60";
  };

  return (
    <div className="relative w-full px-4 py-12 mx-auto text-gray-800 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Frequently Asked <span className="text-blue-800">Questions</span>
          </h2>
          <p className="max-w-md mt-1 text-sm text-gray-500">
            Find answers to common questions about our façade engineering services, project process, and technical expertise.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="p-2 border rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 border rounded-full hover:bg-gray-100"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="flex gap-6 overflow-x-hidden transition-transform duration-500">
        {faqs.map((faq, index) => {
          const relativeIndex =
            (index - activeIndex + faqs.length) % faqs.length;

          if (relativeIndex > 3) return null; // only show 4 cards

          return (
            <div
              key={index}
              className={`flex-shrink-0 w-full sm:w-[45%] md:w-[23%] p-6  shadow-md transform transition-all duration-500 ${getCardStyle(index)}`}
            >
              <h3 className="font-semibold text-md">{faq.question}</h3>
              {index === activeIndex && faq.answer && (
                <p className="mt-3 text-sm text-blue-100">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
