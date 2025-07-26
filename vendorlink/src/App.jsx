import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RawMaterialsProvider } from "./context/RawMaterialsContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import DynamicPricePage from "./pages/DynamicPricePage";
import CartPage from "./pages/CartPage";
import OrderTracking from "./pages/OrderTracking";
import MarketPrices from "./pages/MarketPrices";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();
  
  console.log("ProtectedRoute - User:", user, "Role:", role, "Allowed roles:", allowedRoles);
  
  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log("User role not allowed, redirecting to home");
    return <Navigate to="/" replace />;
  }
  
  console.log("Access granted to protected route");
  return children;
};

// Main App Component
function AppContent() {
  const { user, role } = useAuth();
  const isHomePage = window.location.pathname === "/";
  const isLoginPage = window.location.pathname === "/login";
  const isDashboardPage = window.location.pathname === "/vendor" || window.location.pathname === "/supplier";
  
  // Show navbar on all pages except login
  const showNavbar = !isLoginPage;
  const showFooter = isHomePage;

  return (
    <Router>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/supplier" element={
          <SupplierDashboard />
        } />
        <Route path="/dynamic-price" element={<DynamicPricePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-orders" element={<OrderTracking />} />
        <Route path="/market-prices" element={<MarketPrices />} />
      </Routes>
      {showFooter && <Footer />}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RawMaterialsProvider>
          <AppContent />
        </RawMaterialsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
