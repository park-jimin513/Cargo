import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "../styles/OwnerDashboard.css";

// ALL imports from pages folder
import AddCar from "./AddCar";
import MyCars from "./MyCars";
import ManageCars from "./ManageCars";
import Earnings from "./Earnings";
import Bookings from "./Bookings";
import Profile from "./Profile";
import Help from "./Help";
import Settings from "./Settings";

function OwnerDashboard({ onLogout }) {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [cars, setCars] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  useEffect(() => {
    // fetch cars from backend on mount
    fetch(`${API_BASE}/api/cars`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.cars) setCars(res.cars);
      })
      .catch((err) => console.error("fetch cars error", err));
  }, []);

  // Wrapper component rendered by the Route so we can use hooks like useNavigate
  function AddCarRouteWrapper({ setCars }) {
    const navigate = useNavigate();

    return (
      <AddCar
        onClose={() => navigate("/owner")}
        onCarAdded={(newCar) => setCars((prev) => [newCar, ...prev])}
      />
    );
  }

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
            <li><NavLink to="/owner/managecars" onClick={() => setMenuOpen(false)}>Manage Cars</NavLink></li>            
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
              <span className="owner-name">{(auth && auth.user && (auth.user.name || auth.user.fullName)) || "Owner"}</span><br/>
              <span className="owner-status">Verified</span>
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
                  <div className="home-content">
                    <h1>Welcome, Car Owner 🚘</h1>
                    <p>Manage your fleet and revenue effortlessly.</p>

                    <div className="action-buttons">
                      <NavLink to="/owner/add">
                        <button className="primary-btn">Add New Car</button>
                      </NavLink>

                      <NavLink to="/owner/earnings">
                        <button className="secondary-btn">View Earnings</button>
                      </NavLink>
                    </div>
                  </div>
                }
              />

              {/* Route for Add Car page */}
              <Route
                path="/owner/add"
                element={<AddCarRouteWrapper setCars={setCars} />}
              />

              {/* Other pages */}
              <Route
                path="/owner/mycars"
                element={<MyCars cars={cars} onAddNew={() => setShowAddCarForm(true)} />}
              />
              <Route
                path="/owner/managecars"
                element={<ManageCars cars={cars} setCars={setCars} />}
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
