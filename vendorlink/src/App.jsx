import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import DynamicPricePage from "./pages/DynamicPricePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
        <Route path="/dynamic-price" element={<DynamicPricePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
