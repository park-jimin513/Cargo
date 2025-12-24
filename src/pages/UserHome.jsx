import React, { useState } from "react";
import "../styles/UserHome.css";

function UserHome({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="user-home">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="nav-logo">🚗 CarRental</div>

        {/* Search Bar - Hidden on Mobile via CSS */}
        <div className="nav-search desktop-only">
          <input 
            type="text" 
            placeholder="Search by brand or price..." 
            className="search-input"
          />
          <button className="search-icon-btn">🔍</button>
        </div>

        {/* Hamburger for Mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="active">Home</li>
          <li>Browse</li>
          <li>My Bookings</li>
          <li>Support</li>
          <li className="mobile-logout" onClick={onLogout}>Logout</li>
        </ul>

        <div className="nav-right desktop-only">
          <span className="user-profile-name">John Doe</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="home-content">
            <h1>Find your perfect ride</h1>
            <p>Luxury, Economy & Electric Vehicles Available</p>
            
            <button className="explore-btn">View All Cars</button>

            {/* Search Bar - Only Visible on Mobile */}
            <div className="hero-search mobile-only">
              <input 
                type="text" 
                placeholder="Search cars by brand or price..." 
                className="hero-search-input"
              />
              <button className="hero-search-btn">🔍</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserHome;