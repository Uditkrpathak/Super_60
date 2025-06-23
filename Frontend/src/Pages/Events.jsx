import { useState } from "react";
import EventCard from "../Components/EventCard";

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

  return (
    <div className="mt-32 px-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 items-center justify-center">

          {/* Text Label Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              name="name"
              value={filterEvent.name}
              onChange={handleChange}
              id="event-name"
              className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
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

          {/* Type Filter */}
          <select
            name="type"
            value={filterEvent.type}
            onChange={handleChange}
            className="w-full md:w-48 border px-4 py-2 rounded"
          >
            <option value="All">All Types</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
          </select>

          {/* Month Filter */}
          <select
            name="month"
            value={filterEvent.month}
            onChange={handleChange}
            className="w-full md:w-48 border px-4 py-2 rounded"
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          {/* Year Filter */}
          <select
            name="year"
            value={filterEvent.year}
            onChange={handleChange}
            className="w-full md:w-40 border px-4 py-2 rounded"
          >
            <option value="All">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {/* Debug Output */}
        <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
          <pre>{JSON.stringify(filterEvent, null, 2)}</pre>
          <EventCard/>
        </div>
      </div>
    </div>
  );
};

export default Events;
