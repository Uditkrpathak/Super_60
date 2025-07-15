import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const faqs = [
  {
    question: "What is Super 60?",
    answer:
      "Super 60 is a selective mentorship‑based tech program designed for the top 60 students. It emphasizes deep learning through live sessions, peer collaboration, and real‑world problem‑solving to build industry‑level tech skills.",
  },
  {
    question: "What makes it unique?",
    answer:
      "Unlike generic online courses, Super 60 provides one‑on‑one mentorship, curated real‑time projects, resume‑building support, mock interviews, and a tightly‑knit learning community that pushes each member to grow personally and professionally.",
  },
  {
    question: "What skills are covered?",
    answer:
      "The program covers a wide range of technical and professional skills including Data Structures & Algorithms, Full‑Stack Web Development, Git & GitHub, System Design, Agile workflow, and soft skills like communication and time management.",
  },
  {
    question: "Is there placement help?",
    answer:
      "Yes. Super 60 provides dedicated placement support through resume reviews, portfolio polishing, mock interviews, internship referrals, and alumni connections. Many students have landed roles at top tech companies through the support ecosystem.",
  },
  {
    question: "How can I apply?",
    answer:
      "Applications are accepted via the official Super 60 website. The selection process includes an online aptitude + coding test followed by a personal interview to assess motivation, clarity, and commitment to tech learning.",
  },
];

const FAQShowcase = () => {
  const scrollRef = useRef(null);
  const scroll = (offset) =>
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });

  return (
    <section className="bg-white text-[#0f172a] py-20 px-4">
      {/* --- Component‑scoped responsive tweak --- */}
      <style>{`
        /* Default (mobile‑first): 90 % width, leaves gutter for peek‑ahead */
        .faq-card {
          flex: 0 0 90%;
          max-width: 90%;
        }

        @media (min-width: 768px) {
          /* md+: exactly your original 3‑across math */
          .faq-card {
            flex: 0 0 calc((100% - 2rem) / 3);
            max-width: calc((100% - 2rem) / 3);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 px-4">
          <h2 className="text-4xl font-bold">
            Frequently Asked <span className="text-[#ff6600]">Questions</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-2xl mx-auto">
            Find answers to common questions about our façade engineering
            services, project process, and technical expertise.
          </p>
        </div>

        {/* --- Carousel Wrapper (relative) --- */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll(-380)}
            className="hidden sm:inline-flex absolute left-2 md:-left-4 top-1/2 -translate-y-1/2
                       z-10 text-white bg-[#ff6600] hover:bg-[#e65c00] p-2 rounded-full shadow-md"
          >
            <FaChevronLeft size={16} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll(380)}
            className="hidden sm:inline-flex absolute right-2 md:-right-4 top-1/2 -translate-y-1/2
                       z-10 text-white bg-[#ff6600] hover:bg-[#e65c00] p-2 rounded-full shadow-md"
          >
            <FaChevronRight size={16} />
          </button>
          

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-hidden
                       py-6 sm:mx-6 sm:px-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="faq-card snap-center flex-shrink-0 min-h-[300px] bg-[#f9f9f9]
                           border border-[#e5e7eb] rounded-xl p-6 shadow-sm
                           transition-all duration-300 hover:border-[#ff6600]"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-[#ff6600] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQShowcase;
