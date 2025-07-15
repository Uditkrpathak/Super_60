// // import { useNavigate } from "react-router-dom";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen px-4 bg-gray-100 pt-28">
// //       <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
// //         <h1 className="text-2xl font-bold text-[#002277] mb-6">Admin Dashboard</h1>

// //         <div className="flex flex-wrap gap-4">
// //           <button
// //             onClick={() => navigate('/addUser')}
// //             className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
// //           >
// //             ➕ Add New User
// //           </button>

// //           <button
// //             onClick={() => navigate('/addBlog')}
// //             className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
// //           >
// //             ➕ Add New Blog
// //           </button>

// //           <button
// //             onClick={() => navigate('/addEvent')}
// //             className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
// //           >
// //             ➕ Add New Event
// //           </button>

// //           <button
// //             onClick={() => navigate('/addFaculty')}
// //             className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
// //           >
// //             ➕ Add New Faculty
// //           </button>

// //           <button
// //             onClick={() => navigate('/facultyList')}
// //             className="inline-flex items-center gap-2 bg-[#004488] text-white px-5 py-2 rounded-md hover:bg-[#002277] transition"
// //           >
// //             📋 View All Faculty
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import { useNavigate } from "react-router-dom";
// import {
//   FaUserPlus,
//   FaBlog,
//   FaCalendarPlus,
//   FaChalkboardTeacher,
//   FaList,
// } from "react-icons/fa";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const cards = [
//     { title: "Add New User", icon: <FaUserPlus />, path: "/addUser" },
//     { title: "Add New Blog", icon: <FaBlog />, path: "/addBlog" },
//     { title: "Add New Event", icon: <FaCalendarPlus />, path: "/addEvent" },
//     { title: "Add New Faculty", icon: <FaChalkboardTeacher />, path: "/addFaculty" },
    
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-[#002277] text-white flex flex-col p-6 fixed h-screen mt-20">
//         <h2 className="mb-10 text-2xl font-bold text-[#C57726]">Super60 Admin</h2>
//         <nav className="flex flex-col gap-5">
//           {cards.map(({ path, title, icon }) => (
//             <button
//               key={title}
//               onClick={() => navigate(path)}
//               className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-white hover:text-[#002277] transition"
//             >
//               {icon}
//               <span>{title}</span>
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 ml-64">
//         {/* Topbar */}
//         <header className="fixed z-10 flex items-center justify-between w-full h-20 px-6 ml-64 bg-white shadow-md">
//           <h1 className="text-xl font-semibold text-[#002277]">Dashboard</h1>
//           <div className="flex items-center gap-4">
//             <img
//               src="https://i.pravatar.cc/40"
//               alt="Admin"
//               className="w-10 h-10 rounded-full border-2 border-[#002277]"
//             />
//             <span className="text-[#002277] font-medium">Admin</span>
//           </div>
//         </header>

//         {/* Cards */}
//         <main className="px-8 pb-8 pt-28">
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {cards.map(({ title, icon, path }, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => navigate(path)}
//                 className="p-6 transition bg-white shadow cursor-pointer rounded-xl hover:shadow-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-[#002277] text-white p-3 rounded-full">
//                     {icon}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-[#002277]">
//                       {title}
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Click to manage {title.toLowerCase()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import logo from '../../assets/super-60logo.png';

// Mock data for analytics
const batchData = [
  { name: "Batch A", students: 30 },
  { name: "Batch B", students: 45 },
  { name: "Batch C", students: 20 },
  { name: "Batch D", students: 35 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  

  const totalStudents = batchData.reduce((acc, b) => acc + b.students, 0);

  return (
      <div className="sm:ml-16">
        {/* Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-center w-full h-20 px-6 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-semibold text-[#002277]">Admin Dashboard</span>
        </div>

      </header>

        {/* Dashboard Body */}
        <main className="px-8 pb-8 pt-28">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Students</p>
              <h2 className="text-2xl font-bold text-[#002277]">{totalStudents}</h2>
            </div>
            <div className="p-6 text-center bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Batches</p>
              <h2 className="text-2xl font-bold text-[#002277]">{batchData.length}</h2>
            </div>
            {/* Add more cards here as needed */}
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-[#002277] mb-4">
              Students per Batch
            </h2>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={batchData}
                    dataKey="students"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {batchData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
  );
};

export default AdminDashboard;




