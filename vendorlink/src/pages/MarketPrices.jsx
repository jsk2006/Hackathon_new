import React, { useState } from "react";
import { useRawMaterials } from "../context/RawMaterialsContext";
import "./MarketPrices.css";

const MarketPrices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("averagePrice");
  
  const { rawMaterials, averagePrices, marketTrends } = useRawMaterials();

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      case "stable":
        return "➡️";
      default:
        return "➡️";
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "#dc3545";
      case "down":
        return "#28a745";
      case "stable":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const getDemandLevel = (demand) => {
    if (demand >= 80) return { level: "High", color: "#dc3545", icon: "🔥" };
    if (demand >= 50) return { level: "Medium", color: "#ffc107", icon: "⚡" };
    return { level: "Low", color: "#28a745", icon: "📉" };
  };

  // Filter raw materials by search
  const filteredRawMaterials = Object.keys(rawMaterials).filter(material =>
    material.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rawMaterials[material].description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort raw materials
  const sortedRawMaterials = filteredRawMaterials.sort((a, b) => {
    const avgA = averagePrices[a]?.averagePrice || 0;
    const avgB = averagePrices[b]?.averagePrice || 0;
    
    switch (sortBy) {
      case "averagePrice":
        return avgB - avgA;
      case "name":
        return a.localeCompare(b);
      case "demand":
        const demandA = marketTrends[a]?.demand || 0;
        const demandB = marketTrends[b]?.demand || 0;
        return demandB - demandA;
      case "products":
        return (averagePrices[b]?.totalProducts || 0) - (averagePrices[a]?.totalProducts || 0);
      default:
        return avgB - avgA;
    }
  });

  // Calculate overall market statistics
  const marketStats = {
    totalRawMaterials: Object.keys(rawMaterials).length,
    totalProducts: Object.values(rawMaterials).reduce((sum, material) => sum + material.products.length, 0),
    averagePrice: Math.round(Object.values(averagePrices).reduce((sum, avg) => sum + avg.averagePrice, 0) / Object.keys(averagePrices).length),
    priceRange: {
      min: Math.min(...Object.values(averagePrices).map(avg => avg.averagePrice)),
      max: Math.max(...Object.values(averagePrices).map(avg => avg.averagePrice))
    },
    averageDemand: Math.round(Object.values(marketTrends).reduce((sum, trend) => sum + (trend.demand || 0), 0) / Object.keys(marketTrends).length)
  };

  return (
    <div className="market-prices-container">
      <div className="market-header">
        <h1>📊 Raw Material Market Prices</h1>
        <p>Real-time average costs and market demand for essential raw material categories. Updated as vendors add products.</p>
        
        {/* Overall Market Statistics */}
        <div className="market-overview">
          <div className="overview-card">
            <div className="overview-icon">📦</div>
            <div className="overview-content">
              <h3>{marketStats.totalRawMaterials}</h3>
              <p>Raw Material Categories</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon">🛒</div>
            <div className="overview-content">
              <h3>{marketStats.totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon">💰</div>
            <div className="overview-content">
              <h3>₹{marketStats.averagePrice}</h3>
              <p>Average Market Price</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon">📊</div>
            <div className="overview-content">
              <h3>{marketStats.averageDemand}%</h3>
              <p>Average Market Demand</p>
            </div>
          </div>
        </div>
      </div>

      <div className="market-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search raw materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-filter"
          >
            <option value="averagePrice">Sort by Average Price</option>
            <option value="name">Sort by Name</option>
            <option value="demand">Sort by Market Demand</option>
            <option value="products">Sort by Product Count</option>
          </select>
        </div>
      </div>

      <div className="raw-materials-grid">
        {sortedRawMaterials.map((material) => {
          const avgData = averagePrices[material];
          const trend = marketTrends[material];
          const materialData = rawMaterials[material];
          const products = materialData.products;
          
          // Calculate additional statistics
          const priceVariation = ((avgData.priceRange.max - avgData.priceRange.min) / avgData.averagePrice * 100).toFixed(1);
          const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
          const suppliers = [...new Set(products.map(p => p.supplier))];
          const demandInfo = getDemandLevel(trend?.demand || 0);
          
          return (
            <div key={material} className="raw-material-card">
              <div className="material-header">
                <span className="material-icon">{materialData.icon}</span>
                {trend && (
                  <div className="trend-indicator" style={{ color: getTrendColor(trend.trend) }}>
                    {getTrendIcon(trend.trend)} {trend.change}
                  </div>
                )}
              </div>
              
              <div className="material-info">
                <h3>{material}</h3>
                <p className="material-description">{materialData.description}</p>
                <div className="material-meta">
                  <span className="category-tag">{materialData.category}</span>
                  <span className="products-count">{avgData.totalProducts} product types</span>
                </div>
              </div>

              <div className="average-price-section">
                <div className="average-price">₹{avgData.averagePrice}</div>
                <div className="price-range">
                  Range: ₹{avgData.priceRange.min} - ₹{avgData.priceRange.max}
                </div>
                <div className="price-variation">
                  Variation: {priceVariation}%
                </div>
              </div>

              <div className="market-demand-section">
                <div className="demand-header">
                  <span className="demand-icon" style={{ color: demandInfo.color }}>
                    {demandInfo.icon}
                  </span>
                  <span className="demand-level" style={{ color: demandInfo.color }}>
                    {demandInfo.level} Demand
                  </span>
                </div>
                <div className="demand-percentage">
                  {trend?.demand || 0}% Market Demand
                </div>
                {trend?.reason && (
                  <div className="demand-reason">
                    {trend.reason}
                  </div>
                )}
              </div>

              <div className="material-stats">
                <div className="stat-row">
                  <span className="stat-label">Total Stock:</span>
                  <span className="stat-value">{totalStock} units</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Suppliers:</span>
                  <span className="stat-value">{suppliers.length}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Category:</span>
                  <span className="stat-value">{materialData.category}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Product Types:</span>
                  <span className="stat-value">{avgData.totalProducts}</span>
                </div>
              </div>

              <div className="material-footer">
                <span className="trend-reason">{trend?.reason || "Stable market"}</span>
                <span className="last-updated">Updated today</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRawMaterials.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No raw materials found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default MarketPrices; 