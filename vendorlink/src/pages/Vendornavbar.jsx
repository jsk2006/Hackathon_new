// VendorNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./VendorNavbar.css";

const VendorNavbar = () => {
  return (
    <nav className="vendor-navbar">
      <div className="navbar-logo">
        <Link to="/">VendorLink</Link>
      </div>
      <h2 className="navbar-title">Vendor Dashboard</h2>
      <ul className="navbar-links">
        <li><Link to="/vendor/overview">Overview</Link></li>
        <li><Link to="/vendor/products">Products</Link></li>
        <li><Link to="/vendor/orders">Orders</Link></li>
        <li>
          <button className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default VendorNavbar;
