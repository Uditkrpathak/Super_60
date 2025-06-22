import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';


const HeroSection = () => {
  useEffect(() => {
    anime({
      targets: '.hero-card',
      opacity: [0, 1],
      translateX: function (el, i, l) {
        const startOffset = (l - 1 - i) * -150 - 250;
        return [`${startOffset}px`, '0px'];
      },
      scale: [0.5, 1],
      translateY: [
        { value: 50, duration: 500, easing: 'easeOutQuad' },
        { value: 0, duration: 800, easing: 'easeOutQuad' },
      ],
      rotate: function (el, i) {
        return i % 2 === 0 ? ['-10deg', '0deg'] : ['10deg', '0deg'];
      },
      easing: 'easeOutCubic',
      duration: 1500,
      delay: anime.stagger(100, { start: 200 }),
      complete: function () {
        anime({
          targets: '.hero-card',
          translateY: [
            { value: -8, duration: 1000, easing: 'easeInOutSine' },
            { value: 0, duration: 1000, easing: 'easeInOutSine' },
          ],
          scale: [
            { value: 1.01, duration: 1000, easing: 'easeInOutSine' },
            { value: 1, duration: 1000, easing: 'easeInOutSine' },
          ],
          loop: true,
          direction: 'alternate',
          delay: anime.stagger(100),
        });
      },
    });
  }, []);

  const cardData = [
    {
      src: 'https://placehold.co/240x240/a0c4ff/ffffff?text=Anime+Hero+1',
      alt: 'Anime Hero Character 1',
    },
    {
      src: 'https://placehold.co/240x240/bdb2ff/ffffff?text=Anime+Hero+2',
      alt: 'Anime Hero Character 2',
    },
    {
      src: 'https://placehold.co/240x240/ffc6ff/ffffff?text=Anime+Hero+3',
      alt: 'Anime Hero Character 3',
    },
    {
      src: 'https://placehold.co/240x240/b8e0d4/ffffff?text=Anime+Hero+4',
      alt: 'Anime Hero Character 4',
    },
  ];

  return (
    <section
      className="flex flex-wrap justify-center items-center min-h-screen p-5 relative overflow-hidden bg-gray-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {cardData.map((card, index) => (
        <div
          key={index}
          className="hero-card w-[280px] min-h-[250px] m-[15px] bg-white rounded-[12px] shadow-lg flex flex-col justify-center items-center p-5 text-center opacity-0 transform -translate-x-[500px] scale-50 transition-shadow duration-300 ease-in-out hover:shadow-xl hover:cursor-pointer"
        >
          <img
            src={card.src}
            alt={card.alt}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://placehold.co/240x240/cccccc/000000?text=Image+Failed';
            }}
            className="max-w-full h-auto rounded-lg object-cover"
          />
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
