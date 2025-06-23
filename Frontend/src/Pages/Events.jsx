import { useState } from "react";
import EventCards from "../Components/EventCards/EventCards";
import HeroSection from "../Components/hero/HeroSection";
import HeroBg from "../Components/hero/backgrounds/herobg";

// Dummy data
const dummyData = [
  {
    title: "UI/UX Trends",
    type: "Webinar",
    month: "October",
    year: "2023",
    description: "Explore the latest in design trends.",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de",
    status: "completed"
  },
  {
    title: "TechVerse Live",
    type: "Workshop",
    month: "April",
    year: "2025",
    description: "Live workshop on tech innovations.",
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99",
    status: "ongoing"
  },
  {
    title: "Hackfinity",
    type: "Hackathon",
    month: "December",
    year: "2023",
    description: "Endless innovation starts here.",
    image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28",
    status: "completed"
  },
  {
    title: "Cloudflare Deep Dive",
    type: "Webinar",
    month: "November",
    year: "2025",
    description: "Optimize web performance with Cloudflare.",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de",
    status: "upcoming"
  },
  {
    title: "DevOps Lab",
    type: "Workshop",
    month: "September",
    year: "2024",
    description: "CI/CD in practice.",
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99",
    status: "ongoing"
  },
  {
    title: "WebExpo",
    type: "Webinar",
    month: "May",
    year: "2023",
    description: "Explore web tech landscape.",
    image: "https://images.unsplash.com/photo-1545243424-0ce743321e11",
    status: "completed"
  },
  {
    title: "Data Science Lab",
    type: "Workshop",
    month: "October",
    year: "2025",
    description: "Get hands-on with data models.",
    image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28",
    status: "upcoming"
  },
  {
    title: "IoT in Action",
    type: "Webinar",
    month: "June",
    year: "2023",
    description: "Real-world use cases of IoT.",
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99",
    status: "completed"
  },
  {
    title: "Kubernetes Crash Course",
    type: "Workshop",
    month: "July",
    year: "2025",
    description: "Deploy apps at scale.",
    image: "https://images.unsplash.com/photo-1545243424-0ce743321e11",
    status: "ongoing"
  },
  {
    title: "Blockchain Buzz",
    type: "Webinar",
    month: "March",
    year: "2024",
    description: "The future of decentralized apps.",
    image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28",
    status: "upcoming"
  },
  {
    title: "JavaScript Jam",
    type: "Hackathon",
    month: "February",
    year: "2023",
    description: "Test your JS superpowers.",
    image: "https://images.unsplash.com/photo-1533903345306-15d1c30952de",
    status: "completed"
  },
  {
    title: "Serverless Bootcamp",
    type: "Workshop",
    month: "September",
    year: "2025",
    description: "Serverless architecture explained.",
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99",
    status: "ongoing"
  }
];


const Events = () => {

  const [filterEvent, setFilterEvent] = useState({
    name: '',
    type: 'All',
    month: 'All',
    year: 'All',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterEvent(prev => ({ ...prev, [name]: value }));
  };

  const filteredEvents = dummyData.filter(event => {
    const nameMatch = event.title.toLowerCase().includes(filterEvent.name.toLowerCase());
    const typeMatch = filterEvent.type === "All" || event.type === filterEvent.type;
    const monthMatch = filterEvent.month === "All" || event.month === filterEvent.month;
    const yearMatch = filterEvent.year === "All" || event.year === filterEvent.year;
    return nameMatch && typeMatch && monthMatch && yearMatch;
  });

  const categorized = {
    upcoming: filteredEvents.filter(e => e.status === "upcoming"),
    ongoing: filteredEvents.filter(e => e.status === "ongoing"),
    completed: filteredEvents.filter(e => e.status === "completed"),
  };

  const renderSection = (title, data) => data.length > 0 && (
    <div className="my-16">
      <h2 className="mb-4 text-2xl font-semibold text-center">{title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.map((card, idx) => <EventCards card={card} key={idx} />)}
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      
      <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />


      <div className="max-w-screen-xl mx-auto px-4 md:px-12 py-8">
        {/* Filter Controls */}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:gap-6">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              name="name"
              value={filterEvent.name}
              onChange={handleChange}
              id="event-name"
              className="w-full h-12 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600"
              placeholder="Event Name"
            />
            <label
              htmlFor="event-name"
              className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-600 cursor-text"
            >
              Search by Event Name
            </label>
          </div>

          <select name="type" value={filterEvent.type} onChange={handleChange} className="w-full px-4 py-2 border rounded md:w-48">
            <option value="All">All Types</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
          </select>

          <select name="month" value={filterEvent.month} onChange={handleChange} className="w-full px-4 py-2 border rounded md:w-48">
            <option value="All">All Months</option>
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
              <option value={month} key={month}>{month}</option>
            ))}
          </select>

          <select name="year" value={filterEvent.year} onChange={handleChange} className="w-full px-4 py-2 border rounded md:w-40">
            <option value="All">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>


        {/* Event Counter */}
        <div className="flex flex-col justify-center gap-4 mt-6 text-center sm:flex-row">
          <div className="px-4 py-2 text-green-800 bg-green-100 rounded shadow">
            Upcoming: {dummyData.filter((e) => e.status === "upcoming").length}
          </div>
          <div className="px-4 py-2 text-blue-800 bg-blue-100 rounded shadow">
            Ongoing: {dummyData.filter((e) => e.status === "ongoing").length}
          </div>
          <div className="px-4 py-2 text-red-800 bg-red-100 rounded shadow">
            Completed: {dummyData.filter((e) => e.status === "completed").length}
          </div>
        </div>

        {/* Filtered Events */}
        <div className="mt-10">
          {filteredEvents.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">No matching events found.</p>
          ) : (
            <>
              {renderSection("Upcoming Events", categorized.upcoming)}
              {renderSection("Ongoing Events", categorized.ongoing)}
              {renderSection("Completed Events", categorized.completed)}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Events;
