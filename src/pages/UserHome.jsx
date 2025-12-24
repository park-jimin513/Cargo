import React, { useState } from "react";
import "../styles/UserHome.css";

function UserHome({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="user-home">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="nav-logo">🚗 CarRental</div>

        {/* Search Bar - Desktop & Tablet */}
        <div className="nav-search desktop-tablet-only">
          <input 
            type="text" 
            placeholder="Search by brand or price..." 
            className="search-input"
          />
          <button className="search-icon-btn">🔍</button>
        </div>

        {/* Hamburger - Visible on Mobile */}
        <div 
          className={`hamburger ${menuOpen ? "toggle" : ""}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="active" onClick={handleLinkClick}>Home</li>
          <li onClick={handleLinkClick}>Browse</li>
          <li onClick={handleLinkClick}>My Bookings</li>
          <li onClick={handleLinkClick}>Support</li>
          {/* Logout shown only in mobile drawer */}
          <li className="mobile-logout" onClick={() => { onLogout(); handleLinkClick(); }}>
            Logout
          </li>
        </ul>

        {/* Right Side - Desktop Only */}
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

            {/* Mobile-Only Search Bar (Matches image_700791.jpg) */}
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