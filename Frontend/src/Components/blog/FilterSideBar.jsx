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
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:w-auto lg:min-w-[200px]`}
      >
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
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

        <h2 className="hidden lg:block text-xl font-semibold text-gray-800 mb-6">Filters</h2>

        <div className="mb-6">
          <label htmlFor="search" className="sr-only">Search blogs...</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-3">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  name="category"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4
                             text-orange-600 border-gray-300 rounded
                             focus:ring-orange-900 cursor-pointer
                             hover:border-blue-900
                             hover:text-blue-300
                             transition-colors duration-200"
                />
                <label htmlFor={category} className="ml-3 text-gray-600 font-medium text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="w-full py-2 px-4 border border-blue-900 rounded-md shadow-sm text-sm font-medium text-blue-900 hover:border-blue-800 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      </aside>
    </>
  );
};

export default FilterSideBar;