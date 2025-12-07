const API = "https://emailotpv-production.up.railway.app"; 

export const sendOTP = async (name, email, password) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};


export const verifyOTP = async (email, otp) => {
  const res = await fetch(`${API}/auth/VerifyEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code: otp }),
  });
  return res.json();
};






















