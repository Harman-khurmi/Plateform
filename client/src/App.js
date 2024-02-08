
import './App.css';
import React from 'react';

import Login from './pages/Login/Loginme';
import Forgot from './pages/Forgot/Forgot';
import Signup from './pages/Signup/Signup';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <>



      <Router>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgotpass" element={<Forgot />} />
          <Route path="/Forgotpass/Signup" element={<Signup />} />

        </Routes>

      </Router>

    </>
  );

}

export default App;
