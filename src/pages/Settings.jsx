import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="settings-page-container">
      <div className="section-header">
        <h2>Account Settings</h2>
      </div>

      <div className="settings-content glass-morphism">
        {/* Notifications Section */}
        <section className="settings-section">
          <div className="section-title">
            <h3>Notifications</h3>
            <p>Control how you receive alerts and updates.</p>
          </div>
          <div className="settings-group">
            <div className="setting-item">
              <div className="item-info">
                <strong>Email Bookings</strong>
                <span>Notify me when a new car booking is made</span>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="settings-section">
          <div className="section-title">
            <h3>Security</h3>
            <p>Manage your password and account protection.</p>
          </div>
          <div className="settings-group">
            <div className="password-grid">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
            </div>
            <button className="update-btn">Update Password</button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger-zone">
          <div className="section-title">
            <h3>Danger Zone</h3>
            <p>Permanent actions regarding your owner account.</p>
          </div>
          <div className="settings-group danger-box">
            <p>Once you delete your account, there is no going back. All listed cars and history will be permanently removed.</p>
            <button className="delete-btn">Delete Account</button>
          </div>
        </section>
      </div>

      <button className="back-btn-pill" onClick={() => navigate("/owner")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default Settings;