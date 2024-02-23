
import './App.css';
import React from 'react';

import Login from './pages/Login/Loginme';
import Forgot from './pages/Forgot/Forgot';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/main';
import Home from './pages/Home/home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {


  return (
    <>



      <Router>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/Signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Forgotpass" element={<Forgot />} />
          <Route path="/Forgotpass/Signup" element={<Signup />} />

        </Routes>

      </Router>

    </>
  );

}

export default App;
