import React from 'react';
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
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
