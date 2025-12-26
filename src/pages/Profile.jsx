import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ownerProfileImage");
      if (stored) setProfileImage(stored);
    } catch (e) {
      // ignore
    }
  }, []);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview immediately using an object URL
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(objectUrl);

      // Compress image client-side to reduce size before storing
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          try {
            const MAX_DIM = 800; // max width/height
            let { width, height } = img;
            if (width > MAX_DIM || height > MAX_DIM) {
              const ratio = width / height;
              if (ratio > 1) {
                width = MAX_DIM;
                height = Math.round(MAX_DIM / ratio);
              } else {
                height = MAX_DIM;
                width = Math.round(MAX_DIM * ratio);
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // Try JPEG at quality 0.8 first
            let dataUrl = canvas.toDataURL("image/jpeg", 0.8);

            // If still too large for localStorage, try lower quality
            try {
              localStorage.setItem("ownerProfileImage", dataUrl);
            } catch (err) {
              // try lower quality
              try {
                dataUrl = canvas.toDataURL("image/jpeg", 0.6);
                localStorage.setItem("ownerProfileImage", dataUrl);
              } catch (err2) {
                // fallback: don't persist, just preview
                console.warn("Profile image too large to persist locally.", err2);
                // Optionally inform the user
                alert("Image is too large to save locally — it will be previewed but not persisted. Consider choosing a smaller image.");
              }
            }
          } catch (err) {
            console.error("Image processing failed:", err);
          }
        };
        img.onerror = (e) => console.error("Failed to load image for compression", e);
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
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
            {profileImage && (
              <button
                className="remove-photo-btn"
                onClick={() => {
                  setProfileImage(null);
                  try {
                    localStorage.removeItem("ownerProfileImage");
                  } catch (e) {}
                }}
                style={{
                  marginTop: 12,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Remove Photo
              </button>
            )}
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