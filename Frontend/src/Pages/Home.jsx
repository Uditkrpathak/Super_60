import React from 'react'
import Hero from '../Components/hero/hero'
import Carousel from '../Components/carousal/Carousel2'
import EasterCarousel from '../Components/carousal/EasterCarousel'


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <div>

        <Carousel />

      </div>
      {/* Add other components or sections here as needed */}
    </div>
  )
}

export default Home