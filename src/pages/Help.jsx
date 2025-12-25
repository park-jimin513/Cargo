import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Help.css";

const Help = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request received: " + message);
    setMessage("");
  };

  return (
    <div className="my-cars-container">
      <div className="section-header">
        <h2>Help & Support</h2>
      </div>

      <div
        className="cars-grid"
        style={{ gridTemplateColumns: "1fr", gap: "20px" }}
      >
        {/* FAQ Cards */}
        <div className="car-card glass-morphism" style={{ padding: "20px" }}>
          <h3>❓ How do I list a new car?</h3>
          <p style={{ color: "#ccc", marginTop: "10px" }}>
            Navigate to the Dashboard and click the "Add New Car" button. Fill in
            the details and upload a photo.
          </p>
        </div>

        <div className="car-card glass-morphism" style={{ padding: "20px" }}>
          <h3>💰 When will I receive my earnings?</h3>
          <p style={{ color: "#ccc", marginTop: "10px" }}>
            Earnings are typically processed 24-48 hours after a booking is
            successfully completed.
          </p>
        </div>

        {/* Support Form */}
        <div
          className="form-container glass-morphism"
          style={{ maxWidth: "100%", marginTop: "20px" }}
        >
          <h3>Contact Support</h3>

          <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{ width: "100%" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
            <button className="back-btn" onClick={() => navigate("/owner")}>← Back</button>
    </div>
  );
};

export default Help;
