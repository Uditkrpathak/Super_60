// import { useState } from 'react';
// import BlogComp from '../Components/blog/BlogComp'
// import CardDetail from '../Components/blog/CardDetail';
// import BlogData from '../assets/data/blogData';
// import { BlogFilterProvider } from '../context/BlogFilterContext';
// import HeroSection from '../Components/hero/HeroSection';
// import JoinUs from '../Components/JoinUs/JoinUs';
// import { useEffect } from 'react';
// import axios from 'axios';
// import BACKEND_URL from '../utils/axiosConfig';

// const Blogs = () => {

//     const [allBlogs,setAllBlogs] = useState([]);

//     useEffect(()=>{
//         const token = localStorage.getItem("token");

//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(`${BACKEND_URL}/blog`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                   });
//                 console.log(res.data);
//                 setAllBlogs(res.data);
//             } catch (err) {
//                 console.error("Error fetching blogs:", err.message);
//             }
//           };

//         fetchData();
//     },[]);

//     const [selectedBlogId, setSelectedBlogId] = useState(null);

//     const handleCardClick = (id) => {
//         setSelectedBlogId(id);
//         document.body.style.overflow = 'hidden';
//     };

//     const handleCloseBlogDetail = () => {
//         setSelectedBlogId(null);
//         document.body.style.overflow = 'unset';
//     };

//     const selectedBlogData = BlogData.find(blog => blog.id === selectedBlogId);

//     return (
//         <>
//             <HeroSection
//                 heading1={"Dive Into Knowledge"} 
//                 heading2={"The Super 60 Blog"} 
//                 subHeading={"An elite circle of creators, coders, and changemakers sharing insights, innovations, and the journey shaping the future together."} 
//                 badge={"Explore Articles"}
//                 badgeLink={"#latest-articles"}
//             />

//             <BlogFilterProvider>
//                 <div className='container mt-32'>
//                     {/* BlogComp */}
//                     <BlogComp onCardClick={handleCardClick} />
//                 </div>

//                 {/*BlogComponent*/}
//                 {selectedBlogId && (
//                     <CardDetail blogData={selectedBlogData} onClose={handleCloseBlogDetail} />
//                 )}
//             </BlogFilterProvider>

//         <div className='mt-10'>
//                     <JoinUs />
//             </div>
//         </>

//     );
// };


// export default Blogs;


import { useState, useEffect } from 'react';
import BlogComp from '../Components/blog/BlogComp';
import CardDetail from '../Components/blog/CardDetail';
// Remove BlogData import as we will fetch it from backend
// import BlogData from '../assets/data/blogData';
import { BlogFilterProvider } from '../context/BlogFilterContext';
import HeroSection from '../Components/hero/HeroSection';
import JoinUs from '../Components/JoinUs/JoinUs';
import axios from 'axios';
import BACKEND_URL from '../utils/axiosConfig';

const Blogs = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true); // New loading state
    const [errorBlogs, setErrorBlogs] = useState(null); // New error state

    useEffect(() => {
        // Token might not be needed for public blog view, but keeping it as per your backend router setup
        // const token = localStorage.getItem("token"); 

        const fetchData = async () => {
            setLoadingBlogs(true);
            setErrorBlogs(null);
            try {
                // Assuming blog fetching is public and doesn't require a token for GET,
                // if it does, uncomment the headers part
                const res = await axios.get(`${BACKEND_URL}/blog`, {
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                });
                setAllBlogs(res.data);
            } catch (err) {
                console.error("Error fetching blogs:", err.message);
                setErrorBlogs("Failed to load blogs. Please try again later.");
            } finally {
                setLoadingBlogs(false);
            }
        };

        fetchData();
    }, []);

    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const handleCardClick = (id) => {
        setSelectedBlogId(id);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseBlogDetail = () => {
        setSelectedBlogId(null);
        document.body.style.overflow = 'unset';
    };

    // Find the selected blog from the fetched allBlogs array
    const selectedBlogData = allBlogs.find(blog => blog._id === selectedBlogId); // Use _id from Mongoose

    if (loadingBlogs) {
        return <div className="text-center py-20 text-xl text-gray-700">Loading blogs...</div>;
    }

    if (errorBlogs) {
        return <div className="text-center py-20 text-xl text-red-600">{errorBlogs}</div>;
    }

    return (
        <>
            <HeroSection
                heading1={"Dive Into Knowledge"}
                heading2={"The Super 60 Blog"}
                subHeading={"An elite circle of creators, coders, and changemakers sharing insights, innovations, and the journey shaping the future together."}
                badge={"Explore Articles"}
                badgeLink={"#latest-articles"}
            />

            {/* Pass allBlogs to BlogFilterProvider */}
            <BlogFilterProvider blogs={allBlogs}>
                <div className='container mt-32'>
                    <BlogComp onCardClick={handleCardClick} />
                </div>

                {selectedBlogId && (
                    // Pass selectedBlogData directly from the fetched data
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