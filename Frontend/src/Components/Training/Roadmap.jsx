import React, { useState } from "react"; 
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { timeline } from "../../constants";

const skills = [
  {
    year: "First year",
    skills: ["Responsive front-end development", "UI/UX design principles"],
  },
  {
    year: "Second year",
    skills: ["API design and implementation", "Data structures & algorithms"],
  },
  {
    year: "Third year",
    skills: ["DevOps Integration", "Mobile-responsive frameworks"],
  },
  {
    year: "Fourth year",
    skills: ["Blockchain Development", "Smart Contract Implementation"],
  },
];

const Roadmap = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className='max-container bg-white py-12'>
      
      <div className='mt-12 flex'>
        <VerticalTimeline lineColor={"#E2E8F0"}> 
          {timeline.map((timelineItem, index) => {
            const isHovered = hoveredCard === index;
            const borderColor = isHovered ? "#F97316" : "#1E3A8A"; 

            return (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: timelineItem.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={timelineItem.icon}
                      alt={timelineItem.title}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: borderColor, 
                  boxShadow: "none",
                  background: "#fff",
                  transition: "border-color 0.3s ease-in-out", 
                }}
                contentArrowStyle={{
                  borderRight: `7px solid ${borderColor}`, 
                  transition: "border-color 0.3s ease-in-out", 
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {timelineItem.title}
                  </h3>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {timelineItem.points.map((point, pointIndex) => (
                    <li
                      key={`experience-point-${index}-${pointIndex}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>

      <hr className='border-slate-200 mt-12' /> 
    </section>
  );
};

export default Roadmap;