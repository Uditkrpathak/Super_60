// import React from 'react';
// import { useContext } from 'react';
// import { IoMdClose } from "react-icons/io";
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios';
// import BACKEND_URL from '../../utils/axiosConfig';
// import BlogEditContext from '../../context/BlogEditContext';
// import { useNavigate } from 'react-router-dom';

// const CardDetail = ({ blogData, onClose }) => {

//   const {isAdmin} = useContext(AuthContext);
//   const { setBlogData } = useContext(BlogEditContext);


//   if (!blogData) {
//     return (
//       <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4'>
//         <div className='bg-white p-6 rounded-lg shadow-xl text-center'>
//           <p className='text-gray-600 mb-4'>Blog data not found or still loading...</p>
//           <button onClick={onClose} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
//             Back to Blogs
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const navigate = useNavigate();

//   const editHandler =()=>{
//     setBlogData(blogData);
//     navigate('/addBlog');
//   }

//   const deleteHandler =async()=>{

//     const token = localStorage.getItem('token');

//     const res = await axios.delete(`${BACKEND_URL}/blog/${blogData._id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
    
//   }

//   return (
//     <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-start justify-center z-50 p-4 overflow-y-auto'>
//       {/* blog content */}
//       <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto my-8 p-6 relative'>
//         <div className='flex justify-between items-center mb-6'>
//           <h1 className='text-3xl font-bold text-gray-800'>{blogData.title}</h1>
//           <button onClick={onClose} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
//             <IoMdClose className='text-3xl' />
//           </button>
//         </div>

//         <p className='text-gray-600 text-sm mb-3'>
//           <span className='font-semibold text-blue-700'>{blogData.category}</span> •{' '}
//           {blogData.read_time_minutes} mins read
//         </p>

//         <div className='mb-6 flex flex-wrap'>
//           {blogData.tags && blogData.tags.map((tag, index) => (
//             <span
//               key={index}
//               className='text-sm px-3 py-1 m-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors'
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         <img
//           src={blogData.image_url}
//           alt={blogData.title}
//           className='w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-lg'
//         />

//         <div className='space-y-8'>
//           {blogData.faq && blogData.faq.length > 0 && (
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h2>
//           )}
//           {blogData.faq?.map((que, index) => (
//             <div
//               key={index}
//               className='bg-gray-50 border-l-4 border-orange-500 space-y-4 p-6 rounded-md shadow-sm'
//             >
//               <h3 className='text-lg font-semibold mb-1 text-gray-900'>
//                 {que.question}
//               </h3>
//               <p className='text-gray-700'>Ans: {que.answer}</p>
//             </div>
//           ))}
//           {isAdmin && (<div className='flex items-center justify-between'>
//             <button onClick={editHandler} className='px-4 py-2 bg-blue-500 text-white rounded'>Edit this BLog</button>
//             <button onClick={deleteHandler} className='px-4 py-2 bg-red-500 text-white rounded'>Delete this BLog</button>
//           </div>)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardDetail;


import React from 'react';
import { useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import BlogEditContext from '../../context/BlogEditContext';
import { useNavigate } from 'react-router-dom';

const CardDetail = ({ blogData, onClose }) => {

    const { isAdmin } = useContext(AuthContext);
    const { setBlogData } = useContext(BlogEditContext);

    if (!blogData) {
        return (
            <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4'>
                <div className='bg-white p-6 rounded-lg shadow-xl text-center'>
                    <p className='text-gray-600 mb-4'>Blog data not found or still loading...</p>
                    <button onClick={onClose} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
                        Back to Blogs
                    </button>
                </div>
            </div>
        );
    }

    const navigate = useNavigate();

    const editHandler = () => {
        setBlogData(blogData);
        navigate('/addBlog');
    }

    const deleteHandler = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${BACKEND_URL}/blog/${blogData._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Blog deleted successfully!");
            onClose(); // Close the modal
            // You might want to trigger a re-fetch of blogs in the parent component here
            // to update the list after deletion.
            window.location.reload(); // Simple reload for now, consider a more elegant state update
        } catch (error) {
            console.error("Error deleting blog:", error?.response?.data?.message || error.message);
            alert("Failed to delete blog. Please try again.");
        }
    }

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-start justify-center z-50 p-4 overflow-y-auto'>
            {/* blog content */}
            <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto my-8 p-6 relative'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>{blogData.title}</h1>
                    <button onClick={onClose} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
                        <IoMdClose className='text-3xl' />
                    </button>
                </div>

                <p className='text-gray-600 text-sm mb-3'>
                    <span className='font-semibold text-blue-700'>{blogData.category}</span> 
                </p>

                <div className='mb-6 flex flex-wrap'>
                    {blogData.tags && blogData.tags.map((tag, index) => (
                        <span
                            key={index}
                            className='text-sm px-3 py-1 m-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors'
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <img
                    src={blogData.image} // Changed from blog.image_url to blog.image
                    alt={blogData.title}
                    className='w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-lg'
                />

                <div className='space-y-8'>
                    {/* Description is now the main content */}
                    <div className='text-gray-800 leading-relaxed text-lg'>
                        <p>{blogData.description}</p>
                    </div>

                    {/* Sections from backend */}
                    {blogData.sections && blogData.sections.length > 0 && (
                        <div>
                            {blogData.sections.map((section, index) => (
                                <div key={`section-${index}`} className="mb-6">
                                    {section.heading && (
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{section.heading}</h2>
                                    )}
                                    {section.content && (
                                        <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}


                    {/* FAQ section - if you want this, you'll need to add it to your Mongoose schema */}
                    {/* For now, it won't show unless you add 'faq' field to your backend blog schema */}
                    {blogData.faq && blogData.faq.length > 0 && (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h2>
                            {blogData.faq?.map((que, index) => (
                                <div
                                    key={index}
                                    className='bg-gray-50 border-l-4 border-orange-500 space-y-4 p-6 rounded-md shadow-sm'
                                >
                                    <h3 className='text-lg font-semibold mb-1 text-gray-900'>
                                        {que.question}
                                    </h3>
                                    <p className='text-gray-700'>Ans: {que.answer}</p>
                                </div>
                            ))}
                        </>
                    )}
                    {isAdmin && (<div className='flex items-center justify-between'>
                        <button onClick={editHandler} className='px-4 py-2 bg-blue-500 text-white rounded'>Edit this Blog</button>
                        <button onClick={deleteHandler} className='px-4 py-2 bg-red-500 text-white rounded'>Delete this Blog</button>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default CardDetail;