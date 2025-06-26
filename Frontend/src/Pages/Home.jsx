import { useEffect, useState } from "react";
import Hero from '../Components/hero/hero'
// import Carousel from '../Components/carousal/RoadmapViewer'
import Achievments from '../Components/Home_Components/Achievments'
import About_section from '../Components/Home_Components/About_section'
import HomeTestimonial from '../Components/Testonomials/HomeTestimonial'
import JoinUs from '../Components/JoinUs/JoinUs'
import RoadMap from '../Components/carousal/RoadMap'
import GlassRoadmap from "../Components/Home_Components/glass_roadmap";
import Easter from '../Components/carousal/EasterCarousel'
import HeroBg from '../Components/hero/backgrounds/herobg'
import Carousel from "../Components/Home_Components/Carousal";

const S60_OPACITY = 0.13; // Fixed opacity

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [bgActive, setBgActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setOffset(scrollY * 0.44);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="relative">
      <div>
        {/* S60 Parallax Background in bottom right */}
        <div className="overflow-hidden relative w-full h-screen"
        onMouseEnter={() => setBgActive(true)}
        onMouseLeave={() => setBgActive(false)}>
          <Hero />
          <HeroBg active={bgActive} />
        </div>
        
        <div
          className="fixed -bottom-56 right-0 pointer-events-none select-none z-[10]"
          style={{
            transform: `translateY(${-offset}px)`,
            width: "60vw",
            height: "60vh",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
          aria-hidden="true"
        >
          <span
            className="font-black"
            style={{
              fontSize: "28vw",
              color: "#fb923c",
              opacity: S60_OPACITY,
              fontFamily: "Montserrat, sans-serif",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              letterSpacing: "-0.05em",
              mixBlendMode: "difference",
              transition: "opacity 0.2s",
            }}
          >
            S60
          </span>
        </div>
        <div>
          <Carousel />
        </div>
        <div>
          <About_section />
        </div>

      </div>


      <div>
        <GlassRoadmap/>
      </div>
      <div>
        <Achievments />
      </div>
      <div>
        <HomeTestimonial />
      </div>
      <JoinUs />
    </div>
  )
}

export default Home