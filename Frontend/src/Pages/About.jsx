
import Batch from '../Components/About/Batch.jsx' 
import WorkingModel from '../Components/About/Workingmodel.jsx'
import Mentor from '../Components/About/Mentor.jsx'
import ManagementDesk from '../Components/carousal/ManagementDeskCarousel.jsx'
import RoadMap from '../Components/Training/Roadmap.jsx'
import HeroSection from "../Components/hero/HeroSection"
import JoinUs from '../Components/JoinUs/JoinUs.jsx'
import TrainingSchedule from '../Components/Training/TrainingSchedule.jsx'
import FAQSection from '../Components/About/FAQSection.jsx'
import TeamSection from '../Components/About/TeamSection.jsx'
const About = () => {
  return (
    <div>

   
   <HeroSection 
  heading1={'Where Passion Meets Purpose'} 
  heading2={'Super60'} 
  subHeading={'Empowering Future Leaders Through Passion, Purpose, and Excellence'} 
  svg={<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FFA500" fillOpacity="1" d="M0,64L60,85.3C120,107,240,149,360,170.7C480,192,600,192,720,181.3C840,171,960,149,1080,160C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
</svg>} 
/>

 <Batch/>
 <WorkingModel/>
 <TrainingSchedule/>
<RoadMap/>
<Mentor/>
<ManagementDesk/>
<TeamSection/>
<FAQSection />
<JoinUs />

  </div>
  )
}

export default About