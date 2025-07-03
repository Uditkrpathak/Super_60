// // import React from "react";
// // import { FaGithub, FaLinkedinIn, FaXTwitter, FaArrowRight } from "react-icons/fa6";
// // import { FaTools, FaMedal, FaBox } from "react-icons/fa";

// // const StudentCard = ({ student }) => {
// //   return (
// //     <div className="relative flex w-[320px] rounded-2xl overflow-hidden shadow-xl bg-white">
// //       {/* Left Content */}
// //       <div className="flex-1 ">
// //         <img src={student.image} alt={student.name} className="object-cover w-full h-48" />
// //         <div className="p-4">
// //           <p className="bg-[#d60000] inline-block text-white text-xs px-2 py-1 rounded mb-2 font-semibold">
// //             {student.batch}
// //           </p>
// //           <h2 className="text-lg font-bold">{student.name}</h2>
// //           <p className="mb-2 text-sm text-gray-500">{student.branch}</p>

// //           {/* Stats */}
// //           <div className="space-y-2 text-sm">
// //             <div className="flex items-center gap-2">
// //               <span className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full">
// //                 <FaTools className="text-[14px]" />
// //                 {student.skills.length} Skills
// //               </span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <span className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full">
// //                 <FaMedal className="text-[14px] text-[#c4122f]" />
// //                 {student.achievements} Achievements
// //               </span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <span className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full">
// //                 <FaBox className="text-[14px] text-[#c4122f]" />
// //                 {student.projects} Projects
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Sidebar */}
// //       <div className="w-12 bg-[#1c1c1c] flex flex-col justify-between items-center py-4">
// //         <div className="space-y-3">
// //           <a href="#" className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full hover:bg-gray-200">
// //             <FaGithub size={16} />
// //           </a>
// //           <a href="#" className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full hover:bg-gray-200">
// //             <FaLinkedinIn size={16} />
// //           </a>
// //           <a href="#" className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full hover:bg-gray-200">
// //             <FaXTwitter size={16} />
// //           </a>
// //         </div>
// //         <button className="flex items-center justify-center mt-4 text-white bg-red-600 rounded-full w-9 h-9 hover:bg-red-700">
// //           <FaArrowRight size={16} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentCard;


// import {
//   FaGithub,
//   FaLinkedinIn,
//   FaTwitter,
//   FaArrowRight,
//   FaTools,
//   FaMedal,
//   FaFolderOpen,
// } from "react-icons/fa";

// const StudentCard = ({ student }) => {
//   return (
//     <div className="w-full max-w-sm overflow-hidden transition duration-300 transform bg-white shadow-lg group rounded-2xl hover:scale-105 ">
//       {/* Top Image Section */}
//       <div className="relative h-48">
//         <img
//           src={student.image}
//           alt={student.name}
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-[#002277] rounded-md shadow-md top-2 left-2">
//           {student.batch}
//         </div>
//       </div>

//       {/* Main Info Section */}
//       <div className="p-5">
//         <h2 className="text-lg font-bold text-gray-800">{student.name}</h2>
//         <p className="mb-3 text-sm text-gray-500">{student.branch}</p>

//         <div className="space-y-2 text-sm">
//           <div className="flex items-center gap-2 text-gray-700">
//             <FaTools className="text-gray-600" />
//             <span>{student.skills.length} Skills</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-700">
//             <FaMedal className="text-yellow-600" />
//             <span>{student.achievements} Achievements</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-700">
//             <FaFolderOpen className="text-blue-600" />
//             <span>{student.projects} Projects</span>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section with Socials */}
//       <div className="flex items-center justify-between px-5 pb-5">
//         <div className="flex gap-3 text-gray-600">
//           <a href="#" className="transition hover:text-black">
//             <FaGithub />
//           </a>
//           <a href="#" className="transition hover:text-blue-700">
//             <FaLinkedinIn />
//           </a>
//           <a href="#" className="transition hover:text-sky-600">
//             <FaTwitter />
//           </a>
//         </div>
//        <button
//   className="p-2 text-white transition rounded-full bg-[#C57726]"
//   onClick={() => onArrowClick(student)}
// >
//   <FaArrowRight />
// </button>
//       </div>
//     </div>
//   );
// };

// export default StudentCard;

import { useContext, useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRight,
  FaTools,
  FaMedal,
  FaFolderOpen,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import StudentEditContext from "../../context/StudentEditContext";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const [showModal, setShowModal] = useState(false);

  const { isAdmin } = useContext(AuthContext);
  const { setStudentProfile } = useContext(StudentEditContext);

  const navigate = useNavigate()

  const editHandler=(student)=>{
    setStudentProfile(student);
    navigate('/editstudentprofile');
  }

  return (
    <>
      {/* CARD */}
      <div className="w-full max-w-sm overflow-hidden transition duration-300 transform bg-white shadow-lg group rounded-2xl hover:scale-105 ">
        {/* Top Image Section */}
        <div className="relative h-48">
          <img
            src={student.profileImage}
            alt={student.profileImage}
            className="object-cover w-full h-full"
          />
          <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-[#002277] rounded-md shadow-md top-2 left-2">
            {student.batch}
          </div>
        </div>

        {/* Main Info Section */}
        <div className="p-5">
          <h2 className="text-lg font-bold text-gray-800">{student.name}</h2>
          <p className="mb-3 text-sm text-gray-500">{student.branch}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <FaTools className="text-gray-600" />
              {/* <span>{student.skills.length} Skills</span> */}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMedal className="text-yellow-600" />
              {/* <span>{student.achievements} Achievements</span> */}
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaFolderOpen className="text-blue-600" />
              {/* <span>{student.projects} Projects</span> */}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between px-5 pb-5">
          <div className="flex gap-3 text-gray-600">
            <a href="#" className="transition hover:text-black">
              <FaGithub />
            </a>
            <a href="#" className="transition hover:text-blue-700">
              <FaLinkedinIn />
            </a>
            <a href="#" className="transition hover:text-sky-600">
              <FaTwitter />
            </a>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 text-white transition rounded-full bg-[#C57726]"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-1/3 w-full">
                <img src={student.profileImage} alt={student.profileImage} className="rounded-xl mb-4" />

                <div className="flex items-center justify-between">
                  <span className="text-sm bg-[#002277] text-white px-3 py-1 inline-block rounded-md">
                    {student.batch}
                  </span>
                  {isAdmin && (
                    <button onClick={() => editHandler(student)} className="text-sm bg-[#002277] text-white px-3 py-1 inline-block rounded-md">
                    Edit Profile
                  </button>
                  )}

                </div>
                <h2 className="text-xl font-bold mt-2">{student.name}</h2>
                <p className="text-sm text-gray-500">{student.branch}</p>

                <h3 className="mt-4 font-semibold">Connect</h3>
                <div className="flex gap-3 mt-2 text-gray-700 text-lg">
                  <FaGithub />
                  <FaLinkedinIn />
                  <FaTwitter />
                </div>

                <h3 className="mt-6 font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.skills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="md:w-2/3 w-full">
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-sm text-gray-600">{student.about}</p>

                <h3 className="font-semibold text-lg mt-6 mb-2">Achievements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {student.achievementsList?.map((ach, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <FaMedal className="text-yellow-600" />
                        <h4 className="font-bold">{ach.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{ach.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{ach.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;

