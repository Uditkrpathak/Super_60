import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import HeroBg from '../Components/hero/backgrounds/herobg';

const slidesText = [
  {
    id: 1,
    subtitle: "Don’t miss out !",
    title: "Super 60 in Action — Explore Our Journey of Events & Excellence",
  },
  {
    id: 2,
    subtitle: "Be Inspired!",
    title: "Unleashing Potential — Events, Achievements & Highlights",
  },
  {
    id: 3,
    subtitle: "Join the Revolution!",
    title: "Witness the Change — One Milestone at a Time",
  },
];

const Events = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className="w-full py-16 mt-20 text-center bg-white ">
      <HeroBg/>
      <Swiper
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
      >
        {slidesText.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <button className="px-4 py-1 text-sm font-semibold text-blue-900 border border-blue-800 rounded-full">
                {slide.subtitle}
              </button>
              <h2 className="max-w-4xl px-4 mx-auto text-2xl font-bold text-black md:text-4xl">
                {slide.title}
              </h2>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
  );
};

export default Events;
