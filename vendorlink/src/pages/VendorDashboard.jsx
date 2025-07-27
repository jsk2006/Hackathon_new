import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./VendorDashboard.css";
import VendorNavbar from "./Vendornavbar";




const VendorDashboard = () => {
  const { items, getCartTotal, getCartCount } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for dashboard
  const recentOrders = [
    { id: "ORD001", date: "2024-01-15", status: "delivered", total: 450, items: 3 },
    { id: "ORD002", date: "2024-01-14", status: "in-transit", total: 320, items: 2 },
    { id: "ORD003", date: "2024-01-13", status: "processing", total: 280, items: 4 }
  ];

  const quickStats = [
    { label: "Total Orders", value: "24", icon: "📦" },
    { label: "This Month", value: "₹12,450", icon: "💰" },
    { label: "Items in Cart", value: getCartCount().toString(), icon: "🛒" },
    { label: "Cart Total", value: `₹${getCartTotal()}`, icon: "💳" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'in-transit': return '#007bff';
      case 'processing': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="vendor-dashboard">
      <VendorNavbar />
      <div className="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <p>Manage your orders, track deliveries, and view your business analytics.</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          🛒 Cart ({getCartCount()})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              {quickStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-sections">
              <div className="recent-orders-section">
                <div className="section-header">
                  <h2>Recent Orders</h2>
                  <Link to="/track-orders" className="view-all-link">
                    View All →
                  </Link>
                </div>
                <div className="orders-list">
                  {recentOrders.map(order => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <h4>Order #{order.id}</h4>
                        <p>{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="order-details">
                        <span className="order-items">{order.items} items</span>
                        <span className="order-total">₹{order.total}</span>
                        <span
                          className="order-status"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <Link to="/dynamic-price" className="action-btn">
                    <span className="action-icon">🛍️</span>
                    Browse Products
                  </Link>
                  <Link to="/cart" className="action-btn">
                    <span className="action-icon">🛒</span>
                    View Cart
                  </Link>
                  <Link to="/track-orders" className="action-btn">
                    <span className="action-icon">📦</span>
                    Track Orders
                  </Link>
                  <Link to="/supplier" className="action-btn">
                    <span className="action-icon">🏪</span>
                    Supplier Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-tab">
            <div className="tab-header">
              <h2>Order History</h2>
              <Link to="/track-orders" className="btn-primary">
                Track Orders
              </Link>
            </div>
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Date</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
              </div>
              {recentOrders.map(order => (
                <div key={order.id} className="table-row">
                  <span>#{order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  <span>{order.items} items</span>
                  <span>₹{order.total}</span>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="cart-tab">
            <div className="tab-header">
              <h2>Shopping Cart</h2>
              <Link to="/cart" className="btn-primary">
                View Full Cart
              </Link>
            </div>
            {items.length > 0 ? (
              <div className="cart-preview">
                {items.slice(0, 3).map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <span className="product-emoji">{item.image}</span>
                    </div>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} • ₹{item.price}</p>
                    </div>
                    <div className="cart-item-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="cart-more">
                    <p>+{items.length - 3} more items</p>
                  </div>
                )}
                <div className="cart-summary">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <Link to="/cart" className="btn-checkout">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Start shopping to add items to your cart</p>
                <Link to="/dynamic-price" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Link to="/booking">Go to Booking System</Link>
    </div>
  );
};

export default VendorDashboard;
