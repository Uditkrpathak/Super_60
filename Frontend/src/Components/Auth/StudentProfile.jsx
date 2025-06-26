import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaUserTag } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';
import StudentEditContext from '../../context/StudentEditContext';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const { studentProfile, setStudentProfile } = useContext(StudentEditContext);

  useEffect(()=>{

    const token = localStorage.getItem('token');

    const fetchUser=async()=>{
      try {
        const res = await axios.get(`${BACKEND_URL}/student/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data)
        setStudentProfile(res.data)
      } catch (err) {
        console.log(err)
      }
    }

   fetchUser();
  },[]);

  const navigate = useNavigate();
  const editHandler=()=>{
    navigate('/editstudentprofile');
  }

  return (
    <div className="min-h-screen px-4 py-12 mt-20 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="items-center gap-10 p-8 bg-white shadow-md rounded-2xl md:flex">
          {/* Profile Avatar */}
          <div className="flex justify-center md:block">
            {studentProfile && <img src={studentProfile.image} />}
          </div>

          {/* User Details */}
          <div className="flex-1 mt-6 md:mt-0">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'} 👋</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <p><strong>Email:</strong> {user?.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <FaUserTag className="text-green-500" />
                <p><strong>Role:</strong> {user?.role}</p>
              </div>

              {studentProfile && (<div className='flex flex-col'>
                <div>{studentProfile.email}</div>
                <div>{studentProfile.batch}</div>
                <div>{studentProfile.achievements}</div>
                <div>{studentProfile.branch}</div>
                <div>{studentProfile.name}</div>
              </div>)}

              <button onClick={editHandler} className='bg-blue-500 px-3 py-2 rounded-2xl text-white'>
                Edit profile
              </button>

              {/* You can add more user-specific details here */}
              {/* Example: Batch, Joined On, etc. */}
              {/* <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-purple-500" />
                <p><strong>Joined:</strong> January 2024</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;



// import { useContext, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import AuthContext from '../../context/AuthContext';
// import StudentEditContext from '../../context/StudentEditContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BACKEND_URL from '../../utils/axiosConfig';

// import {
//   FaGraduationCap,
//   FaIdCard,
//   FaCalendarAlt,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaShareAlt,
//   FaLinkedin,
//   FaInstagram,
//   FaWhatsapp,
//   FaLink 
// } from 'react-icons/fa';

// const StudentProfile = () => {
//   const { user } = useContext(AuthContext);
//   const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/student/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(res.data);
//         setStudentProfile(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchUser();
//   }, []);

//   const editHandler = () => {
//     navigate('/editstudentprofile');
//   };


//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
//   };

//   const skillTagVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 mt-20 flex justify-center items-start pt-20 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative overflow-hidden"
//         variants={cardVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {/* Grid Patterns */}
//         <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 opacity-20 transform translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none hidden md:block"></div>
//         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 opacity-20 transform -translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none hidden md:block"></div>

//         {/* Left Section */}
//         <motion.div
//           className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left border-r md:border-r-2 border-gray-100 pr-8"
//           variants={itemVariants}
//         >
//           <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 mb-4 shadow-md">
//             <img
//               src={studentProfile?.profileImage || "https://via.placeholder.com/128/0A2277/FFFFFF?text=DG"}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//             <motion.button
//               className="absolute bottom-0 right-0 bg-white rounded-full p-2 text-blue-900 shadow-md transform translate-x-1/4 translate-y-1/4"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               title="Share Profile"
//             >
//               <FaShareAlt />
//             </motion.button>
//           </div>
//           <p className="text-sm font-semibold text-gray-600 mb-1">MEMBER <span className="text-green-500">active</span></p>
//           <h3 className="text-2xl font-bold text-gray-800">{studentProfile?.name || 'Dhoni Gupta'}</h3>
//           <div className="flex space-x-3 mt-3">
//             <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Fiverr">
//               <FaLink className="w-6 h-6 text-green-500" /> 
//             </motion.a>
//             <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="LinkedIn">
//               <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
//             </motion.a>
//             <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Instagram">
//               <FaInstagram className="w-6 h-6 text-[#E4405F]" />
//             </motion.a>
//             <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="WhatsApp">
//               <FaWhatsapp className="w-6 h-6 text-[#25D366]" /> 
//             </motion.a>
//           </div>
//         </motion.div>

//         {/* Middle Section */}
//         <div className="col-span-1 md:col-span-1 grid grid-cols-1 gap-y-6 md:gap-y-4 pt-4 md:pt-0 pb-4 md:pb-0">
//           <motion.div className="flex items-center space-x-3" variants={itemVariants}>
//             <FaGraduationCap className="text-blue-900 text-xl" />
//             <div>
//               <p className="text-gray-600 text-sm">Course:</p>
//               <p className="font-semibold text-gray-800">{studentProfile?.branch || 'B. Tech CSE'}</p>
//             </div>
//           </motion.div>
//           <motion.div className="flex items-center space-x-3" variants={itemVariants}>
//             <FaIdCard className="text-blue-900 text-xl" />
//             <div>
//               <p className="text-gray-600 text-sm">Admission No:</p>
//               <p className="font-semibold text-gray-800">{studentProfile?.admissionNo || '2023BTCS179'}</p>
//             </div>
//           </motion.div>
//           <motion.div className="flex items-center space-x-3" variants={itemVariants}>
//             <FaGraduationCap className="text-blue-900 text-xl" />
//             <div>
//               <p className="text-gray-600 text-sm">Placement:</p>
//               <p className="font-semibold text-gray-800">{studentProfile?.placementStatus || 'Not Placed'}</p>
//             </div>
//           </motion.div>
//           {/* Contact Information */}
//           <motion.div className="border-t pt-6 mt-6 md:mt-4 md:pt-4" variants={itemVariants}>
//             <h4 className="text-md font-bold text-gray-800 mb-3">Contact Information</h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-2">
//                 <FaEnvelope className="text-gray-600" />
//                 <p className="text-gray-700">{studentProfile?.email || 'user98@gmail.com'}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FaPhone className="text-gray-600" />
//                 <p className="text-gray-700">{studentProfile?.contactNo || '123-(456)-789'}</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FaMapMarkerAlt className="text-gray-600" />
//                 <p className="text-gray-700">{studentProfile?.address || 'SVIET | Banur, Punjab'}</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Right Section */}
//         <div className="col-span-1 flex flex-col items-center md:items-end text-center md:text-right space-y-6 md:space-y-8 pl-8 border-l md:border-l-2 border-gray-100">
//           <motion.div className="flex flex-col items-center md:items-end space-y-2" variants={itemVariants}>
//             <div className="flex items-center space-x-2">
//               <span className="text-blue-900 text-2xl font-bold">TJ</span>
//               <div>
//                 <p className="text-gray-600 text-sm">Batch:</p>
//                 <p className="font-semibold text-gray-800">{studentProfile?.batch || 'Super 60 6.0'}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2 mt-2">
//               <FaCalendarAlt className="text-gray-600 text-lg" />
//               <div>
//                 <p className="text-gray-600 text-sm">Joined:</p>
//                 <p className="font-semibold text-gray-800">{studentProfile?.joinedDate || 'jan 01, 2004'}</p>
//               </div>
//             </div>
//           </motion.div>
//           <motion.button
//             onClick={editHandler}
//             className="flex items-center px-6 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FaLink className="mr-2" />
//             Edit Profile
//           </motion.button>
//           <motion.div className="w-full text-left" variants={itemVariants}>
//             <div className="flex justify-between items-center mb-3">
//               <h4 className="text-md font-bold text-gray-800">Top Skills</h4>
//               <motion.button
//                 className="text-gray-600 hover:text-gray-800"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <FaLink className="text-sm" />
//               </motion.button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {(studentProfile?.skills || ['html', 'CSS', 'reactjs', 'AdobePhotoshop', 'Canva']).map((skill, index) => (
//                 <motion.span
//                   key={index}
//                   className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
//                   variants={skillTagVariants}
//                 >
//                   {skill}
//                 </motion.span>
//               ))}
//               {studentProfile?.skills && studentProfile.skills.length > 5 && (
//                 <motion.span
//                   className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
//                   variants={skillTagVariants}
//                 >
//                   +{studentProfile.skills.length - 5} more
//                 </motion.span>
//               )}
//               {!studentProfile?.skills && (
//                 <motion.span
//                   className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
//                   variants={skillTagVariants}
//                 >
//                   +8 more
//                 </motion.span>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default StudentProfile;