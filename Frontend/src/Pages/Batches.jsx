import BatchesPage from "../Components/Batches/BatchesPage";
import HeroSection from "../Components/hero/HeroSection";
import JoinUs from "../Components/JoinUs/JoinUs";

const Batches = () => {
  return (
    <div className="relative overflow-hidden ">

      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />

      <div>
        <BatchesPage />
      </div>

      <JoinUs />
    </div>
  )
}

export default Batches