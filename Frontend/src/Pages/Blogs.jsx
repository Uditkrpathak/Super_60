import React, { useState } from 'react';
import BlogComp from '../Components/blog/BlogComp'
import CardDetail from '../Components/blog/CardDetail';
import BlogData from '../assets/data/blogData';
import { BlogFilterProvider } from '../context/BlogFilterContext';
import HeroSection from '../Components/hero/HeroSection';
import JoinUs from '../Components/JoinUs/JoinUs';
import { useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../utils/axiosConfig';

const Blogs = () => {

    const [allBlogs,setAllBlogs] = useState();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/blog`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                  });
                console.log(res.data);
                setAllBlogs(res.data);
            } catch (err) {
                console.error("Error fetching blogs:", err.message);
            }
          };

        fetchData();
    },[]);

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
        <>
            <HeroSection
                heading1={"Dive Into Knowledge"} 
                heading2={"The Super 60 Blog"} 
                subHeading={"An elite circle of creators, coders, and changemakers sharing insights, innovations, and the journey shaping the future together."} 
                badge={"Explore Articles"}
                badgeLink={"#latest-articles"}
            />

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

        <div className='mt-10'>
                    <JoinUs />
            </div>
        </>

    );
};


export default Blogs;