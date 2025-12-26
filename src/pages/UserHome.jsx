import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/UserHome.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function UserHome({ onLogout }) {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" fill="%23fff" font-size="20" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>';

  // Close menu when a link is clicked
  const handleLinkClick = () => setMenuOpen(false);
  
  useEffect(() => {
    fetch(`${API_BASE}/api/cars`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.cars) setCars(res.cars);
      })
      .catch((err) => console.error("fetch cars", err));
  }, []);

  const filteredCars = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return cars;
    return cars.filter((car) => {
      const name = (car.name || "").toString().toLowerCase();
      const brand = (car.brand || "").toString().toLowerCase();
      const priceStr = (car.price || "").toString().toLowerCase();

      if (name.includes(q) || brand.includes(q) || priceStr.includes(q)) return true;

      const num = Number(q.replace(/[^0-9.]/g, ""));
      if (!Number.isNaN(num) && Number(car.price) === num) return true;

      return false;
    });
  }, [cars, searchQuery]);

  // Note: removed accidental server-side mail test code (was causing browser errors).

  return (
    <div className="user-home">
      {/* Navbar */}
      <nav className="user-navbar">
        <div className="nav-logo">🚗 CarRental</div>

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
          <li onClick={handleLinkClick}>My Bookings</li>
          <li onClick={handleLinkClick}>Support</li>
          <li className="mobile-logout" onClick={() => { onLogout(); handleLinkClick(); }}>
            Logout
          </li>
        </ul>

        {/* Right Side - Desktop Only */}
        <div className="nav-right desktop-only">
          <span className="user-profile-name">{(auth && auth.user && (auth.user.name || auth.user.fullName)) || "User"}</span>
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

            {/* ✅ UPDATED: Search bar with button at the corner */}
            <div className="hero-search">
              <input
                type="text"
                placeholder="Search by name, brand or price..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    // filtering is automatic via state; keep input focused
                  }
                }}
              />
              <button
                className="hero-search-btn"
                onClick={() => {
                  // clicking search simply blurs the input to reveal results
                  const input = document.querySelector(".hero-search-input");
                  input && input.blur();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simple car list fetched from backend */}
      <section className="cars-section" style={{ padding: "40px 5%" }}>
        <h2 style={{ color: "#fff" }}>Available Cars</h2>
        <div className="cars-grid" style={{ marginTop: 20 }}>
          {cars.length === 0 ? (
            <p style={{ color: "#ccc" }}>No cars available right now.</p>
          ) : (
            filteredCars.length === 0 ? (
              <p style={{ color: "#ccc" }}>No cars match your search.</p>
            ) : (
              filteredCars.map((car) => (
                <div key={car._id || car.id} className="car-card glass-morphism">
                  <img src={car.imageUrl || car.image || placeholder} alt={car.name} />
                  <div className="car-info">
                    <h3>{car.brand} {car.name}</h3>
                    <p>${car.price}/day • {car.color}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default UserHome;
