import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

const faqData = [
  {
    question: "What is Super-60 Community?",
    answer: "Super-60 Community is a vibrant platform where curious minds come together to share knowledge, explore unique ideas, and collaborate on innovative solutions. It's dedicated to fostering a strong learning environment and preparing students for top-tier opportunities."
  },
  {
    question: "Who is Super-60 Community for?",
    answer: "Super-60 Community is designed for highly motivated and talented students aiming for excellence in competitive exams and career development. It caters to individuals who are eager to learn, collaborate, and achieve their full potential in a supportive environment."
  },
  {
    question: "How does Super-60 Community work?",
    answer: "Super-60 Community operates through a structured curriculum, mentorship programs, regular workshops, and collaborative projects. Members engage in intensive training, peer learning, and expert-led sessions to enhance their skills and knowledge base."
  },
  {
    question: "How often do you update community resources?",
    answer: "Community resources are updated regularly, typically on a weekly or bi-weekly basis, to ensure members have access to the latest information, study materials, and industry insights. We continuously incorporate feedback and new developments to keep our content relevant and effective."
  },
];


const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }, 
};
const answerVariants = {
  collapsed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.5, ease: "easeOut" } },
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="py-20 bg-gray-50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-20">
        {/* Left Section: */}
        <div className="md:w-1/3 text-left">
          <motion.h2
            className="text-5xl font-extrabold text-gray-900 leading-tight mb-8"
            variants={titleVariants}
          >
            Frequently Asked <br /> Questions
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg leading-relaxed"
            variants={textVariants}
          >
            Got questions about Super-60 Community? We've got answers. Explore our FAQs to learn more about our mission, programs, and how we empower students for success.
          </motion.p>
        </div>

        {/* Right Section*/}
        <motion.div
          className="md:w-2/3"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } } 
          }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-200 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }} 
            >
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800 text-xl focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    className="mt-4 text-gray-600 text-base leading-relaxed overflow-hidden"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={answerVariants}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQSection;