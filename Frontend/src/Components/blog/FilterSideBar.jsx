import React from 'react';
import { useBlogFilters } from '../../context/BlogFilterContext';

const FilterSideBar = () => {
  const {
    selectedCategories,
    searchTerm,
    isMobileMenuOpen,
    availableCategories,
    toggleMobileMenu,
    handleCategoryChange,
    handleSearchChange,
    handleClearFilters,
  } = useBlogFilters();

  return (
    <>
    {isMobileMenuOpen && (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
        ></div>
    )}

    <aside
        className={`fixed inset-y-0 left-0 top-[89px] lg:top-0 bg-white p-6 shadow-lg z-50 w-64 transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-auto lg:min-w-[250px] rounded-lg lg:rounded-none`}
    >
        {/* Close button for mobile */}
        <div className="flex justify-end items-center mb-6 lg:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-full hover:bg-gray-100">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        {/* Search Input */}
        <div className="mb-8">
            <label htmlFor="search" className="sr-only">Search blogs...</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    id="search"
                    placeholder="Search blogs..."
                    className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-500 text-sm font-medium"
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>
        </div>

        {/* Categories */}
        <div className="space-y-2 mb-8">
    <h3 className="text-gray-900 font-semibold uppercase tracking-wide text-xs mb-4 ml-2">Categories</h3>
    {availableCategories.map((category) => (
        <label
            key={category}
            htmlFor={`checkbox-${category}`}
            className={`flex items-center p-3 rounded-xl transition-colors duration-200 cursor-pointer ${
                selectedCategories.includes(category) ? 'bg-blue-100 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
            <svg className={`w-5 h-5 mr-3 ${selectedCategories.includes(category) ? 'text-blue-900' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0015.586 6H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path>
            </svg>
            <span className="font-medium text-sm flex-grow">
                {category}
            </span>
            <input
                type="checkbox" 
                id={`checkbox-${category}`} 
                name="category"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-900 border-gray-300 focus:ring-blue-900 cursor-pointer ml-auto"
            />
        </label>
    ))}
</div>

        {/* Clear Filters Button */}
        <div className="p-4 bg-gray-100 rounded-xl text-center">
            <button
                onClick={handleClearFilters}
                className="w-full flex items-center justify-center py-3 px-4 bg-blue-900 text-white rounded-xl shadow-md text-base font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition-colors duration-200"
            >
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"></path>
                </svg>
                Clear Filters
            </button>
        </div>
    </aside>
</>
  );
};

export default FilterSideBar;