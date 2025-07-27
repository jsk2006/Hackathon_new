import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RawMaterialsProvider } from "./context/RawMaterialsContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VendorDashboard from "./pages/VendorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import DynamicPricePage from "./pages/DynamicPricePage";
import CartPage from "./pages/CartPage";
import OrderTracking from "./pages/OrderTracking";
import MarketPrices from "./pages/MarketPrices";
import BookingPage from "./pages/BookingPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function AppContent() {
  const path = window.location.pathname;
  const isHomePage = path === "/";
  const isLoginPage = path === "/login";
  const isDashboardPage = path.includes("dashboard");

  const showNavbar = !isLoginPage && !isDashboardPage;
  const showFooter = isHomePage;

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier-dashboard"
          element={
            <ProtectedRoute>
              <SupplierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/dynamic-price" element={<DynamicPricePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-orders" element={<OrderTracking />} />
        <Route path="/market-prices" element={<MarketPrices />} />
      </Routes>
      {showFooter && <Footer />}
    </>
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
