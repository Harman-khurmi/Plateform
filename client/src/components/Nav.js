import React from 'react';
import { Link } from "react-router-dom";
import logo from './Union.png';
import arrow from './Vector.jpg';
import './Nav.css';

export default function Nav() {
  return (
    <>
      {/* <div className="NaviationCenter" style={{ width: 1525, height: 64, boxShadow: '0px 26px 58px rgba(0, 0, 0, 0.10)', position: 'fixed' }}>
        <div className="Background" style={{ width: 1440, height: 64, left: 0, top: 0, position: 'absolute', background: 'white' }} />
        <div className="ButtonSecondary" style={{ width: 140, height: 40, paddingTop: 8, paddingBottom: 7, paddingLeft: 17, paddingRight: 16, left: 1222, top: 12, position: 'absolute', background: '#1D5D9D', borderRadius: 10, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <div className="Text" ><Link to="Signup" style={{ width: 107, textAlign: 'center', color: 'white', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 24.26, wordWrap: 'break-word', textDecoration: 'none' }}>SignUp</Link></div>
        </div>
        <div className="ButtonSecondary" style={{ width: 140, height: 40, paddingTop: 8, paddingBottom: 7, paddingLeft: 17, paddingRight: 16, left: 1089, top: 12, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <div className="Text" ><Link to="login" style={{ width: 107, textAlign: 'center', color: '#1D5D9D', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', lineHeight: 24.26, wordWrap: 'break-word', textDecoration: 'none' }}>Login</Link></div>
        </div>
        <div className="Links" style={{ width: 376, height: 30, left: 531, top: 17, position: 'absolute' }}>
          <div className="Link" style={{ width: 69, height: 30, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#1D5D9D', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>Home</div>
          <div className="Link" style={{ width: 64, height: 30, left: 89, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>Menu</div>
          <div className="Link" style={{ width: 95, height: 30, left: 173, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>Services</div>
          <div className="Link" style={{ width: 88, height: 30, left: 288, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word' }}>Contact</div>
        </div>
        <div ><img src={logo} className="Union" style={{ width: 150, height: 32, left: 132, top: 16, position: 'absolute', fontSize: 18, fontFamily: 'Roboto' }} /></div>
        <div ><img src={arrow} className="Vector" style={{ width: 10, height: 6, left: 595, top: 27, position: 'absolute' }} /></div>
        <div ><img src={arrow} className="Vector" style={{ width: 10, height: 6, left: 680, top: 27, position: 'absolute' }} /></div>
        <div ><img src={arrow} className="Vector" style={{ width: 10, height: 6, left: 792, top: 27, position: 'absolute' }} /></div>
        <div ><img src={arrow} className="Vector" style={{ width: 10, height: 6, left: 901, top: 27, position: 'absolute' }} /></div>
      </div> */}
      <header>
        <div class="logo">
          <a href="/"><img src={logo} alt="" srcset="" /></a>
        </div>
        <div id="nav">
          <div class="options">
            <a href="/">Home</a>
            <a href="/main/book">Calendar</a>
            <a href="/main/upcoming">Upcoming Bookings</a>
            <a href="/main/history">History</a>
            <a href="/main/billing">Billing</a>
          </div>
          <div class="credential">
            <div id="login-box">
              {/* <a href="/login">Login</a> */}
              <Link to="/login" className="button">Login</Link>
            </div>
            <div id="sign-box">
              {/* <a href="/signup">Signup</a> */}
              <Link to="/signup" className="button">SignUp</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}




// const Nav = () => {
//   return (
//     <div className="navbar">
//       <div className="brand">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>
//       <div className="links">
//         <Link to="/" className="link">Home</Link>
//         <Link to="/" className="link">Menu</Link>
//         <Link to="/" className="link">Services</Link>
//         <Link to="/" className="link">Contact</Link>
//       </div>
//       <div className="auth-buttons">
//         <Link to="/signup" className="button">Sign Up</Link>
//         <Link to="/login" className="button">Login</Link>
//       </div>
//       {/* <img src={arrow} alt="Arrow" className="arrow" /> */}
//     </div>
//   );
// }

// export default Nav;

