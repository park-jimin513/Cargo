// RegisterModal.jsx
import { useState } from "react";
import "../styles/Modal.css";

import { useAuth } from "../context/AuthContext";

function RegisterModal({ onClose, onSwitchToLogin }) {
  const auth = useAuth();
  const [role, setRole] = useState("user"); // user | owner
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessLicenseId, setBusinessLicenseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegister = async () => {
    setMessage(null);
    if (!fullName || !email || !password || !phone) {
      setMessage({ type: "error", text: "Please fill required fields." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://carrentalbackend-ndkk.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          fullName,
          email,
          password,
          phone,
          companyName: companyName || undefined,
          businessLicenseId: businessLicenseId || undefined
        })
      });
      const data = await res.json();
      if (data.ok) {
        setMessage({ type: "success", text: "Registered successfully. You can now login." });
        // optionally auto-login user after register (if backend returns token)
        if (data.token) {
          const payload = { token: data.token, role };
          // prefer backend user info, fall back to entered fullName
          if (data.user) payload.name = data.user.fullName || data.user.name;
          else payload.name = fullName || undefined;
          auth && auth.login(payload);
        }
        // optionally close and open login after a short time
        setTimeout(() => {
          onClose();
          onSwitchToLogin && onSwitchToLogin();
        }, 1200);
      } else {
        setMessage({ type: "error", text: data.message || "Registration failed" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>✖</button>

        {/* Role Switch */}
        <div className="role-switch">
          <button className={role === "user" ? "role-btn active" : "role-btn"} onClick={() => setRole("user")}>User</button>
          <button className={role === "owner" ? "role-btn active" : "role-btn"} onClick={() => setRole("owner")}>Car Owner</button>
        </div>

        <h2>{role === "user" ? "User Register" : "Car Owner Register"}</h2>

        <input type="text" placeholder="Full Name" className="modal-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" className="modal-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="modal-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Phone Number" className="modal-input" value={phone} onChange={(e) => setPhone(e.target.value)} />

        {role === "owner" && (
          <>
            <input type="text" placeholder="Company Name (Optional)" className="modal-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <input type="text" placeholder="Business License ID (Optional)" className="modal-input" value={businessLicenseId} onChange={(e) => setBusinessLicenseId(e.target.value)} />
          </>
        )}

        <button className="modal-btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className={`modal-message ${message.type}`}>{message.text}</p>}

        <p className="switch-link">
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin && onSwitchToLogin(); }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterModal;
