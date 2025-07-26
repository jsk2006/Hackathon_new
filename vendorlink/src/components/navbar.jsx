import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../index.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dynamic-price?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
          <li><Link to="/vendor">Vendor Dashboard</Link></li>
          <li><Link to="/supplier">Supplier Dashboard</Link></li>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
