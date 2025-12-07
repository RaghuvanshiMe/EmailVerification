import { useState } from "react";
import { sendOTP, verifyOTP } from "./api";
import "./index.css";

function App() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
  if (!email || !name || !password) {
    setMessage("All fields are required.");
    return;
  }

  try {
    setLoading(true);
    setMessage("");

    const res = await sendOTP(name, email, password);

    setMessage(res.message || "OTP sent successfully.");
    if (res.success) setStep(2);
  } catch (error) {
    setMessage("Failed to send OTP. Check backend.");
  } finally {
    setLoading(false);
  }
};




  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await verifyOTP(email, otp);
      setMessage(res.message || "OTP verified.");

      if (res.success) setStep(3);
    } catch (error) {
      setMessage("Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <h2 className="title">Email OTP Registration</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="fade-in">
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn" onClick={handleSendOTP} disabled={loading}>
              {loading ? "Sending..." : "Register & Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2 - Beautiful OTP Block */}
        {step === 2 && (
          <div className="fade-in otp-block">
            <p className="otp-info">OTP sent to <b>{email}</b></p>

            <input
              type="text"
              className="input otp-input"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="btn verify-btn" onClick={handleVerify} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* STEP 3 SUCCESS */}
        {step === 3 && (
          <p className="success-text fade-in">🎉 OTP Verified & Registration Complete!</p>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
