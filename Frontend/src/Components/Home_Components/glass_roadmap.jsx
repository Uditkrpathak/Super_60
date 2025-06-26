import React from "react";

const sectionData = [
  {
    id: "top-left",
    title: "Web Design",
    description:
      "From your ideas into a working prototype in Figma. Share your ideas with us, and we'll do the rest.",
    customStyle: { marginTop: "0rem" }, // 🠔 Default
    items: [
      { title: "Analyzing & Researching", badge: null, x: "0rem", width: "90%" },
      { title: "Mapping", badge: "+ Revisions", x: "2rem", width: "90%" },
      { title: "Analyzing & Researching", badge: null, x: "-3rem", width: "90%" },
      { title: "Mapping", badge: "+ Revisions", x: "2rem", width: "90%" },
    ],
  },
  {
    id: "top-right",
    title: "Web Development",
    description:
      "From your design into a performant website. Share your design with us, and we'll do the rest.",
    customStyle: { marginTop: "35rem" }, // 🠔 Push it lower
    items: [
      { title: "Planning", badge: "+ Revisions", x: "3rem", width: "85%" },
      { title: "Coding", badge: null, x: "0rem", width: "90%" },
      { title: "Planning", badge: "+ Revisions", x: "3rem", width: "85%" },
      { title: "Coding", badge: null, x: "0rem", width: "90%" },
    ],
  },
  {
    id: "bottom-left",
    title: "Super60 Culture",
    description:
      "Learn, build and grow inside a peer-led high-performance community. Technical skills meet real-world challenges.",
    customStyle: { marginTop: "2rem" }, // 🠔 Offset it slightly
    items: [
      { title: "Peer Learning", badge: "+ Sessions", x: "1.5rem", width: "88%" },
      { title: "Real Projects", badge: null, x: "0rem", width: "95%" },
      { title: "Peer Learning", badge: "+ Sessions", x: "1.5rem", width: "88%" },
      { title: "Real Projects", badge: null, x: "0rem", width: "95%" },
    ],
  },
  {
    id: "bottom-right",
    title: "Event Management",
    description:
      "Handling tech events, public speaking, and execution from the core. Grow beyond code.",
    customStyle: { marginTop: "35rem" }, // 🠔 Pull it up slightly
    items: [
      { title: "C++ Workshop", badge: "+ Coordination", x: "2rem", width: "90%" },
      { title: "SkillUp Sessions", badge: "+ Feedback", x: "1rem", width: "85%" },
      { title: "C++ Workshop", badge: "+ Coordination", x: "2rem", width: "90%" },
      { title: "SkillUp Sessions", badge: "+ Feedback", x: "1rem", width: "85%" },
    ],
  },
];

const DesignPath = () => {
  return (
    <div className="min-h-screen w-full bg-orange-400 text-black px-4 py-20 relative overflow-hidden">
      <div>
        <h1 className="flex items-center justify-center w-full m-auto">Roadmap ruk jao update krunga</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-12 max-w-9xl ">
        {sectionData.map((section) => (
          <div
            key={section.id}
            className="flex flex-col items-center px-40"
            style={section.customStyle || {}}
          >
            {/* Section Heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-300 text-lg max-w-xl ">
                {section.description}
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col items-start gap-6 w-full relative z-10">
              {section.items.map((step, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-4 pl-6 pr-6 rounded-xl shadow-lg flex items-center justify-between transition-all duration-300 hover:scale-[1.02]`}
                  style={{
                    marginLeft: step.x || "0rem",
                    width: step.width || "90%",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-semibold">
                      {step.title}
                    </span>
                    {step.badge && (
                      <span className="text-pink-200 text-sm mt-1">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-white text-2xl font-light">+</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPath;
