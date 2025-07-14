import { useEffect, useState } from "react";
import Hero2 from '../Components/hero/hero2'
import Achievments from '../Components/Home_Components/Achievments'
import About_section from '../Components/Home_Components/About_section'
import HomeTestimonial from '../Components/Testonomials/HomeTestimonial'
import JoinUs from '../Components/JoinUs/JoinUs'
import RoadMap from '../Components/carousal/RoadMap'
import Easter from '../Components/carousal/EasterCarousel'
// import HeroBg from '../Components/hero/backgrounds/herobg'
import Carousel from "../Components/Home_Components/Carousal";
import MemberDirectory from "../Components/Batches/MemberDirectory";
import GlassRoadmap from "../Components/Home_Components/glass_roadmap";
import SectionHeader from "../Components/Section/SectionHeader";
import BatchesPage from "../Components/Batches/BatchesPage";
import FeaturedEvent from "../Components/EventCards/FeaturedEvent";
import FeaturedEventCarousel from "../Components/EventCards/FeaturedEvent";
import Super60Intro from "../Components/Home_Components/Super60Intro";




const Home = () => {
  return (
   <div>
      <Hero2/>
      <About_section/>

      <div className="">
        <Easter/>
      </div>

      




<GlassRoadmap/>

<div className="mt-44 mb-[-200px]">
        <Carousel/>
      </div>


<div>
  <SectionHeader  section= "Our Batches"
title= "Discover the brilliance within"
subtitle= "Super 60 Talent Collective"
color= "#002277" 
  />
  <BatchesPage/>
 
</div>

<Achievments/>
<SectionHeader
  section="Featured Events"
  title="Explore Our Latest Campus Highlights"
  subtitle=""
  color="#002277"
/>

<FeaturedEventCarousel/>

<SectionHeader
  section="Featured Events"
  title="Explore Our Latest Campus Highlights"
  subtitle=""
  color="#002277"
/>
    
<HomeTestimonial/>
<JoinUs/>
   </div>  
  )
}

export default Home

