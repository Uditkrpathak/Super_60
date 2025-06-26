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
