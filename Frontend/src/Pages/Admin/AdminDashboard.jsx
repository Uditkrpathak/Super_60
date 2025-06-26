import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const newStudentHandler = () => {
    navigate('/addUser');
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-100 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#002277] mb-6">Admin Dashboard</h1>

        <button
          onClick={newStudentHandler}
          className="inline-flex items-center gap-2 bg-[#002277] text-white px-5 py-2 rounded-md hover:bg-[#001a5c] transition"
        >
          <span className="text-lg">➕</span> Add New User
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
