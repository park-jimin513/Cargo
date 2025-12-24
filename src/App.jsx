import { useState, useEffect } from "react";
import "./App.css";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";

import UserHome from "./pages/UserHome";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const [page, setPage] = useState("home"); // home | user | owner

  // 🔁 Check localStorage on mount
  useEffect(() => {
    const storedPage = localStorage.getItem("page");
    if (storedPage) setPage(storedPage);
  }, []);

  // 🔁 Save page to localStorage whenever it changes
  useEffect(() => {
    if (page === "home") localStorage.removeItem("page");
    else localStorage.setItem("page", page);
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("page");
    setPage("home");
  };

  // 🔁 PAGE REDIRECT
  if (page === "user") {
    return <UserHome onLogout={handleLogout} />;
  }

  if (page === "owner") {
    return <OwnerDashboard onLogout={handleLogout} />;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <video autoPlay loop muted className="bg-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <nav className="navbar">
        <div className="nav-left">
          <h1>Drive Your Dream Car</h1>
        </div>

        <div className="nav-middle">
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <input
              type="text"
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </form>
        </div>

        <div className="nav-right">
          {!page || page === "home" ? (
            <>
              <button className="nav-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
              <button className="nav-btn" onClick={() => setShowRegister(true)}>
                Register
              </button>
            </>
          ) : (
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="content">
        <h2>Welcome!</h2>
        <p>Start building your Car Rental App 🚗</p>
      </main>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={(role) => {
            const targetPage = role === "user" ? "user" : "owner";
            setPage(targetPage);
            localStorage.setItem("page", targetPage);
            setShowLogin(false);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showForgot && (
        <ForgotPasswordModal
          onClose={() => setShowForgot(false)}
          onBackToLogin={() => {
            setShowForgot(false);
            setShowLogin(true);
          }}
          onBackToRegister={() => {
            setShowForgot(false);
            setShowRegister(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
