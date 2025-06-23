import React, { useState } from 'react';
import BlogComp from '../Components/blog/BlogComp'
import CardDetail from '../Components/blog/CardDetail'; 
import BlogData from '../assets/data/blogData'; 
import { BlogFilterProvider } from '../context/BlogFilterContext'; 

const Blogs = () => {
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const handleCardClick = (id) => {
        setSelectedBlogId(id);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseBlogDetail = () => {
        setSelectedBlogId(null);
        document.body.style.overflow = 'unset';
    };

    const selectedBlogData = BlogData.find(blog => blog.id === selectedBlogId);

    return (
        <BlogFilterProvider>
            <div className='container mt-32'> 
                {/* BlogComp */}
                <BlogComp onCardClick={handleCardClick} />
            </div>

            {/*BlogComponent*/}
            {selectedBlogId && (
                <CardDetail blogData={selectedBlogData} onClose={handleCloseBlogDetail} />
            )}
        </BlogFilterProvider>
    );
};


export default Blogs;