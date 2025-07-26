import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import DynamicPricePage from "./pages/DynamicPricePage";
import CartPage from "./pages/CartPage";
import OrderTracking from "./pages/OrderTracking";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Main App Component
function AppContent() {
  const { user, role } = useAuth();
  const isHomePage = window.location.pathname === "/";
  const isLoginPage = window.location.pathname === "/login";
  const isDashboardPage = window.location.pathname === "/vendor" || window.location.pathname === "/supplier";
  
  // Only show navbar on homepage
  const showNavbar = isHomePage;
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
          <ProtectedRoute allowedRoles={['supplier']}>
            <SupplierDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dynamic-price" element={<DynamicPricePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-orders" element={<OrderTracking />} />
      </Routes>
      {showFooter && <Footer />}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
