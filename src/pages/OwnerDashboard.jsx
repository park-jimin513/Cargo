// OwnerDashboard.jsx
import "../styles/OwnerDashboard.css";

function OwnerDashboard({ onLogout }) {
  return (
    <div className="owner-dashboard">
      <nav className="home-nav">
        <h2>Owner Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="home-content">
        <h1>Welcome Car Owner 🚘</h1>
        <p>Manage your cars, prices, and bookings.</p>
      </div>
    </div>
  );
}

export default OwnerDashboard;
