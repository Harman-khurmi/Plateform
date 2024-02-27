
import './App.css';
import React from 'react';

import Login from './pages/Login/Loginme';
import Forgot from './pages/Forgot/Forgot';
import Signup from './pages/Signup/Signup';
import Book from './pages/Booking/Booking';
import QRPage from './pages/QR/Components/qrpage';
import ScanQR from './pages/Scan/Components/scanpage';
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
          <Route path="/main/book" element={<Book />} />
          <Route path="/main/genQR" element={<QRPage />} />
          <Route path="/main/scanQR/:classId" element={<ScanQR />} />
          <Route path="/Forgotpass" element={<Forgot />} />
          <Route path="/Forgotpass/Signup" element={<Signup />} />

        </Routes>

      </Router>

    </>
  );

}

export default App;
