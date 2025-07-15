import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all the pages
import Home from './Pages/Home';
import About from './Pages/About';
import History from './Pages/History';
import Batches from './Pages/Batches';
import TrainingModel from './Pages/TrainingModel';
import Events from './Pages/Events';
import Blogs from './Pages/Blogs';
import Academics from './Pages/Academics';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import ProtectedAdminRoute from './Components/ProtectedRoutes/ProtectedAdminRoute';
import ProtectedStudentRoute from './Components/ProtectedRoutes/ProtectedStudentRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import StudentProfile from './Components/Auth/StudentProfile';
import EditableStudentProfile from './Pages/Student/EditableStudentProfile';
import AddUser from './Pages/Admin/AddUser';
import AddBlog from './Pages/Admin/AddBlog';
import AddEvent from './Pages/Admin/AddEvent';
import AddFaculty from './Pages/Admin/AddFaculty'
import UserLayout from './Components/Layout/UserLayout';
import AdminLayout from './Components/Layout/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<UserLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/training-model" element={<TrainingModel />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Student Protected Routes */}
        <Route path="/editstudentprofile" element={
          <ProtectedStudentRoute>
            <EditableStudentProfile />
          </ProtectedStudentRoute>
        } />
        <Route
          path="/student-profile"
          element={
            <ProtectedStudentRoute>
              <StudentProfile />
            </ProtectedStudentRoute>
          }
          />

          </Route>

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="add-faculty" element={<AddFaculty />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
