import React, { useState } from "react";
import { useRawMaterials } from "../context/RawMaterialsContext";
import { useCart } from "../context/CartContext";
import "./DynamicPricePage.css";
import "./Toast.css"; // ✅ Toast styles

const DynamicPricePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [viewMode, setViewMode] = useState("grid");
  const [notification, setNotification] = useState(null); // ✅ toast state

  const { rawMaterials, allProducts, marketTrends } = useRawMaterials();
  const { addToCart, items } = useCart(); // ✅ access cart items

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleAddToCart = (product) => {
    const alreadyInCart = items.find((item) => item.id === product.id);
    if (alreadyInCart) {
      showToast("❌ Item already in cart", "error");
    } else {
      addToCart(product);
      showToast("✅ Added to cart", "success");
    }
  };

  const categories = [
    "all",
    ...[...new Set(allProducts.map(product => product.rawMaterial))]
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.rawMaterial === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name": return a.name.localeCompare(b.name);
      case "popularity": return b.popularity - a.popularity;
      default: return a.price - b.price;
    }
  });

  const getTrendIcon = (trend) => trend === "up" ? "📈" : trend === "down" ? "📉" : "➡️";
  const getTrendColor = (trend) => trend === "up" ? "#dc3545" : trend === "down" ? "#28a745" : "#6c757d";
  const calculateDiscount = (originalPrice, currentPrice) =>
    Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <div className="dynamic-price-container">
      {/* ✅ Toast */}
      {notification && (
        <div className={`toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="page-header">
        <h1>🛒 Dynamic Price Products</h1>
        <p>Browse all products with real-time pricing and market trends</p>
      </div>

      <div className="controls-section">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-filter">
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-filter">
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="popularity">Most Popular</option>
          </select>

          <div className="view-toggle">
            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              📱 Grid
            </button>
            <button className={`view-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>
              📋 Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="products-grid">
          {sortedProducts.map((product) => {
            const trend = marketTrends[product.rawMaterial];
            const discount = calculateDiscount(product.originalPrice, product.price);

            return (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <span className="product-emoji">{product.rawMaterialIcon}</span>
                  {trend && (
                    <div className="trend-indicator" style={{ color: getTrendColor(trend.trend) }}>
                      {getTrendIcon(trend.trend)} {trend.change}
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="category-tag">{product.rawMaterial}</span>
                    <span className="stock-info">Stock: {product.stock} {product.unit}</span>
                  </div>
                </div>

                <div className="price-section">
                  <div className="current-price">₹{product.price}</div>
                  {product.originalPrice > product.price && (
                    <div className="price-details">
                      <span className="original-price">₹{product.originalPrice}</span>
                      <span className="discount-badge">-{discount}%</span>
                    </div>
                  )}
                </div>

                <div className="product-footer">
                  <span className="supplier-name">by {product.supplier}</span>
                  {trend && <span className="trend-reason">{trend.reason}</span>}
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Raw Material</th>
                <th>Product</th>
                <th>Current Price</th>
                <th>Original Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Trend</th>
                <th>Supplier</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => {
                const trend = marketTrends[product.rawMaterial];
                const discount = calculateDiscount(product.originalPrice, product.price);

                return (
                  <tr key={product.id}>
                    <td><span className="material-emoji">{product.rawMaterialIcon}</span> {product.rawMaterial}</td>
                    <td>
                      <div className="product-name">{product.name}</div>
                      <div className="product-desc">{product.description}</div>
                    </td>
                    <td>₹{product.price}</td>
                    <td>₹{product.originalPrice}</td>
                    <td>
                      {product.originalPrice > product.price ? (
                        <span className="discount-badge">-{discount}%</span>
                      ) : "-"}
                    </td>
                    <td>{product.stock} {product.unit}</td>
                    <td>
                      {trend ? (
                        <span style={{ color: getTrendColor(trend.trend) }}>
                          {getTrendIcon(trend.trend)} {trend.change}
                        </span>
                      ) : "-"}
                    </td>
                    <td>{product.supplier}</td>
                    <td>
                      <button onClick={() => handleAddToCart(product)}>🛒</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sortedProducts.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default DynamicPricePage;