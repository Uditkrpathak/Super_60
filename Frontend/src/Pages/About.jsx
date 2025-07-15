
import Batch from '../Components/About/Batch.jsx' 
import WorkingModel from '../Components/About/Workingmodel.jsx'
import Mentor from '../Components/About/Mentor.jsx'
import ManagementDesk from '../Components/carousal/ManagementDeskCarousel.jsx'
import RoadMap from '../Components/Training/Roadmap.jsx'
import HeroSection from "../Components/hero/HeroSection"
import JoinUs from '../Components/JoinUs/JoinUs.jsx'
import TrainingSchedule from '../Components/Training/TrainingSchedule.jsx'
import FAQSection from '../Components/About/FAQSection.jsx'
const About = () => {
  return (
    <div>

   
     <HeroSection heading1={'Where Excellence Begins'} heading2={'Super60'} subHeading={'Empowering Future Leaders Through Passion, Purpose, and Excellence'}  />
 <Batch/>
 <WorkingModel/>
 <TrainingSchedule/>
<RoadMap/>
<Mentor/>
<ManagementDesk/>
<FAQSection />
<JoinUs />

  </div>
  )
}

export default About