import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRawMaterials } from "../context/RawMaterialsContext";
import { Link, useNavigate } from 'react-router-dom';
import "./SupplierDashboard.css";

const SupplierNavbar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
  };
  return (
    <nav className="navbar supplier-navbar">
      <div className="navbar-logo">
        <Link to="/supplier-dashboard">Supplier Dashboard</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/supplier-dashboard">Overview</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/market-prices">Market Prices</Link></li>
        <li><Link to="/track-orders">Track Orders</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    stock: "",
    unit: "kg",
    supplier: "Your Company"
  });
  
  const { user, role, logout } = useAuth();
  const { rawMaterials, addProductToRawMaterial, getRawMaterialOptions, getSupplierProducts } = useRawMaterials();

  // Debug information
  console.log("SupplierDashboard rendered");
  console.log("User:", user);
  console.log("Role:", role);

  // Get available raw materials for dropdown
  const rawMaterialOptions = getRawMaterialOptions();

  // Mock data for supplier dashboard
  const supplierStats = [
    { icon: "📦", label: "Total Products", value: "24", change: "+12%" },
    { icon: "📈", label: "Monthly Sales", value: "₹45,000", change: "+8%" },
    { icon: "🛒", label: "Active Orders", value: "15", change: "+5%" },
    { icon: "⭐", label: "Rating", value: "4.8", change: "+0.2" }
  ];

  const recentOrders = [
    { id: "ORD001", customer: "Vendor A", items: 5, total: "₹1,200", status: "Delivered" },
    { id: "ORD002", customer: "Vendor B", items: 3, total: "₹800", status: "In Transit" },
    { id: "ORD003", customer: "Vendor C", items: 8, total: "₹2,100", status: "Processing" }
  ];

  // Get supplier's products from raw materials
  const supplierProducts = getSupplierProducts(user?.username || "Your Company");

  // Get all products from raw materials for display
  const allProducts = Object.keys(rawMaterials).flatMap(material => 
    rawMaterials[material].products.map(product => ({
      ...product,
      rawMaterial: material,
      rawMaterialIcon: rawMaterials[material].icon
    }))
  );

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    if (!selectedRawMaterial) {
      alert("Please select a raw material category");
      return;
    }
    
    // Create new product with unique ID
    const productToAdd = {
      ...newProduct,
      id: `${selectedRawMaterial.toLowerCase()}_${Date.now()}`,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      popularity: Math.floor(Math.random() * 30) + 70, // Random popularity
      supplier: user?.username || "Your Company",
      rawMaterial: selectedRawMaterial,
      rawMaterialIcon: rawMaterials[selectedRawMaterial].icon
    };

    // Add to raw materials using context
    addProductToRawMaterial(selectedRawMaterial, productToAdd);
    
    // Reset form and close modal
    setNewProduct({
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      stock: "",
      unit: "kg",
      supplier: "Your Company"
    });
    setSelectedRawMaterial("");
    setShowAddProductModal(false);
    
    // Show success message
    alert("Product added successfully! Market prices will update in real-time.");
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      "vegetables": "🥬",
      "fruits": "🍎",
      "grains": "🌾",
      "oils": "🛢️",
      "dairy": "🥛",
      "bakery": "🍞",
      "dry-fruits": "🥜",
      "meat": "🍗"
    };
    return iconMap[category] || "📦";
  };

  return (
    <div className="supplier-dashboard">
      {/* Debug info - remove this later */}
      <div style={{ 
        background: '#ffeb3b', 
        padding: '10px', 
        margin: '10px', 
        borderRadius: '5px',
        fontSize: '12px'
      }}>
        Debug: User={user?.username || 'None'}, Role={role || 'None'}
      </div>
      
      <SupplierNavbar />

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="stats-grid">
              {supplierStats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                    <small style={{ color: "#28a745" }}>{stat.change}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-sections">
              <div className="recent-orders-section">
                <div className="section-header">
                  <h2>Recent Orders</h2>
                  <button className="view-all-link">View All</button>
                </div>
                <div className="orders-list">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <h4>{order.id}</h4>
                        <p>{order.customer}</p>
                      </div>
                      <div className="order-details">
                        <span className="order-items">{order.items} items</span>
                        <span className="order-total">{order.total}</span>
                        <span className={`order-status ${order.status.toLowerCase().replace(" ", "-")}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-actions-section">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions">
                  <button
                    className="action-btn"
                    onClick={() => setShowAddProductModal(true)}
                  >
                    <span className="action-icon">➕</span>
                    Add New Product
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📊</span>
                    View Analytics
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">📧</span>
                    Contact Support
                  </button>
                  <button className="action-btn" onClick={logout}>
                    <span className="action-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="products-tab">
            <div className="tab-header">
              <h2>Your Products</h2>
              <button className="btn-primary" onClick={() => setShowAddProductModal(true)}>
                Add New Product
              </button>
            </div>
            <div className="products-grid">
              {allProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <span className="product-emoji">{product.rawMaterialIcon || product.image}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="product-stock">Stock: {product.stock} {product.unit}</p>
                    {product.rawMaterial && (
                      <p className="product-category">Category: {product.rawMaterial}</p>
                    )}
                  </div>
                  <div className="product-pricing">
                    <div className="price-container">
                      <span className="current-price">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "market" && (
          <div className="market-tab">
            <div className="tab-header">
              <h2>Market Price Impact</h2>
              <p>Your products affect real-time market prices</p>
            </div>
            <div className="market-impact-grid">
              {Object.keys(rawMaterials).map((material) => {
                const products = rawMaterials[material].products;
                const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
                const averagePrice = totalPrice / products.length;
                const supplierProductsInCategory = products.filter(
                  p => p.supplier === "Your Company" || p.supplier.includes("Fresh")
                );
                
                return (
                  <div key={material} className="market-impact-card">
                    <div className="impact-header">
                      <span className="material-icon">{rawMaterials[material].icon}</span>
                      <h3>{material}</h3>
                    </div>
                    <div className="impact-stats">
                      <div className="stat">
                        <span className="stat-label">Average Price</span>
                        <span className="stat-value">₹{Math.round(averagePrice)}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Your Products</span>
                        <span className="stat-value">{supplierProductsInCategory.length}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Total Products</span>
                        <span className="stat-value">{products.length}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-tab">
            <h2>Order Management</h2>
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {recentOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <span>{order.id}</span>
                  <span>{order.customer}</span>
                  <span>{order.items}</span>
                  <span>{order.total}</span>
                  <span>
                    <span className={`status-badge ${order.status.toLowerCase().replace(" ", "-")}`}>
                      {order.status}
                    </span>
                  </span>
                  <span>
                    <button className="btn-small">View</button>
                    <button className="btn-small">Update</button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <div className="inventory-tab">
            <h2>Inventory Management</h2>
            <div className="inventory-grid">
              {supplierProducts.map((product) => (
                <div key={product.id} className="inventory-card">
                  <div className="inventory-item">
                    <span className="product-emoji">{product.rawMaterialIcon || product.image}</span>
                    <div className="inventory-info">
                      <h4>{product.name}</h4>
                      <p>Current Stock: {product.stock} {product.unit}</p>
                    </div>
                  </div>
                  <div className="inventory-actions">
                    <input
                      type="number"
                      className="stock-input"
                      placeholder="New stock"
                      min="0"
                    />
                    <button className="btn-update">Update</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal-overlay" onClick={() => setShowAddProductModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddProductModal(false)}
              >
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Raw Material Category</label>
                <select
                  value={selectedRawMaterial}
                  onChange={(e) => setSelectedRawMaterial(e.target.value)}
                  required
                >
                  <option value="">Select Raw Material</option>
                  {rawMaterialOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={newProduct.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select
                    name="unit"
                    value={newProduct.unit}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="kg">kg</option>
                    <option value="liter">liter</option>
                    <option value="dozen">dozen</option>
                    <option value="pack">pack</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Link to="/booking">Go to Booking System</Link>
    </div>
  );
};

export default SupplierDashboard;
