import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("vendor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "vendor") {
      navigate("/vendor");
    } else {
      navigate("/supplier");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          I am a:
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="vendor">Vendor</option>
            <option value="supplier">Supplier</option>
          </select>
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
