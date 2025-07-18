// pages/StudentProfile.jsx
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
  FaPhone, // Will be removed from statistics display
  FaMapMarkerAlt, // Will be removed from statistics display
  FaEnvelope,
  FaShareAlt,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaLink, // Used for portfolio
  FaAward, // For Achievements
  FaCertificate, // For Certifications
  FaCode, // For Projects and Specialization
  FaBriefcase, // For Internships and Client (formerly Client Internships)
  FaPlus, // For "Add Semester" etc.
  FaEdit,
  FaChartBar,
  FaEye,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// Helper component for Tab Buttons
const TabButton = ({ icon, label, active, onClick }) => (
  <motion.button
    className={`flex-1 flex flex-col items-center p-2 sm:p-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200
      ${active ? 'bg-blue-100 text-blue-900 shadow-inner' : 'text-gray-600 hover:bg-gray-50'}
    `}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-lg sm:text-xl mb-1">{icon}</div>
    <span className="hidden sm:inline-block">{label}</span> {/* Hide label on very small screens */}
  </motion.button>
);

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const { studentProfile, setStudentProfile } = useContext(StudentEditContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('statistics');

  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [internships, setInternships] = useState([]);
  const [client, setClient] = useState([]); // Renamed from clientInternships to client

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
        setInternships(res.data.internship || []);
        setClient(res.data.client || []); // Correctly mapping 'client' from backend
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [setStudentProfile]);

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
    <div className="w-full mt-16 min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navigation Tabs */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-4 mb-8 flex justify-around items-center border-b border-gray-200">
        <TabButton icon={<FaChartBar />} label="Statistics" active={activeTab === 'statistics'} onClick={() => setActiveTab('statistics')} />
        <TabButton icon={<FaAward />} label="Achievements" active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
        <TabButton icon={<FaIdCard />} label="Bio" active={activeTab === 'bio'} onClick={() => setActiveTab('bio')} />
        <TabButton icon={<FaCertificate />} label="Certifications" active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} />
        <TabButton icon={<FaCode />} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
        <TabButton icon={<FaBriefcase />} label="Internships" active={activeTab === 'internships'} onClick={() => setActiveTab('internships')} />
        <TabButton icon={<FaBriefcase />} label="Client" active={activeTab === 'client'} onClick={() => setActiveTab('client')} /> {/* Label changed to Client */}
      </div>

      <motion.div
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
            {/* Left Section (Profile Image, Contact Info, Portfolio, Social Links) */}
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

              {/* Portfolio Link */}
              {studentProfile?.portfolioLink && (
                <motion.a
                  href={studentProfile.portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline mt-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="View Portfolio"
                >
                  <FaLink className="mr-2" /> View Portfolio
                </motion.a>
              )}

              {/* Social Links */}
              <div className="flex space-x-3 mt-3">
                {studentProfile?.socialLinks?.fiverr && (
                  <motion.a href={studentProfile.socialLinks.fiverr} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Fiverr">
                    <FaLink className="w-6 h-6 text-green-500" />
                  </motion.a>
                )}
                {studentProfile?.socialLinks?.linkedin && (
                  <motion.a href={studentProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="LinkedIn">
                    <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
                  </motion.a>
                )}
                {studentProfile?.socialLinks?.instagram && (
                  <motion.a href={studentProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="Instagram">
                    <FaInstagram className="w-6 h-6 text-[#E4405F]" />
                  </motion.a>
                )}
                {studentProfile?.socialLinks?.whatsapp && (
                  <motion.a href={`https://wa.me/${studentProfile.socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} title="WhatsApp">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                  </motion.a>
                )}
              </div>

              {/* Contact Information (Email only, Phone/Address removed from here) */}
              <motion.div className="border-t pt-6 mt-6 md:mt-4 md:pt-4 w-full" variants={itemVariants}>
                <h4 className="text-md font-bold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-gray-600" />
                    <p className="text-gray-700">{studentProfile?.email || 'user98@gmail.com'}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Middle Section (Course, Academic/University Roll No, Placement, Specialization) */}
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
                  <p className="text-gray-600 text-sm">Academic Roll No:</p>
                  <p className="font-semibold text-gray-800">{studentProfile?.academicRollNo || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaIdCard className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">University Roll No:</p>
                  <p className="font-semibold text-gray-800">{studentProfile?.universityRollNo || 'N/A'}</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaGraduationCap className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">Placement:</p>
                  <p className="font-semibold text-gray-800">
                    {studentProfile?.placement?.placed ?
                      `${studentProfile.placement.companyName || 'Placed'} on ${studentProfile.placement.placedOn ? new Date(studentProfile.placement.placedOn).toLocaleDateString() : 'N/A'}`
                      : 'Not Placed'}
                  </p>
                </div>
              </motion.div>
              {/* Specialization */}
              <motion.div className="flex items-center space-x-3" variants={itemVariants}>
                <FaCode className="text-blue-900 text-xl" />
                <div>
                  <p className="text-gray-600 text-sm">Specialization:</p>
                  {/* Correctly mapping specialization */}
                  <p className="font-semibold text-gray-800">
                    {(studentProfile?.specialization && studentProfile.specialization.length > 0)
                      ? studentProfile.specialization.join(', ')
                      : 'N/A'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Section (Batch, Joined Date, Edit Profile, Top Skills) */}
            <div className="col-span-1 flex flex-col items-center md:items-end text-center md:text-right space-y-6 md:space-y-8 pl-8 border-l md:border-l-2 border-gray-100">
              <motion.div className="flex flex-col items-center md:items-end space-y-2" variants={itemVariants}>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-900 text-2xl font-bold">TJ</span> {/* You might want to replace 'TJ' with studentProfile.batch initials or similar */}
                  <div>
                    <p className="text-gray-600 text-sm">Batch:</p>
                    <p className="font-semibold text-gray-800">{studentProfile?.batch || 'Super 60 6.0'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <FaCalendarAlt className="text-gray-600 text-lg" />
                  <div>
                    <p className="text-gray-600 text-sm">Joined:</p>
                    <p className="font-semibold text-gray-800">
                      {studentProfile?.joinedOn ? new Date(studentProfile.joinedOn).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.button
                onClick={navigateToEditProfile}
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
                    onClick={navigateToEditProfile}
                  >
                    <FaEdit className="text-sm" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(studentProfile?.skills?.length > 0 ? studentProfile.skills : ['HTML', 'CSS', 'ReactJS', 'Adobe Photoshop', 'Canva']).map((skill, index) => (
                    <motion.span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                      variants={skillTagVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Achievements Section */}
        {activeTab === 'achievements' && (
          <motion.div
            className="w-full p-4 md:p-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Achievements 🏆</h3>
              <motion.button
                className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile}
              >
                <FaPlus className="mr-2" /> Add Achievement
              </motion.button>
            </div>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {achievement.date ? new Date(achievement.date).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile}
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

        {/* Bio Section */}
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
                onClick={navigateToEditProfile}
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

        {/* Certifications Section */}
        {activeTab === 'certifications' && (
          <motion.div
            className="w-full p-2 md:p-4"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Certifications 🏅</h3>
              <motion.button
                className="flex items-center px-4 py-1.5 md:px-5 md:py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile}
              >
                <FaPlus className="mr-1.5 md:mr-2" /> Add Certification
              </motion.button>
            </div>
            {certifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {certifications.map((certification, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 md:p-4 flex flex-col justify-between h-full overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    {certification.viewLink && (
                      <div className="mb-3 md:mb-4">
                        <img
                          src={certification.viewLink}
                          alt={`Certification: ${certification.name}`}
                          className="w-full h-36 md:h-40 object-cover rounded-md border border-gray-200"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x150?text=Certificate+Image" }}
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">{certification.name}</h4>
                      <p className="text-xs md:text-sm text-gray-700 mb-1 flex items-center">
                        <FaIdCard className="mr-1.5 md:mr-2 text-gray-400" /> Issuing Body: {certification.issuedBy}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1.5 md:mr-2 text-gray-400" />
                        {certification.issueDate ? new Date(certification.issueDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    {certification.viewLink && (
                      <div className="mt-3 md:mt-4">
                        <a
                          href={certification.viewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-900 rounded-full text-xs md:text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                        >
                          <FaEye className="mr-1.5 md:mr-2" /> View Certificate
                        </a>
                      </div>
                    )}
                    <div className="flex justify-end mt-3 md:mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile}
                      >
                        <FaEdit className="text-base md:text-lg" />
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

        {/* Projects Section */}
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
                onClick={navigateToEditProfile}
              >
                <FaPlus className="mr-2" /> Add Project
              </motion.button>
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    {project.projectImage && (
                      <div className="mb-3 md:mb-4">
                        <img
                          src={project.projectImage}
                          alt={`Project: ${project.title}`}
                          className="w-full h-36 md:h-40 object-cover rounded-md border border-gray-200"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x150?text=Project+Image" }}
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 flex items-center">
                        <FaCode className="mr-2 text-gray-400" /> Technologies: {(project.technologiesUsed || []).join(', ')}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                      {project.projectLink && (
                        <p className="text-sm text-blue-600 mt-2 flex items-center">
                          <FaLink className="mr-2" /> <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="hover:underline">View Project</a>
                        </p>
                      )}
                      {project.githubRepo && (
                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                          <FaCode className="mr-2" /> <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub Repo</a>
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile}
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

        {/* Internships Section */}
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
                onClick={navigateToEditProfile}
              >
                <FaPlus className="mr-2" /> Add Internship
              </motion.button>
            </div>
            {internships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{internship.companyName}</h4>
                      <p className="text-sm text-gray-600 mb-1 flex items-center">
                        <FaBriefcase className="mr-2 text-gray-400" /> Role: {internship.role}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {internship.startDate ? new Date(internship.startDate).toLocaleDateString() : 'N/A'} - {internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{internship.description}</p>
                      {internship.certificate && (
                        <p className="text-sm text-blue-600 mt-2 flex items-center">
                          <FaCertificate className="mr-2" /> <a href={internship.certificate} target="_blank" rel="noopener noreferrer" className="hover:underline">View Certificate</a>
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile}
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8 text-lg">No internships added yet. Time to gain some experience!</p>
            )}
          </motion.div>
        )}

        {/* Client Section (Renamed from Client Internships) */}
        {activeTab === 'client' && (
          <motion.div
            className="w-full p-4 md:p-8"
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Client Projects 🤝</h3> {/* Changed heading */}
              <motion.button
                className="flex items-center px-5 py-2 bg-blue-900 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToEditProfile}
              >
                <FaPlus className="mr-2" /> Add Client Project {/* Changed button text */}
              </motion.button>
            </div>
            {client.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {client.map((clientProject, index) => ( // Changed variable name to clientProject
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between h-full"
                    variants={itemVariants}
                    whileHover={{ translateY: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  >
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{clientProject.companyName}</h4>
                      <p className="text-sm text-gray-600 mb-1 flex items-center">
                        <FaBriefcase className="mr-2 text-gray-400" /> Role: {clientProject.role}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {clientProject.startDate ? new Date(clientProject.startDate).toLocaleDateString() : 'N/A'} - {clientProject.endDate ? new Date(clientProject.endDate).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{clientProject.description}</p>
                      {clientProject.certificate && (
                        <p className="text-sm text-blue-600 mt-2 flex items-center">
                          <FaCertificate className="mr-2" /> <a href={clientProject.certificate} target="_blank" rel="noopener noreferrer" className="hover:underline">View Certificate</a>
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        className="text-gray-600 hover:text-blue-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={navigateToEditProfile}
                      >
                        <FaEdit className="text-lg" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8 text-lg">No client projects added yet. Time to showcase your client work!</p>
            )}
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default StudentProfile;