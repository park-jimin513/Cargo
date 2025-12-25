// LoginModal.jsx
import { useState } from "react";
import "../styles/Modal.css";
import { useAuth } from "../context/AuthContext";

function LoginModal({ onClose, onSwitchToRegister, onSwitchToLogin, onLoginSuccess }) {
  const [role, setRole] = useState("user"); // user | owner
  const auth = useAuth();
  const [step, setStep] = useState("login"); // login | forgot | reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ NEW
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Forgot/reset states
  const [otpSentTo, setOtpSentTo] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Login
  const handleLogin = async () => {
    setMessage(null);
    const trimmedEmail = String(email || "").trim();
    const emailIsValid = /\S+@\S+\.\S+/.test(trimmedEmail);

    if (!trimmedEmail || !password) {
      setMessage({ type: "error", text: "Email and password required." });
      return;
    }
    if (!emailIsValid) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://carrentalbackend-ndkk.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail.toLowerCase(), password, role }),
      });
      const data = await res.json();

      if (data.ok) {
        auth && auth.login({ token: data.token, role });
        setMessage({ type: "success", text: "Logged in successfully." });
        onLoginSuccess && onLoginSuccess(role);
        setTimeout(onClose, 800);
      } else {
        setMessage({ type: "error", text: data.message || "Login failed" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setMessage(null);
    const trimmedEmail = String(email || "").trim();
    const emailIsValid = /\S+@\S+\.\S+/.test(trimmedEmail);

    if (!trimmedEmail) {
      setMessage({ type: "error", text: "Please enter your email." });
      return;
    }
    if (!emailIsValid) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://carrentalbackend-ndkk.onrender.com/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail.toLowerCase() }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessage({ type: "success", text: "OTP sent to your email." });
        setOtpSentTo(email);
        setTimeout(() => setStep("reset"), 600);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to send OTP" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    setMessage(null);

    if (!otp || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://carrentalbackend-ndkk.onrender.com/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpSentTo, otp, newPassword }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessage({ type: "success", text: "Password reset successful. Please login." });
        setTimeout(() => {
          setStep("login");
          setPassword("");
          setOtp("");
          setNewPassword("");
          setConfirmPassword("");
          setMessage(null);
        }, 1000);
      } else {
        setMessage({ type: "error", text: data.message || "Reset failed" });
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

        {step === "login" && (
          <>
            <div className="role-switch">
              <button className={role === "user" ? "role-btn active" : "role-btn"} onClick={() => setRole("user")}>
                User
              </button>
              <button className={role === "owner" ? "role-btn active" : "role-btn"} onClick={() => setRole("owner")}>
                Car Owner
              </button>
            </div>

            <h2>{role === "user" ? "User Login" : "Car Owner Login"}</h2>

            <input
              type="email"
              placeholder="Email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* 👁️ Password with toggle */}
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="modal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  userSelect: "none",
                  fontSize: "18px",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {role === "owner" && (
              <input
                type="text"
                placeholder="Company Name (Optional)"
                className="modal-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            )}

            <button className="modal-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="forgot-link">
              <a href="#" onClick={(e) => { e.preventDefault(); setStep("forgot"); }}>
                Forgot Password?
              </a>
            </p>

            <p className="switch-link">
              Don’t have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister && onSwitchToRegister(); }}>
                Register
              </a>
            </p>
          </>
        )}

        {step === "forgot" && (
          <>
            <h2>Forgot Password</h2>
            <p>Please enter your email to receive an OTP.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="modal-btn" onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <h2>Reset Password</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              className="modal-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="modal-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="modal-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="modal-btn" onClick={handleResetPassword} disabled={loading}>
              {loading ? "Saving..." : "Save Password"}
            </button>
          </>
        )}

        {message && <p className={`modal-message ${message.type}`}>{message.text}</p>}
      </div>
    </div>
  );
}

export default LoginModal;
