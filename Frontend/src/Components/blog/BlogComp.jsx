import FilterSideBar from './FilterSideBar';
import { useBlogFilters } from '../../context/BlogFilterContext';

const BlogComp = ({ onCardClick }) => {
    const {
        filteredBlogs,
        isMobileMenuOpen,
        toggleMobileMenu,
        isLoading,
    } = useBlogFilters();

    const formatDate = (isoDate) => {
        try {
            const date = new Date(isoDate);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return 'Invalid date';
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className={`fixed inset-0 z-40 transition-transform duration-300 lg:static lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-64 bg-white shadow-lg lg:shadow-none`}>
                <FilterSideBar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Latest Blogs</h1>
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none flex items-center"
                    >
                        <svg
                            className="w-6 h-6 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="text-lg font-medium">Filters</span>
                    </button>
                </div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">Loading blogs...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <div
                                    key={blog._id}
                                    onClick={() => onCardClick(blog._id)}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
                                >
                                    <div className="relative">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-56 object-cover"
                                        />
                                        {blog.category && (
                                            <span className="absolute top-3 left-3 bg-indigo-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                                {blog.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col space-y-2 h-full">
                                        <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">{formatDate(blog.createdAt)}</p>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {blog.description}
                                        </p>
                                        <div className="flex justify-end pt-2">
                                            <span className="text-sm px-4 py-1 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition">
                                                Read More
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <img
                                    src="https://illustrations.popsy.co/gray/blogging.svg"
                                    alt="No Blogs"
                                    className="w-48 mx-auto mb-4"
                                />
                                <p className="text-gray-600 text-lg">No blogs found matching your filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlogComp;
