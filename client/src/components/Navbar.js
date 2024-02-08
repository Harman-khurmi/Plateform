import React from 'react';
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className='w-75 mx-auto '>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#c1bebe'}}>
    <div className="container-fluid">
    <a className="navbar-brand" href="/">Match My Trip</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to="/home" style={{textDecoration:'none',color:'black'}}>Home</Link>
        </li>
        
      </ul>
      
      <div class="d-flex nav-item dropdown dropleft">
          
          <button className="btn btn-outline-dark dropdown-toggle dropleft" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg>
          </button>
          
          <ul class="dropdown-menu dropdown-menu-left">
            <li><a class="dropdown-item" href="#"><Link to="/profile" style={{textDecoration:'none',color:'black'}}>Profile</Link></a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#"><Link to="/" style={{textDecoration:'none',color:'black'}}>Logout</Link></a></li>
          </ul>
        </div>
        
        </div>
    </div>
  
    </nav>
    </div>
  );
}
