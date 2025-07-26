import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  
  const { login, selectRole } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    const result = login(formData.username, formData.password);
    
    if (result.success) {
      if (result.needsRole) {
        setShowRoleSelection(true);
      } else {
        // User has only one role, redirect directly
        navigate("/vendor");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    selectRole(role);
    
    // Redirect based on role
    if (role === "vendor") {
      navigate("/vendor");
    } else if (role === "supplier") {
      navigate("/supplier");
    }
  };

  const demoLogin = (username) => {
    setFormData({ username, password: "demo123" });
    const result = login(username, "demo123");
    
    if (result.success) {
      if (result.needsRole) {
        setShowRoleSelection(true);
      } else {
        navigate("/vendor");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to VendorLink</h1>
          <p>Your trusted platform for vendor management</p>
        </div>

        {!showRoleSelection ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="demo-accounts">
              <h3>Demo Accounts</h3>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn vendor"
                  onClick={() => demoLogin("vendor")}
                >
                  🛒 Vendor Demo
                </button>
                <button
                  type="button"
                  className="demo-btn supplier"
                  onClick={() => demoLogin("supplier")}
                >
                  🚚 Supplier Demo
                </button>
                <button
                  type="button"
                  className="demo-btn both"
                  onClick={() => demoLogin("both")}
                >
                  🔄 Both Roles Demo
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="role-selection">
            <h2>Select Your Role</h2>
            <p>Choose how you want to use the platform:</p>
            
            <div className="role-options">
              <button
                className={`role-btn vendor ${selectedRole === "vendor" ? "selected" : ""}`}
                onClick={() => handleRoleSelection("vendor")}
              >
                <span className="role-icon">🛒</span>
                <div className="role-info">
                  <h3>Vendor</h3>
                  <p>Manage orders, track inventory, view analytics</p>
                </div>
              </button>
              
              <button
                className={`role-btn supplier ${selectedRole === "supplier" ? "selected" : ""}`}
                onClick={() => handleRoleSelection("supplier")}
              >
                <span className="role-icon">🚚</span>
                <div className="role-info">
                  <h3>Supplier</h3>
                  <p>Upload products, manage inventory, view orders</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
