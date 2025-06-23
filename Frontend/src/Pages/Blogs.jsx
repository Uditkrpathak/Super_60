import React, { useState } from 'react';
import BlogComp from '../Components/blog/BlogComp'
import CardDetail from '../Components/blog/CardDetail';
import BlogData from '../assets/data/blogData';
import { BlogFilterProvider } from '../context/BlogFilterContext';
import HeroSection from '../Components/hero/HeroSection';

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
        <div>
            <HeroSection heading1={'More Than a Community'} heading2={'The Super 60'} subHeading={'An elite circle of creators, coders, and changemakers shaping the future together.'} badge={'CheckEvents Now'} />

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
        </div>

    );
};


export default Blogs;