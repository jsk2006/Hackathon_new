import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products, categories, sortOptions } from "../data/products";
import "./DynamicPricePage.css";

const DynamicPricePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  const { addToCart } = useCart();

  // Get search term from URL
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "stock":
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      case "popularity":
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchParams({ search: value });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationMessage(`${product.name} added to cart!`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      "vegetables": "Vegetables & Fruits",
      "fruits": "Vegetables & Fruits",
      "grains": "Atta, Rice & Dal",
      "oils": "Oil, Ghee & Masala",
      "dairy": "Dairy, Bread & Eggs",
      "bakery": "Dairy, Bread & Eggs",
      "dry-fruits": "Dry Fruits & Cereals",
      "meat": "Chicken, Meat & Fish"
    };
    return categoryMap[category] || category;
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
    <div className="dynamic-price-page">
      <div className="page-header">
        <h1>Product Catalog</h1>
        <p>Discover fresh products from trusted suppliers</p>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-controls">
          <div className="category-filter">
            <label>Category</label>
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-filter">
            <label>Sort By</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.slice(1).map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-icon">{getCategoryIcon(category)}</span>
              <span className="category-name">{getCategoryDisplayName(category)}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-supplier">by {product.supplier}</p>
                <p className="product-stock">In stock: {product.stock} {product.unit}</p>
              </div>
              
              <div className="product-pricing">
                <div className="price-container">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">₹{product.originalPrice}</span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="discount-badge">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
              
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {showNotification && (
        <div className="add-to-cart-notification">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default DynamicPricePage;
