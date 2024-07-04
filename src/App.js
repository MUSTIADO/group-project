import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
import Home from './components/Home';
import Property from './components/Property'; // Import Property component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import App.css for styling

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" component={Register} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/property" element={<Property />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
