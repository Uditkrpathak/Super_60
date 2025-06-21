import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all the pages
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Batches from './pages/Batches';
import TrainingModel from './pages/TrainingModel';
import Events from './pages/Events';
import Blogs from './pages/Blogs';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
