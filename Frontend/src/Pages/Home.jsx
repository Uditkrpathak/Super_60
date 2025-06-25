import Hero from '../Components/hero/hero'
import Carousel from '../Components/carousal/RoadmapViewer'
import Achievments from '../Components/Home Components/Achievments'
import About_section from '../Components/Home Components/About_section'
import HomeTestimonial from '../Components/Testonomials/HomeTestimonial'
import JoinUs from '../Components/JoinUs/JoinUs'
import RoadMap from '../Components/carousal/RoadMap'
import Easter from '../Components/carousal/EasterCarousel'

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
       <div >
        <About_section />
      </div>
      <div>
        <Easter />
      </div>
      <div>

        {/* <Carousel /> */}

        <RoadMap/>
      </div>
      <div >
        <Achievments />
      </div>

      {/* <About_section /> */}
     

      <div>
        <HomeTestimonial />
      </div>
      {/* Add other components or sections here as needed */}


<JoinUs />
    </div>
  )
}

export default Home