import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">VendorLink</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Find Vendors</Link></li>
        <li><Link to="/login">Find Suppliers</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
