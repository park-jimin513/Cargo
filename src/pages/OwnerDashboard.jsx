import React, { useState } from "react";
import "../styles/OwnerDashboard.css";

function OwnerDashboard({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="owner-dashboard">
      {/* Glass Navbar */}
      <nav className="owner-navbar">
        <div className="nav-logo">🚘 Owner<span>Panel</span></div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="active">Dashboard</li>
          <li>My Cars</li>
          <li>Earnings</li>
          <li>Bookings</li>
          <li className="mobile-only" onClick={onLogout}>Logout</li>
        </ul>

        <div className="nav-right desktop-only">
          <div className="owner-info">
            <span className="owner-name">Admin Owner</span>
            <span className="owner-status">Verified</span>
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-hero">
        <div className="hero-overlay">
          <div className="home-content">
            <h1>Welcome, Car Owner 🚘</h1>
            <p>Manage your fleet, track revenue, and handle bookings effortlessly.</p>
            
            {/* Dashboard Quick Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>12</h3>
                <p>Active Cars</p>
              </div>
              <div className="stat-card">
                <h3>$4,250</h3>
                <p>This Month</p>
              </div>
              <div className="stat-card">
                <h3>4.9 ★</h3>
                <p>Rating</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="primary-btn">Add New Car</button>
              <button className="secondary-btn">View Earnings</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;