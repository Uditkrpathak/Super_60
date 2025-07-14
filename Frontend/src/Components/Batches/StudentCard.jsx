// import { useContext, useState } from "react";
// import {
//   FaGithub,
//   FaLinkedinIn,
//   FaTwitter,
//   FaArrowRight,
//   FaTools,
//   FaMedal,
//   FaFolderOpen,
// } from "react-icons/fa";
// import AuthContext from "../../context/AuthContext";
// import StudentEditContext from "../../context/StudentEditContext";
// import { useNavigate } from "react-router-dom";

// const StudentCard = ({ student }) => {
//   const [showModal, setShowModal] = useState(false);

//   const { isAdmin } = useContext(AuthContext);
//   const { setStudentProfile } = useContext(StudentEditContext);

//   const navigate = useNavigate()

//   const editHandler=(student)=>{
//     setStudentProfile(student);
//     navigate('/editstudentprofile');
//   }

//   return (
//     <>
//       {/* CARD */}
//       <div className="w-full max-w-sm overflow-hidden transition duration-300 transform bg-white shadow-lg group rounded-2xl hover:scale-105 ">
//         {/* Top Image Section */}
//         <div className="relative h-48">
//           <img
//             src={student.profileImage}
//             alt={student.profileImage}
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-[#002277] rounded-md shadow-md top-2 left-2">
//             {student.batch}
//           </div>
//         </div>

//         {/* Main Info Section */}
//         <div className="p-5">
//           <h2 className="text-lg font-bold text-gray-800">{student.name}</h2>
//           <p className="mb-3 text-sm text-gray-500">{student.branch}</p>

//           <div className="space-y-2 text-sm">
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaTools className="text-gray-600" />
//               {/* <span>{student.skills.length} Skills</span> */}
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaMedal className="text-yellow-600" />
//               {/* <span>{student.achievements} Achievements</span> */}
//             </div>
//             <div className="flex items-center gap-2 text-gray-700">
//               <FaFolderOpen className="text-blue-600" />
//               {/* <span>{student.projects} Projects</span> */}
//             </div>
//           </div>
//         </div>

//         {/* Footer Section */}
//         <div className="flex items-center justify-between px-5 pb-5">
//           <div className="flex gap-3 text-gray-600">
//             <a href="#" className="transition hover:text-black">
//               <FaGithub />
//             </a>
//             <a href="#" className="transition hover:text-blue-700">
//               <FaLinkedinIn />
//             </a>
//             <a href="#" className="transition hover:text-sky-600">
//               <FaTwitter />
//             </a>
//           </div>
//           <button
//             onClick={() => setShowModal(true)}
//             className="p-2 text-white transition rounded-full bg-[#C57726]"
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute text-2xl font-bold text-gray-700 top-4 right-4"
//             >
//               &times;
//             </button>

//             <div className="flex flex-col gap-8 md:flex-row">
//               {/* Left Column */}
//               <div className="w-full md:w-1/3">
//                 <img src={student.profileImage} alt={student.profileImage} className="mb-4 rounded-xl" />

//                 <div className="flex items-center justify-between">
//                   <span className="text-sm bg-[#002277] text-white px-3 py-1 inline-block rounded-md">
//                     {student.batch}
//                   </span>
//                   {isAdmin && (
//                     <button onClick={() => editHandler(student)} className="text-sm bg-[#002277] text-white px-3 py-1 inline-block rounded-md">
//                     Edit Profile
//                   </button>
//                   )}

//                 </div>
//                 <h2 className="mt-2 text-xl font-bold">{student.name}</h2>
//                 <p className="text-sm text-gray-500">{student.branch}</p>

//                 <h3 className="mt-4 font-semibold">Connect</h3>
//                 <div className="flex gap-3 mt-2 text-lg text-gray-700">
//                   <FaGithub />
//                   <FaLinkedinIn />
//                   <FaTwitter />
//                 </div>

//                 <h3 className="mt-6 font-semibold">Skills</h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {student.skills.map((skill, i) => (
//                     <span key={i} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="w-full md:w-2/3">
//                 <h3 className="mb-2 text-lg font-semibold">About</h3>
//                 <p className="text-sm text-gray-600">{student.about}</p>

//                 <h3 className="mt-6 mb-2 text-lg font-semibold">Achievements</h3>
//                 <div className="grid gap-4 md:grid-cols-2">
//                   {student.achievementsList?.map((ach, i) => (
//                     <div key={i} className="p-4 rounded-lg shadow bg-gray-50">
//                       <div className="flex items-center gap-2 mb-2">
//                         <FaMedal className="text-yellow-600" />
//                         <h4 className="font-bold">{ach.title}</h4>
//                       </div>
//                       <p className="text-sm text-gray-600">{ach.description}</p>
//                       <p className="mt-1 text-xs text-gray-400">{ach.date}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
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
  const navigate = useNavigate();

  const editHandler = (student) => {
    setStudentProfile(student);
    navigate("/editstudentprofile");
  };

  return (
    <>
      {/* Student Card */}
      <div className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-[1.03] hover:shadow-2xl bg-white border border-gray-200">
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={student.profileImage}
            alt={student.name}
            className="object-cover w-full h-full"
          />
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-[#002277] text-white rounded-full shadow">
            {student.batch}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
          <p className="mb-4 text-sm text-gray-500">{student.branch}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <FaTools />
              <span>{student.skills.length} Skills</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-600">
              <FaMedal />
              <span>{student.achievementsList?.length || 0} Achievements</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <FaFolderOpen />
              <span>{student.projects?.length || 0} Projects</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-5">
          <div className="flex gap-3 text-gray-500">
            <a href={student.github || "#"} target="_blank" className="transition hover:text-black">
              <FaGithub />
            </a>
            <a href={student.linkedin || "#"} target="_blank" className="hover:text-[#0077b5] transition">
              <FaLinkedinIn />
            </a>
            <a href={student.twitter || "#"} target="_blank" className="transition hover:text-sky-500">
              <FaTwitter />
            </a>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 text-white bg-[#C57726] rounded-full hover:bg-[#a2601e] transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-2xl font-bold text-gray-600 top-4 right-4 hover:text-black"
            >
              &times;
            </button>

            <div className="flex flex-col gap-8 md:flex-row">
              {/* Left */}
              <div className="w-full md:w-1/3">
                <img
                  src={student.profileImage}
                  alt={student.name}
                  className="w-full mb-4 rounded-xl"
                />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm bg-[#002277] text-white px-3 py-1 rounded-md">
                    {student.batch}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => editHandler(student)}
                      className="text-sm bg-[#002277] text-white px-3 py-1 rounded-md"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="mb-4 text-sm text-gray-500">{student.branch}</p>

                <h3 className="font-semibold">Connect</h3>
                <div className="flex gap-3 mt-2 text-lg text-gray-600">
                  {student.github && <a href={student.github} target="_blank"><FaGithub /></a>}
                  {student.linkedin && <a href={student.linkedin} target="_blank"><FaLinkedinIn /></a>}
                  {student.twitter && <a href={student.twitter} target="_blank"><FaTwitter /></a>}
                </div>

                <h3 className="mt-6 font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-sm bg-gray-200 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="w-full md:w-2/3">
                <h3 className="mb-2 text-lg font-semibold">About</h3>
                <p className="text-sm text-gray-700">{student.about}</p>

                <h3 className="mt-6 mb-2 text-lg font-semibold">Achievements</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {student.achievementsList?.map((ach, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2 mb-1">
                        <FaMedal className="text-yellow-500" />
                        <h4 className="font-bold">{ach.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{ach.description}</p>
                      <p className="mt-1 text-xs text-gray-400">{ach.date}</p>
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

