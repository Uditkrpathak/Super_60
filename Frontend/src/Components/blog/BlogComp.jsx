import { useState } from 'react'
import FilterSideBar from './filterSideBar';

const blogCard = [
  {
    "id": "1",
    "title": "Getting Started with React: A Beginner's Guide",
    "description": "Learn the basics of React, including components, state management, and hooks, to build powerful web applications.",
    "category": "React",
    "read_time_minutes": 5,
    "image_url": "https://imgs.search.brave.com/V3r2IJilR8nNLxaPPNwJpfndaAAvKDx1zz_3iJJ2eCc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5saWNkbi5jb20v/ZG1zL2ltYWdlL0Q1/NjEyQVFGR3dwSzQ4/SjNubFEvYXJ0aWNs/ZS1jb3Zlcl9pbWFn/ZS1zaHJpbmtfNjAw/XzIwMDAvMC8xNjgz/NDk0NzYxNjI4P2U9/MjE0NzQ4MzY0NyZ2/PWJldGEmdD05bk1Z/ZVdwWG5CaGZ5R3JT/Y19wQ2U5UDJheU9W/dFZMbWZKZUhNVFNQ/MkpJ"
  },
  {
    "id": "2",
    "title": "Building RESTful APIs with Node.js and Express",
    "description": "Explore how to design, develop, and secure RESTful APIs using Node.js, Express, and MongoDB for scalable backend services.",
    "category": "Node.js",
    "read_time_minutes": 8,
    "image_url": "https://imgs.search.brave.com/liB_0v4pUGd7KJQVeBAzF7zNaQZOoWcvtFws5Z3yH0s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZWVrc2Zvcmdl/ZWtzLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNDA4MjEx/MjE3NTMvcmVzdGZ1/bC1BUElzLndlYnA"
  },
  {
    "id": "3",
    "title": "Mobile App Development with React Native: A Deep Dive",
    "description": "Learn to build cross-platform mobile applications using React Native, covering UI components, navigation, and API integration.",
    "category": "App Development",
    "read_time_minutes": 12,
    "image_url": "https://imgs.search.brave.com/7ME5OccytdOzAuDIs_HuXojiiT2Vg4BkeukP0L9ujnc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHJl/YW0tYmxvZy12Mi5p/bWdpeC5uZXQvYmxv/Zy93cC1jb250ZW50/L3VwbG9hZHMvZmYz/OGEwYTg4Y2E2OGQ4/NDE5NGZkYWQ3MTE2/OWZlNzcvQnVpbGRp/bmctWW91ci1GaXJz/dC1SZWFjdC1pT1NB/bmRyb2lkLTEyMDB4/NjMwcHguanBnP2F1/dG89Zm9ybWF0JmF1/dG89Y29tcHJlc3M"
  },
  {
    "id": "4",
    "title": "Optimizing Node.js Performance: Tips and Tricks",
    "description": "Discover advanced techniques to improve the performance and scalability of your Node.js applications, including clustering, caching, and async operations.",
    "category": "Node.js",
    "read_time_minutes": 9,
    "image_url": "https://imgs.search.brave.com/WJabO4pgz9CVuujiXNC-kiXNg-PTMcwaXZVZv18Lnu0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuYmFjYW5jeXRl/Y2hub2xvZ3kuY29t/L2Jsb2cvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMTAvMTcx/MTEwMTcvVGh1bWJu/YWlsLWltYWdlLTIu/anBn"
  },
  {
    "id": "5",
    "title": "Building Progressive Web Apps (PWAs) with React",
    "description": "Convert your React web applications into installable PWAs, offering offline capabilities, push notifications, and improved performance.",
    "category": "React",
    "read_time_minutes": 7,
    "image_url": "https://imgs.search.brave.com/fajbRiLydt3tTfpkQSbidE0nFrkHdHxyzr91w2EX6eY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZGxj/Y29ycC13ZWItcHJv/ZC5ibHIxLmRpZ2l0/YWxvY2VhbnNwYWNl/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMTIvMTcy/MDAzNDEvQ3JlYXRp/bmctRmFzdC1SZWxp/YWJsZS1Qcm9ncmVz/c2l2ZS1XZWItQXBw/cy1QV0FzLXdpdGgt/UmVhY3Qud2VicA"
  },
  {
    "id": "6",
    "title": "Native iOS/Android App Development: Swift, Kotlin, and Beyond",
    "description": "Explore the world of native mobile development using Swift for iOS and Kotlin for Android, understanding their unique strengths and use cases.",
    "category": "App Development",
    "read_time_minutes": 15,
    "image_url": "https://imgs.search.brave.com/DT8cvjgnjFjjh3dNkpRF65DHhj8sb3J4xcHP70xbfZk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2ltcGxpbGVhcm4u/Y29tL2ljZTkvZnJl/ZV9yZXNvdXJjZXNf/YXJ0aWNsZV90aHVt/Yi9Ta2lsbHNfUmVx/dWlyZWRfdG9fQmVj/b21lX2FuX2lPU19E/ZXZlbG9wZXIuanBn"
  }
]


const BlogComp = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
  };

  const filteredCards = blogCard.filter((card) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(card.category);
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
     <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <FilterSideBar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <main className="flex-1 p-6 lg:ml-0 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl leading-tight font-bold text-gray-700">Latest Blogs</h1>
          <div className="lg:hidden"> 
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center">
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <span className="text-lg font-medium text-gray-700">Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div key={card.id} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
                <img src={card.image_url} alt={card.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-2">
                    {card.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm mb-4">
                    {card.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4 mr-1 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{card.read_time_minutes} Mins Read</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg col-span-full text-center py-10">No blogs found matching your filters.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogComp;