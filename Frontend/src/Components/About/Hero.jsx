import React from 'react'
import photo from '../../assets/photo.jpg'
const Hero = () => {
  return (
   <div
      className="w-full  relative bg-cover bg-center flex items-center justify-center"
      style={{
        height: '530px',
      backgroundImage: `url(${photo})`,
      }}
    >
   
      <div className="absolute inset-0 bg-black opacity-40"></div>

   
      <h1 className="relative text-white text-4xl md:text-6xl font-semibold text-center mt-10">
        Where Excellence Begins <span className="text-yellow-400">&#8594;</span> The
        <br /> Super60
      </h1>
    </div>
  )
}

export default Hero
