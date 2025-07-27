import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../index.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dynamic-price?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">VendorLink</Link>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dynamic-price">Products</Link></li>
          <li><Link to="/market-prices">Market Prices</Link></li>
        </ul>
        <div className="navbar-actions">
          <Link to="/track-orders" className="track-orders-btn">
            📦 Track Orders
          </Link>
          <Link to="/cart" className="cart-icon">
            🛒
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
          {!user ? (
            <button className="login-btn" onClick={handleLogin}>Login</button>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
