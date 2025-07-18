import TeamMemberCard from "./TeamMemberCard";

const teamMembers = [
  {
    name: "John Smith",
    position: "Project Manager",
    quote: "Success is a team effort, and I'm proud to be part of this incredible team.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
  },
  {
    name: "Michael Thompson",
    position: "Marketing Specialist",
    quote: "I believe in the power of storytelling to connect brands with their audience.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
  },
  {
    name: "Jessica Lee",
    position: "Sales Manager",
    quote: "Building strong relationships with clients is at the heart of my approach to sales.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
  },
  {
    name: "Mark Johnson",
    position: "Software Engineer",
    quote: "I believe in pushing the boundaries of technology to create innovative solutions for our users.",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400",
  },
  {
    name: "Michael Thompson",
    position: "Graphic Designer",
    quote: "Design is all about finding beauty in simplicity, and I love bringing ideas to life.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400",
  },
  {
    name: "David Wilson",
    position: "Junior Developer",
    quote: "Coding is my passion, and I'm excited to contribute my skills to this project.",
    image: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=400",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 text-gray-300 bg-blue-800">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-center text-white md:text-4xl">
          Meet the Team
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <li key={index}>
              <TeamMemberCard {...member} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
