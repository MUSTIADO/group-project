import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Contact from './components/Contact';
// import Property from './components/Property';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import './App.css'; // Import App.css for styling



const App = () => {
  return (
      <Router>
          <Navbar />
          {/* <div className="pt-14 "> */}
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" component={Register} />
              <Route path="/contact" element={<Contact/>} />
          </Routes>
          {/* </div> */}
      </Router>
  );
};

export default App;