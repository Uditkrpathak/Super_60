import FacultyProfiles from "../Components/Academics/FacultyProfiles"
import FAQ from "../Components/Faq/FAQ"
import HeroSection from "../Components/hero/HeroSection"


const Academics = () => {
  return (
    <div>
      
      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />

      <FacultyProfiles/>

      <div>
        <FAQ/>
      </div>
    </div>
  )
}

export default Academics