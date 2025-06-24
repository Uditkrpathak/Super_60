import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { timeline, } from "../../constants";

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
  

  return (
    <section className='max-container bg-slate-100'>
      <div className='mt-12 flex'>
          <VerticalTimeline>
            {timeline.map((timeline, index) => (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: timeline.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={timeline.icon}
                      alt={timeline.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: timeline.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {timeline.title}
                  </h3>
        
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {timeline.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='text-black-500/50 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        <hr className='border-slate-200' />
    </section>
  );
};

export default Roadmap;
