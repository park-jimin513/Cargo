import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-page-container">
      <div className="section-header">
        <h2>Owner Profile</h2>
      </div>

      <div className="profile-content glass-morphism">
        {/* Sidebar with New Photo Design */}
        <div className="profile-sidebar">
          <div className="avatar-portal">
            <label htmlFor="profile-upload" className="portal-label">
              <div className="portal-circle">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="user-photo" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">Upload Photo</span>
                  </div>
                )}
              </div>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden-input"
            />
          </div>
          <div className="sidebar-info">
            <h3>Admin Owner</h3>
            <p>Managing Fleet Since 2025</p>
          </div>
        </div>

        {/* Form Fields */}
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue="Admin Owner" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue="owner@carrental.com" />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" defaultValue="+1 234 567 890" />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" defaultValue="New York, USA" />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Update Profile
            </button>
          </div>
        </form>
      </div>

      <button className="back-btn-pill" onClick={() => navigate("/owner")}>
        ← Back
      </button>
    </div>
  );
};

export default Profile;