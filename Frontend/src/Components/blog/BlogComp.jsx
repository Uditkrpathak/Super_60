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
                                className="bg-white w-full lg:max-w-[330px] cursor-pointer rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
                                onClick={() => onCardClick(blog._id)} 
                            >
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-2">
                                        {blog.category}
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium text-sm mb-4">
                                        {blog.description}
                                    </p>

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