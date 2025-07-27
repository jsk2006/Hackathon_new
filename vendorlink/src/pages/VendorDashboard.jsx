// src/pages/VendorDashboard.jsx
import React from "react";
import VendorNavbar from "../components/VendorNavbar";
import "./VendorDashboard.css";

const VendorDashboard = () => {
  return (
    <>
      <VendorNavbar />
      <div className="vendor-dashboard-content">
        {/* Your actual dashboard content goes here */}
        <h2>Welcome, Vendor!</h2>
        <p>Here's your dashboard overview...</p>
      </div>
    </>
  );
};

export default VendorDashboard;
