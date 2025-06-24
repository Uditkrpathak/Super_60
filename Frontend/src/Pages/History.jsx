import HeroSection from '../Components/hero/HeroSection'
import TimelineSection from '../Components/History/TimelineSection'
import GalleryGrid from '../Components/History/GalleryGrid'

const History = () => {
  return (
    <div>
      <HeroSection
  heading1="The Journey Begins"
  heading2="How The Super 60 Was Born"
  subHeading="What started as a small group of passionate learners soon transformed into a movement of innovation, collaboration, and leadership."
  badge="Explore Our Story"
/>

<section className="px-6 py-24 text-gray-800 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
          Sparking Success: Super 60’s Journey from Vision to Legacy
        </h1>
        <p className="text-lg text-gray-600">
          Discover how Super 60 evolved from a bold vision to a dynamic force
          shaping leaders, innovators, and changemakers in technical education
          and beyond.
        </p>
      </div>
    </section>

<TimelineSection/>

<GalleryGrid/>

    </div>
  )
}

export default History