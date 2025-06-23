import React, { useState } from 'react'

const Carousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const cards = [
    {
      id: 1,
      title: 'DESIGN CLUB',
      subtitle: 'Creative Design Solutions',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 2,
      title: 'JOYEUX REPAS',
      subtitle: 'Culinary Excellence',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      // title: 'STUDIO FUGU',
      // subtitle: 'Digital Innovation',
      image:
        'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rSSl9pOoaFDA2LEeO4I3rP8jBzJb7cltWkQRY',
      // color: 'from-gray-800 to-gray-900'
    },
    {
      id: 4,
      // title: 'WEBDESIGN + WEBFLOW',
      // subtitle: 'Modern Web Solutions',
      image:
        'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAWGbiBcYnIQDTmzWgy0bcOvPRLxFCXr97NJo',
      // color: 'from-blue-100 to-cyan-100'
    },
    {
      id: 5,
      // title: "AKROLAB",
      // subtitle: "Research & Development",
      image:
        'https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rHptqDVpF2pQE4PFU7NAMVr6YeWicz5h1KuJt'
      
    }
  ]

  return (
    <div className='relative w-full overflow-visible bg-transparent'>
      {/* Curved top divider */}
      <div className='absolute top-0 left-0 z-20 w-full h-32 bg-transparent'>
        <svg
          className='absolute bottom-0 w-full h-32'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z'
            fill='#ea580c'
          />
        </svg>
      </div>

      {/* Background behind cards and SVGs */}
      <div
        className='absolute left-0 right-0'
        style={{
          top: '6rem',
          bottom: '8rem',
          background: '#ea580c',
          zIndex: 10
        }}
        aria-hidden='true'
      />

      {/* Main carousel section */}
      <div className='relative z-30 pt-20 pb-32'>
        <div className='px-8 mx-auto max-w-7xl'>
          {/* Cards container with fixed height */}
          <div className='relative' style={{ height: '400px' }}>
            <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6'>
              {cards.map((card, index) => {
                const isHovered = hoveredIndex === index
                const isNeighbor =
                  hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1
                const isFarAway =
                  hoveredIndex !== null && Math.abs(hoveredIndex - index) > 1

                return (
                  <div
                    key={card.id}
                    className={`
                      relative transition-all duration-500 ease-in-out cursor-pointer transform-gpu
                      ${
                        isHovered
                          ? 'w-80 h-96 -translate-y-24 z-50 scale-105'
                          : isNeighbor
                          ? 'w-52 h-72 -translate-y-8 z-20 scale-98'
                          : isFarAway
                          ? 'w-36 h-56 -translate-y-2 scale-95 opacity-60 z-10'
                          : 'w-60 h-80 z-15'
                      }
                    `}
                    style={{
                      transformOrigin: 'bottom center',
                      filter: isHovered
                        ? 'drop-shadow(0 25px 50px rgba(139, 92, 246, 0.3))'
                        : 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                      padding: '8px'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Card */}
                    <div
                      className={`
                      w-full h-full rounded-2xl overflow-hidden relative
                      bg-gradient-to-br ${card.color}
                      transform transition-all duration-500 ease-in-out
                      ${isHovered ? 'rotate-2' : isNeighbor ? 'rotate-1' : ''}
                      border border-white/10
                    `}
                      style={{ margin: '-8px' }}
                    >
                      {/* Background image with parallax effect */}
                      <div
                        className={`
                          absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out
                          ${
                            isHovered
                              ? 'scale-110 opacity-80'
                              : 'scale-100 opacity-60'
                          }
                        `}
                        style={{
                          backgroundImage: `url(${card.image})`,
                          backgroundPosition: 'center center'
                        }}
                      />

                      {/* Gradient overlays */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
                      <div
                        className={`
                        absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ease-in-out
                        ${card.color} 
                        ${isHovered ? 'opacity-30' : 'opacity-60'}
                      `}
                      />

                      {/* Glow effect for hovered card */}
                      {isHovered && (
                        <div className='absolute -inset-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10' />
                      )}

                      {/* Content */}
                      <div className='relative flex flex-col justify-end h-full p-8'>
                        <div className='text-white'>
                          <h3
                            className={`
                            font-bold tracking-wider mb-3 transition-all duration-500
                            ${
                              isHovered
                                ? 'text-3xl transform -translate-y-2'
                                : 'text-xl'
                            }
                          `}
                          >
                            {card.title}
                          </h3>
                          <p
                            className={`
                            text-gray-200 transition-all duration-500 leading-relaxed
                            ${
                              isHovered
                                ? 'text-lg opacity-100 transform -translate-y-1'
                                : 'text-base opacity-70'
                            }
                          `}
                          >
                            {card.subtitle}
                          </p>

                          {/* Hover indicator with smooth animation */}
                          <div
                            className={`
                            mt-6 flex items-center text-base transition-all duration-500
                            ${
                              isHovered
                                ? 'opacity-100 transform translate-y-0'
                                : 'opacity-0 transform translate-y-4'
                            }
                          `}
                          >
                            <span className='font-medium text-purple-300'>
                              View Project
                            </span>
                            <div className='flex items-center justify-center w-8 h-8 ml-3 rounded-full bg-purple-500/20'>
                              <svg
                                className='w-4 h-4 text-purple-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Shine effect on hover */}
                      {isHovered && (
                        <div className='absolute inset-0 opacity-50 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse' />
                      )}
                    </div>

                    {/* Connection indicator */}
                    {/* <div className={`
                      absolute -bottom-3 left-1/2 transform -translate-x-1/2
                      w-4 h-4 rounded-full transition-all duration-500
                      bg-gradient-to-br ${card.color}
                      ${isHovered ? 'scale-150 shadow-lg shadow-purple-500/50' : 'scale-100'}
                    `} /> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom divider */}
      <div className='absolute bottom-0 left-0 z-20 w-full h-32'>
        <svg
          className='absolute top-0 w-full h-32'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M1200,120 C900,0 300,0 0,120 L0,0 L1200,0 Z'
            fill='#ea580c'
          />
        </svg>
      </div>

      {/* Subtle background effects */}
      <div className='absolute z-30 rounded-full top-1/4 left-10 w-96 h-96 bg-purple-500/5 blur-3xl animate-pulse' />
      <div className='absolute z-30 delay-1000 rounded-full bottom-1/4 right-10 w-80 h-80 bg-blue-500/5 blur-3xl animate-pulse' />
    </div>
  )
}

export default Carousel
