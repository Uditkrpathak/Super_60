// import { createContext, useState, useContext, useMemo } from 'react';
// import BlogData from '../assets/data/blogData'; 

// const BlogFilterContext = createContext();

// export const BlogFilterProvider = ({ children }) => {
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const availableCategories = useMemo(() => {
//         return [...new Set(BlogData.map(blog => blog.category))];
//     }, [BlogData]);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     const handleCategoryChange = (category) => {
//         setSelectedCategories((prevCategories) =>
//             prevCategories.includes(category)
//                 ? prevCategories.filter((cat) => cat !== category)
//                 : [...prevCategories, category]
//         );
//     };

//     const handleSearchChange = (term) => {
//         setSearchTerm(term);
//     };

//     const handleClearFilters = () => {
//         setSelectedCategories([]);
//         setSearchTerm('');
//     };

//     const filteredBlogs = useMemo(() => {
//         return BlogData.filter((blog) => {
//             const matchesCategory =
//                 selectedCategories.length === 0 || selectedCategories.includes(blog.category);
//             const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                   blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesCategory && matchesSearch;
//         });
//     }, [selectedCategories, searchTerm, BlogData]);

//     const contextValue = {
//         filteredBlogs,
//         selectedCategories,
//         searchTerm,
//         isMobileMenuOpen,
//         availableCategories,
//         toggleMobileMenu,
//         handleCategoryChange,
//         handleSearchChange,
//         handleClearFilters,
//     };

//     return (
//         <BlogFilterContext.Provider value={contextValue}>
//             {children}
//         </BlogFilterContext.Provider>
//     );
// };
// export const useBlogFilters = () => {
//     const context = useContext(BlogFilterContext);
//     if (context === undefined) {
//         throw new Error('useBlogFilters must be used within a BlogFilterProvider');
//     }
//     return context;
// };

import { createContext, useState, useContext, useMemo } from 'react'; 

const BlogFilterContext = createContext();

// Accept 'blogs' prop from parent component (Blogs.jsx)
export const BlogFilterProvider = ({ children, blogs }) => { // Added 'blogs' prop
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Use the 'blogs' prop instead of static BlogData
    const availableCategories = useMemo(() => {
        return [...new Set(blogs.map(blog => blog.category))].filter(Boolean); // Filter out any empty/null categories
    }, [blogs]);

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

    // Filter 'blogs' prop instead of static BlogData
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(blog.category);
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  blog.description?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategories, searchTerm, blogs]); // Depend on 'blogs' prop

    const contextValue = {
        filteredBlogs,
        selectedCategories,
        searchTerm,
        isMobileMenuOpen,
        availableCategories,
        toggleMobileMenu,
        handleCategoryChange,
        handleSearchChange,
        handleClearFilters,
    };

    return (
        <BlogFilterContext.Provider value={contextValue}>
            {children}
        </BlogFilterContext.Provider>
    );
};

export const useBlogFilters = () => {
    const context = useContext(BlogFilterContext);
    if (context === undefined) {
        throw new Error('useBlogFilters must be used within a BlogFilterProvider');
    }
    return context;
};