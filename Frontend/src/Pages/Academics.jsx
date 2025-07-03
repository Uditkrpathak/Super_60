import FacultyProfiles from "../Components/Academics/FacultyProfiles"
import TestimonialSliderAcademics from "../Components/Academics/TestimonialSliderAcademics"
import FAQ from "../Components/Faq/FAQ"
import HeroSection from "../Components/hero/HeroSection"
import JoinUs from "../Components/JoinUs/JoinUs"
import SectionHeader from "../Components/Section/SectionHeader"
import Mentor from "../Components/About/Mentor"


const Academics = () => {
  return (
    <div>
      
      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />
  <Mentor/>
      <FacultyProfiles/>

      <div>
        <FAQ/>
      </div>

      <div>
        <SectionHeader
          section="Reaserch Paper"
          title="Our Members"
          subtitle="Research Paper Published Students "
          color="#002277"
        />
       
        <TestimonialSliderAcademics/>
      </div>

<JoinUs />
    </div>
  )
}

export default Academics