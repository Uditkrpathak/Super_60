import Hero from '../Components/hero/hero2'
import Carousel from '../Components/carousal/RoadmapViewer'
import Achievments from '../Components/Home Components/Achievments'
import About_section from '../Components/Home Components/About_section'
import HomeTestimonial from '../Components/Testonomials/HomeTestimonial'
import JoinUs from '../Components/JoinUs/JoinUs'

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <div>

        <Carousel />
      </div>
      <div >
        <Achievments />
      </div>

      {/* <About_section /> */}
      <div >
        <About_section />
      </div>

      <div>
        <HomeTestimonial />
      </div>
      {/* Add other components or sections here as needed */}


<JoinUs />
    </div>
  )
}

export default Home