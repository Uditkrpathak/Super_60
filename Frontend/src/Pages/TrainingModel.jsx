import React from 'react'
import HeroSection from '../Components/hero/HeroSection'
import TrainingSchedule from '../Components/Training/TrainingSchedule'
import Roadmap from '../Components/Training/Roadmap'
import JoinUs from '../Components/JoinUs/JoinUs'

const TrainingModel = () => {
  return (
    <div >
      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />
    
      <TrainingSchedule />

      <Roadmap />

<JoinUs />
    </div>
  )
}

export default TrainingModel
