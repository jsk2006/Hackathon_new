import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./VendorNavbar.css"; // Use a dedicated CSS file for clarity

const VendorNavbar = () => {
  const { signOut } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/"); // optional redirect after logout
  };

  return (
    <nav className="vendor-navbar">
      <div className="vendor-logo">
        <Link to="/">Vendor Dashboard</Link>
      </div>
      <ul className="vendor-links">
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/dynamic-price">Products</Link></li>
        <li><Link to="/market-prices">Market Prices</Link></li>
        <li>
          <Link to="/cart">
            Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
        </li>
        <li><Link to="/track-orders">Track Orders</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default VendorNavbar;
