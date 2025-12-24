import "../styles/Modal.css";

function ForgotPasswordModal({ onClose, onBackToLogin, onBackToRegister }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Forgot Password</h2>
        <p>Please enter your email to receive an OTP.</p>

        <input 
          type="email" 
          placeholder="Enter your email" 
          className="modal-input" 
        />

        <button className="modal-btn">Send OTP</button>

        <div className="forgot-actions">
          <button className="secondary-btn" onClick={onBackToLogin}>⬅ Back to Login</button>
          <button className="secondary-btn" onClick={onBackToRegister}>⬅ Back to Register</button>
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
