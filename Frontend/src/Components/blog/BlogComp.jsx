import React from 'react';
import FilterSideBar from './FilterSideBar';
import { useBlogFilters } from '../../context/BlogFilterContext';

const BlogComp = ({ onCardClick }) => {
    const {
        filteredBlogs,
        isMobileMenuOpen,
        toggleMobileMenu,
    } = useBlogFilters();

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* FilterSideBar */}
            <FilterSideBar />
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
    {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
            <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden transform hover:-translate-y-1"
                onClick={() => onCardClick(blog._id)}
            >
                <div className="relative">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-56 object-cover rounded-t-2xl" 
                        top rounded corners
                    />
                    {blog.category && (
                        <span className="absolute top-3 left-3 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            {blog.category}
                        </span>
                    )}
                </div>

                <div className="p-5 flex flex-col justify-between"> 
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                            {blog.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {blog.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-sm mt-4"> 
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-orange-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{blog.read_time_minutes ? `${blog.read_time_minutes} Mins Read` : 'N/A Mins Read'}</span>
                        </div>
                        {/* "Read More" */}
                        <button className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors duration-200 shadow-md">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p className="text-gray-700 text-lg col-span-full text-center py-10">No blogs found matching your filters.</p>
    )}
</div>
            </main>
        </div>
    );
};

export default BlogComp;