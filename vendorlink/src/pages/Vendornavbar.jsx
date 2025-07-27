import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./vendornavbar.css";

const VendorNavbar = () => {
  const { signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/"); // Optional: Redirect to login/home after logout
  };

  return (
    <nav className="navbar vendor-navbar">
      <div className="navbar-logo">
        <Link to="/vendor-dashboard">Vendor Dashboard</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/vendor-dashboard">Overview</Link></li>
        <li><Link to="/dynamic-price">Products</Link></li>
        <li><Link to="/market-prices">Market Prices</Link></li>
        <li>
          <Link to="/cart">
            Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
        </li>
        <li><Link to="/track-orders">Track Orders</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default VendorNavbar;
