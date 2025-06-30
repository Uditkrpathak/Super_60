import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#002277] mb-6">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate('/addUser')}
            className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
          >
            ➕ Add New User
          </button>

          <button
            onClick={() => navigate('/addBlog')}
            className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
          >
            ➕ Add New Blog
          </button>

          <button
            onClick={() => navigate('/addEvent')}
            className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
          >
            ➕ Add New Event
          </button>

          <button
            onClick={() => navigate('/addFaculty')}
            className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
          >
            ➕ Add New Faculty
          </button>

          <button
            onClick={() => navigate('/facultyList')}
            className="inline-flex items-center gap-2 bg-[#004488] text-white px-5 py-2 rounded-md hover:bg-[#002277] transition"
          >
            📋 View All Faculty
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
