import React from "react";
// import Requests from "../components/Requests";
// import Declines from "../components/Declines";
// import SupplierProductList from "../components/SupplierProductList";

const SupplierDashboard = () => {
  return (
    <div className="supplier-dashboard">
      <h2>Supplier Dashboard</h2>
      <div className="dashboard-section">
        {/* <Requests /> */}
        <div className="placeholder">Requests (coming soon)</div>
      </div>
      <div className="dashboard-section">
        {/* <Declines /> */}
        <div className="placeholder">Declines (coming soon)</div>
      </div>
      <div className="dashboard-section">
        {/* <SupplierProductList /> */}
        <div className="placeholder">Product List & Price Range (coming soon)</div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
