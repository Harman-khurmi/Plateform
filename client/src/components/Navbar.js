// import React from 'react';

// import logo from './Union.jpg';
// import arrow from './Vector.jpg';
// import { Link } from "react-router-dom";
// export default function Navbar() {
//   return (
//     <>
//     <div className="NaviationCenter" style={{width: 1525, height: 64, position: 'relative', boxShadow: '0px 26px 58px rgba(0, 0, 0, 0.10)'}}>
//   <div className="Background" style={{width: 1440, height: 64, left: 0, top: 0, position: 'absolute', background: 'white'}} />
  
//   <div className="Links" style={{width: 376, height: 30, left: 500, top: 17, position: 'absolute'}}>
//     <div className="Link" style={{width: 100, height: 30, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Calendar</div>
//     <div className="Link" style={{width: 200, height: 30, left: 130, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>upcoming Bookings</div>
//     <div className="Link" style={{width: 100, height: 30, left: 360, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>history</div>
//     <div className="Link" style={{width: 100, height: 30, left: 500, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Billing</div>
//     <div className="Link" style={{width: 100, height: 30, left:850, top: 0, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Logout</Link></div>
//   </div>
//   <div ><img src={logo} className="Union" style={{width: 150, height: 32, left: 132, top: 16, position: 'absolute',fontSize: 18, fontFamily: 'Roboto'}}/></div>
//   {/* #1D5D9D */}
//   {/* <div ><img src={arrow} className="Vector" style={{width: 10, height: 6, left: 595, top: 27, position: 'absolute'}}/></div>
//   <div ><img src={arrow} className="Vector" style={{width: 10, height: 6, left: 680, top: 27, position: 'absolute'}}/></div>
//   <div ><img src={arrow} className="Vector" style={{width: 10, height: 6, left: 792, top: 27, position: 'absolute'}}/></div>
//   <div ><img src={arrow} className="Vector" style={{width: 10, height: 6, left: 901, top: 27, position: 'absolute'}}/></div> */}
// </div>
    
//     </>
//   );
// }

import React from 'react';
import { Link } from "react-router-dom";
import logo from './Union.png';
import arrow from './Vector.jpg';
import './Nav.css';

export default function Nav() {
  return (
    <>
      
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
            
            <div id="sign-box">
              {/* <a href="/signup">Signup</a> */}
              <Link to="/" className="button">Logout</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}







