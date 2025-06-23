import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { AnimatePresence, motion } from 'framer-motion';
import 'swiper/css';

const slides = [
  {
    id: 1,
    subtitle: "🔥 Don’t miss out !",
    title: "Super 60 in Action — Explore Our Journey of Events & Excellence",
  },
  {
    id: 2,
    subtitle: "🌟 Be Inspired!",
    title: "Unleashing Potential — Events, Achievements & Highlights",
  },
  {
    id: 3,
    subtitle: "🚀 Join the Revolution!",
    title: "Witness the Change — One Milestone at a Time",
  },
];

const slideVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

const Events = () => {
  return (
    <div className="relative w-full mt-20 overflow-hidden text-center bg-gray-100 py-28">

      {/* 🌀 Background Floating Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-40 h-40 bg-blue-200 rounded-full opacity-50 top-20 left-10 filter blur-3xl animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-300 rounded-full bottom-10 right-20 filter blur-2xl opacity-40 animate-bounce"></div>
        <div className="absolute w-24 h-24 bg-pink-200 rounded-full top-1/2 left-1/2 filter blur-xl opacity-30 animate-ping"></div>
      </div>

      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center justify-center space-y-6"
              >
                <motion.button
                  className="px-6 py-2 text-sm font-semibold text-blue-900 transition border border-blue-800 rounded-full hover:bg-blue-900 hover:text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {slide.subtitle}
                </motion.button>

                <motion.h2
                  className="max-w-5xl px-6 mx-auto text-2xl font-extrabold leading-tight text-black md:text-5xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {slide.title}
                </motion.h2>
              </motion.div>
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Events;
