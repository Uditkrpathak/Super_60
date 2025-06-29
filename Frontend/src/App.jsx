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
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageNotFound from './Pages/PageNotFound';
import ProtectedAdminRoute from './Components/ProtectedRoutes/ProtectedAdminRoute';
import ProtectedStudentRoute from './Components/ProtectedRoutes/ProtectedStudentRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import StudentProfile from './Components/Auth/StudentProfile';
import EditableStudentProfile from './Pages/Student/EditableStudentProfile';
import AddUser from './Pages/Admin/AddUser';
import AddBlog from './Pages/Admin/AddBlog';
import AddEvent from './Pages/Admin/AddEvent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
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

        {/* Protected Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />

        <Route path="/addUser" element={
          <ProtectedAdminRoute>
            <AddUser />
          </ProtectedAdminRoute>
        } />
        <Route path="/addBlog" element={
          <ProtectedAdminRoute>
            <AddBlog />
          </ProtectedAdminRoute>
        } />
        <Route path="/addEvent" element={
          <ProtectedAdminRoute>
            <AddEvent />
          </ProtectedAdminRoute>
        } />


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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
