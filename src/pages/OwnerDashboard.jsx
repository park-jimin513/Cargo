import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import "../styles/OwnerDashboard.css";

// ALL imports from pages folder
import AddCar from "./AddCar";
import MyCars from "./MyCars";
import Earnings from "./Earnings";
import Bookings from "./Bookings";
import Profile from "./Profile";
import Help from "./Help";
import Settings from "./Settings";

function OwnerDashboard({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [cars, setCars] = useState([]);

  return (
    <div className="owner-dashboard">
      <BrowserRouter>
        {/* NAVBAR */}
        <nav className="owner-navbar">
          <div className="nav-logo">
            🚘 Owner<span>Panel</span>
          </div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <NavLink
                to="/owner"
                end
                onClick={() => {
                  setShowAddCarForm(false);
                  setMenuOpen(false);
                }}
              >
                Dashboard
              </NavLink>
            </li>

            <li><NavLink to="/owner/mycars" onClick={() => setMenuOpen(false)}>My Cars</NavLink></li>
            <li><NavLink to="/owner/earnings" onClick={() => setMenuOpen(false)}>Earnings</NavLink></li>
            <li><NavLink to="/owner/bookings" onClick={() => setMenuOpen(false)}>Bookings</NavLink></li>
            <li><NavLink to="/owner/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink></li>
            <li><NavLink to="/owner/help" onClick={() => setMenuOpen(false)}>Help</NavLink></li>
            <li><NavLink to="/owner/settings" onClick={() => setMenuOpen(false)}>Settings</NavLink></li>

            <li className="mobile-only">
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </li>
          </ul>

          <div className="nav-right desktop-only">
            <div className="owner-info">
              <span className="owner-name">Owner</span><br/>
              <span className="owner-status">Verified</span>{/* You can add a verified icon here if desired */  }
            </div>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`bar ${menuOpen ? "open" : ""}`} />
            <div className={`bar ${menuOpen ? "open" : ""}`} />
            <div className={`bar ${menuOpen ? "open" : ""}`} />
          </div>
        </nav>

        {/* MAIN */}
        <main className="dashboard-hero">
          <div className="hero-overlay">
            <Routes>
              {/* Dashboard */}
              <Route
                path="/owner"
                element={
                  showAddCarForm ? (
                    <AddCar
                      onClose={() => setShowAddCarForm(false)}
                      onCarAdded={(newCar) =>
                        setCars((prev) => [newCar, ...prev])
                      }
                    />
                  ) : (
                    <div className="home-content">
                      <h1>Welcome, Car Owner 🚘</h1>
                      <p>Manage your fleet and revenue effortlessly.</p>

                      <div className="action-buttons">
                        <button
                          className="primary-btn"
                          onClick={() => setShowAddCarForm(true)}
                        >
                          Add New Car
                        </button>

                        <NavLink to="/owner/earnings">
                          <button className="secondary-btn">View Earnings</button>
                        </NavLink>
                      </div>
                    </div>
                  )
                }
              />

              {/* Other pages */}
              <Route
                path="/owner/mycars"
                element={<MyCars cars={cars} onAddNew={() => setShowAddCarForm(true)} />}
              />
              <Route path="/owner/earnings" element={<Earnings />} />
              <Route path="/owner/bookings" element={<Bookings />} />
              <Route path="/owner/profile" element={<Profile />} />
              <Route path="/owner/help" element={<Help />} />
              <Route path="/owner/settings" element={<Settings />} />

              <Route path="*" element={<Navigate to="/owner" replace />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default OwnerDashboard;
