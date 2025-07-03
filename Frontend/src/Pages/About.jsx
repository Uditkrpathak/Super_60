
import Batch from '../Components/About/Batch.jsx' 
import WorkingModel from '../Components/About/Workingmodel.jsx'
import ManagementDesk from '../Components/carousal/ManagementDeskCarousel.jsx'
import RoadMap from '../Components/carousal/RoadMap.jsx'
import HeroSection from "../Components/hero/HeroSection"
import JoinUs from '../Components/JoinUs/JoinUs.jsx'
const About = () => {
  return (
    <div>

   
     <HeroSection heading1={'Where Excellence Begins'} heading2={'Super60'} subHeading={'Empowering Future Leaders Through Passion, Purpose, and Excellence'}  />
 <Batch/>
 <WorkingModel/>
<RoadMap/>
<ManagementDesk/>


<JoinUs />
  </div>
  )
}

export default About