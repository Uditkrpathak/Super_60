import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaUserTag } from 'react-icons/fa';

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen px-4 py-12 mt-20 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="items-center gap-10 p-8 bg-white shadow-md rounded-2xl md:flex">
          {/* Profile Avatar */}
          <div className="flex justify-center md:block">
            <FaUserCircle className="text-[#002277] w-32 h-32 mx-auto md:mx-0" />
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
