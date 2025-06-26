// import { useContext } from 'react';
// import AuthContext from '../../context/AuthContext';
// import { FaUserCircle, FaEnvelope, FaUserTag } from 'react-icons/fa';
// import { useEffect } from 'react';
// import axios from 'axios';
// import BACKEND_URL from '../../utils/axiosConfig';
// import StudentEditContext from '../../context/StudentEditContext';
// import { useNavigate } from 'react-router-dom';

// const StudentProfile = () => {
//   const { user } = useContext(AuthContext);
//   const { studentProfile, setStudentProfile } = useContext(StudentEditContext);

//   useEffect(()=>{

//     const token = localStorage.getItem('token');

//     const fetchUser=async()=>{
//       try {
//         const res = await axios.get(`${BACKEND_URL}/student/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(res.data)
//         setStudentProfile(res.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }

//    fetchUser();
//   },[]);

//   const navigate = useNavigate();
//   const editHandler=()=>{
//     navigate('/editstudentprofile');
//   }

//   return (
//     <div className="min-h-screen px-4 py-12 mt-20 bg-gray-100 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="items-center gap-10 p-8 bg-white shadow-md rounded-2xl md:flex">
//           {/* Profile Avatar */}
//           <div className="flex justify-center md:block">
//             {studentProfile && <img src={studentProfile.image} />}
//           </div>

//           {/* User Details */}
//           <div className="flex-1 mt-6 md:mt-0">
//             <h2 className="mb-4 text-3xl font-bold text-gray-800">Welcome, {user?.name || 'User'} 👋</h2>

//             <div className="space-y-4 text-gray-700">
//               <div className="flex items-center gap-3">
//                 <FaEnvelope className="text-blue-500" />
//                 <p><strong>Email:</strong> {user?.email}</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <FaUserTag className="text-green-500" />
//                 <p><strong>Role:</strong> {user?.role}</p>
//               </div>

//               {studentProfile && (<div className='flex flex-col'>
//                 <div>{studentProfile.email}</div>
//                 <div>{studentProfile.batch}</div>
//                 <div>{studentProfile.achievements && Array.isArray(studentProfile.achievements)}</div>
//                 <div>{studentProfile.branch}</div>
//                 <div>{studentProfile.name}</div>
//               </div>)}

//               <button onClick={editHandler} className='bg-blue-500 px-3 py-2 rounded-2xl text-white'>
//                 Edit profile
//               </button>

//               {/* You can add more user-specific details here */}
//               {/* Example: Batch, Joined On, etc. */}
//               {/* <div className="flex items-center gap-3">
//                 <FaCalendarAlt className="text-purple-500" />
//                 <p><strong>Joined:</strong> January 2024</p>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;

import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import StudentEditContext from '../../context/StudentEditContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from '../../utils/axiosConfig';

import {
  FaGraduationCap,
  FaIdCard,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShareAlt,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaLink,
  FaAward, // For Achievements
  FaCertificate, // For Certifications
  FaCode, // For Projects
  FaBriefcase, // For Internships
  FaPlus, // For "Add Semester" etc.
  FaEdit,
  FaChartBar,
  FaEye 
} from 'react-icons/fa';

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
  const navigate = useNavigate();

  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('statistics');

  // Dummy data for other sections (replace with actual fetched data)
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Won National Coding Competition', date: '2024-03-15', description: 'Secured first place in the annual national coding competition organized by Tech Innovations.' },
    { id: 2, title: 'Published Research Paper', date: '2023-11-20', description: 'Co-authored a research paper on AI ethics, published in the International Journal of Computer Science.' },
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, title: 'AWS Certified Cloud Practitioner', issuingBody: 'Amazon Web Services', date: '2024-01-10' },
    { id: 2, title: 'Google Analytics Certification', issuingBody: 'Google', date: '2023-09-01' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: 'E-commerce Platform Development', technologies: 'React, Node.js, MongoDB', description: 'Developed a full-stack e-commerce platform with user authentication and payment gateway integration.' },
    { id: 2, title: 'Machine Learning Model for Predictive Analysis', technologies: 'Python, TensorFlow, Scikit-learn', description: 'Built and trained a machine learning model to predict stock prices with 85% accuracy.' },
  ]);

  const [internships, setInternships] = useState([
    { id: 1, company: 'Infosys', role: 'Software Development Intern', duration: 'May 2024 - Aug 2024', description: 'Worked on front-end development for a client project using Angular and TypeScript.' },
    { id: 2, company: 'TCS', role: 'Data Science Intern', duration: 'Dec 2023 - Feb 2024', description: 'Assisted in data cleaning and analysis, contributing to a report on customer behavior.' },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/student/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setStudentProfile(res.data);
        setAchievements(res.data.achievements || []);
        setCertifications(res.data.certificates || []);
        setProjects(res.data.projects || []);
        setInternships(res.data.internships || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // Handler for all "Add" and "Edit Profile" buttons
  const navigateToEditProfile = () => {
    navigate('/editstudentprofile');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const skillTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20 flex flex-col items-center pt-8 px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs - CHANGED max-w-4xl to max-w-6xl */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-4 mb-8 flex justify-around items-center border-b border-gray-200">
        <TabButton icon={<FaChartBar />} label="Statistics" active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')} />
        <TabButton icon={<FaAward />} label="Achievements" active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
        <TabButton icon={<FaIdCard />} label="Bio" active={activeTab === 'bio'} onClick={() => setActiveTab('bio')} />
        <TabButton icon={<FaCertificate />} label="Certifications" active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} />
        <TabButton icon={<FaCode />} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
        <TabButton icon={<FaBriefcase />} label="Internships" active={activeTab === 'internships'} onClick={() => setActiveTab('internships')} />
      </div>

      <motion.div
        // Main content container - CHANGED max-w-4xl to max-w-6xl
        className="max-w-6xl w-full bg-white shadow-lg rounded-xl p-8 relative overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Grid Patterns (unchanged) */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 opacity-20 transform translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 opacity-20 transform -translate-x-1/2 translate-y-1/2 rounded-full pointer-events-none hidden md:block"></div>

        {/* Dynamic Content based on activeTab */}
        {activeTab === 'statistics' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Section (Profile Image, Social Links) - unchanged */}
            <motion.div
              className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left border-r md:border-r-2 border-gray-100 pr-8"
              variants={itemVariants}
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 mb-4 shadow-md">
                <img
                  src={studentProfile?.profileImage || "https://via.placeholder.com/128/0A2277/FFFFFF?text=DG"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <motion.button
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 text-blue-900 shadow-md transform translate-x-1/4 translate-y-1/4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Share Profile"
                >
                  <FaShareAlt />
                </motion.button>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">MEMBER <span className="text-green-500">active</span></p>
              <h3 className="text-2xl font-bold text-gray-800">{studentProfile?.name || 'Dhoni Gupta'}</h3>
              <div className="flex space-x-3 mt-3">
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Fiverr">
                  <FaLink className="w-6 h-6 text-green-500" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="LinkedIn">
                  <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Instagram">
                  <FaInstagram className="w-6 h-6 text-[#E4405F]" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="WhatsApp">
                  <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                </motion.a>
              </div>
            </motion.div>

            {/* Middle Section (Course, Admission No, Placement, Contact) - unchanged */}
            <div className="col-span-1 md:col-span-1 grid grid-cols-1 gap-y-6 md:gap-y-4 pt-4 md:pt-0 pb-4 md:pb-0">
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaGraduationCap className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">Course:</p>
                  <p className="font-semibold text-gray-800">{studentProfile?.branch || 'B. Tech CSE'}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaIdCard className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">Admission No:</p>
                  <p className="font-semibold text-gray-800">{studentProfile?.admissionNo || '2023BTCS179'}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaGraduationCap className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">Placement:</p>
                  <p className="font-semibold text-gray-800">{studentProfile?.placementStatus || 'Not Placed'}</p>
                </div>
              </motion.div>
              {/* Contact Information */}
              <motion.div className="border-t pt-6 mt-6 md:mt-4 md:pt-4" variants={itemVariants}>
                <h4 className="text-md font-bold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-600" />
                    <p className="text-gray-700">{studentProfile?.email || 'user98@gmail.com'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-gray-600" />
                    <p className="text-gray-700">{studentProfile?.contactNo || '123-(456)-789'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <p className="text-gray-700">{studentProfile?.address || 'SVIET | Banur, Punjab'}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Section (Batch, Joined Date, Edit Profile, Top Skills) - unchanged */}
            <div className="col-span-1 flex flex-col items-center md:items-end text-center md:text-right space-y-6 md:space-y-8 pl-8 border-l md:border-l-2 border-gray-100">
              <motion.div className="flex flex-col items-center md:items-end space-y-2" variants={itemVariants}>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-900 text-2xl font-bold">TJ</span>
                  <div>
                    <p className="text-gray-600 text-sm">Batch:</p>
                    <p className="font-semibold text-gray-800">{studentProfile?.batch || 'Super 60 6.0'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <FaCalendarAlt className="text-gray-600 text-lg" />
                  <div>
                    <p className="text-gray-600 text-sm">Joined:</p>
                    <p className="font-semibold text-gray-800">{studentProfile?.joinedDate || 'jan 01, 2004'}</p>
                  </div>
                </div>
              </motion.div>
              <motion.button
                onClick={navigateToEditProfile} // Use the unified handler
                className="flex items-center px-6 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </motion.button>
              <motion.div className="w-full text-left" variants={itemVariants}>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-bold text-gray-800">Top Skills</h4>
                  <motion.button
                    className="text-gray-600 hover:text-gray-800"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={navigateToEditProfile} // Use the unified handler
                  >
                    <FaEdit className="text-sm" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(studentProfile?.skills || ['html', 'CSS', 'reactjs', 'AdobePhotoshop', 'Canva']).map((skill, index) => (
                    <motion.span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      variants={skillTagVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                  {studentProfile?.skills && studentProfile.skills.length > 5 && (
                    <motion.span
                      className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      variants={skillTagVariants}
                    >
                      +{studentProfile.skills.length - 5} more
                    </motion.span>
                  )}
                  {!studentProfile?.skills && (
                    <motion.span
                      className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      variants={skillTagVariants}
                    >
                      +8 more
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Achievements Section - Redesigned */}
        {activeTab === 'achievements' && (
          <motion.div
            className="w-full p-4 md:p-8" // Added padding for better spacing
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6"> {/* Increased bottom margin */}
              <h3 className="text-2xl font-bold text-gray-800">Achievements 🏆</h3>
              <motion.button
                className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile} // Navigate to edit profile
              >
                <FaPlus className="mr-2" /> Add Achievement
              </motion.button>
            </div>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid layout */}
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full" // Added full height for consistent card size
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Hover effect
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 mb-3 flex items-center"><FaCalendarAlt className="mr-2 text-gray-400"/> {achievement.date}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile} // Navigate to edit profile
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8 text-lg">No achievements added yet. Click "Add Achievement" to get started!</p>
            )}
          </motion.div>
        )}

        {/* Bio Section - Redesigned */}
        {activeTab === 'bio' && (
          <motion.div
            className="w-full p-4 md:p-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Bio 📝</h3>
              <motion.button
                className="text-gray-600 hover:text-blue-900 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={navigateToEditProfile} // Navigate to edit profile
              >
                <FaEdit className="text-xl" />
              </motion.button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed text-base">
                {studentProfile?.about || 'I am a Graphic Designer, Content Writer, and Front-End Developer, currently pursuing a B.Tech in Computer Science and Engineering at SVIET. My expertise spans Photoshop, Figma, Canva, HTML, CSS, JavaScript, React.js, Python, C, and C++, allowing me to craft seamless digital experiences with creativity and precision. Beyond coding and design, I hold a 3-year Diploma in Computer Science and Engineering, complemented by certifications in UI/UX Design and Digital Marketing. I am passionate about creating impactful and user-friendly solutions.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Certifications Section - Redesigned */}
{activeTab === 'certifications' && (
    <motion.div
        className="w-full p-2 md:p-4" // Reduced padding here
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
    >
        <div className="flex justify-between items-center mb-4 md:mb-6"> {/* Adjusted margin-bottom */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Certifications 🏅</h3> {/* Adjusted text size */}
            <motion.button
                className="flex items-center px-4 py-1.5 md:px-5 md:py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200 text-sm md:text-base" // Adjusted padding and text size
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile} // Navigate to edit profile
            >
                <FaPlus className="mr-1.5 md:mr-2" /> Add Certification
            </motion.button>
        </div>
        {certifications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"> {/* Adjusted gap */}
                {certifications.map((certification) => (
                    <motion.div
                        key={certification.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 md:p-4 flex flex-col justify-between h-full overflow-hidden" // Reduced padding here
                        variants={itemVariants}
                        whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                    >
                        {/* Certification Image (if available) */}
                        {certification.viewLink && (
                            <div className="mb-3 md:mb-4"> {/* Adjusted margin-bottom */}
                                <img
                                    src={certification.viewLink}
                                    alt={`Certification: ${certification.name}`}
                                    className="w-full h-36 md:h-40 object-cover rounded-md border border-gray-200" // Adjusted height
                                    // Fallback if the image fails to load or is not a direct image URL
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300x150?text=Certificate+Image" }}
                                />
                            </div>
                        )}

                        <div>
                            <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">{certification.name}</h4> {/* Adjusted text size and margin */}
                            <p className="text-xs md:text-sm text-gray-700 mb-1 flex items-center">
                                <FaIdCard className="mr-1.5 md:mr-2 text-gray-400"/> Issuing Body: {certification.issuedBy}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500 flex items-center">
                                <FaCalendarAlt className="mr-1.5 md:mr-2 text-gray-400"/> {certification.issueDate}
                            </p>
                        </div>
                        
                        {/* View Certificate Button (if viewLink exists, regardless of image) */}
                        {certification.viewLink && (
                            <div className="mt-3 md:mt-4"> {/* Adjusted margin-top */}
                                <a 
                                    href={certification.viewLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-900 rounded-full text-xs md:text-sm font-medium hover:bg-blue-200 transition-colors duration-200" // Adjusted padding and text size
                                >
                                    <FaEye className="mr-1.5 md:mr-2" /> View Certificate
                                </a>
                            </div>
                        )}
                        <div className="flex justify-end mt-3 md:mt-4"> {/* Adjusted margin-top */}
                            <motion.button
                                className="text-gray-600 hover:text-blue-900"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={navigateToEditProfile} // Navigate to edit profile
                            >
                                <FaEdit className="text-base md:text-lg" /> {/* Adjusted text size */}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        ) : (
            <p className="text-gray-600 text-center py-6 md:py-8 text-base md:text-lg">No certifications added yet. Time to get certified!</p> 
        )}
    </motion.div>
)}

        {/* Projects Section - Redesigned */}
        {activeTab === 'projects' && (
          <motion.div
            className="w-full p-4 md:p-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Projects 🚀</h3>
              <motion.button
                className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile} // Navigate to edit profile
              >
                <FaPlus className="mr-2" /> Add Project
              </motion.button>
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 flex items-center"><FaCode className="mr-2 text-gray-400"/> Technologies: {project.technologies}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile} // Navigate to edit profile
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8 text-lg">No projects added yet. Start building your portfolio!</p>
            )}
          </motion.div>
        )}

        {/* Internships Section - Redesigned */}
        {activeTab === 'internships' && (
          <motion.div
            className="w-full p-4 md:p-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Internships 💼</h3>
              <motion.button
                className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile} // Navigate to edit profile
              >
                <FaPlus className="mr-2" /> Add Internship
              </motion.button>
            </div>
            {internships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship) => (
                  <motion.div
                    key={internship.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{internship.role} at {internship.company}</h4>
                      <p className="text-sm text-gray-600 mb-3 flex items-center"><FaCalendarAlt className="mr-2 text-gray-400"/> Duration: {internship.duration}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{internship.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile} // Navigate to edit profile
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8 text-lg">No internships added yet. Gain some real-world experience!</p>
            )}
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

// Helper component for Tab Buttons (unchanged)
const TabButton = ({ icon, label, active, onClick }) => (
  <motion.button
    className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
      active ? 'text-blue-900 bg-blue-50' : 'text-gray-600 hover:text-blue-900 hover:bg-gray-100'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-xl mb-1">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

export default StudentProfile;