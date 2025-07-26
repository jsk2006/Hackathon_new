import React, { createContext, useContext, useState, useEffect } from "react";
import { rawMaterials as initialRawMaterials, calculateAveragePrices, marketTrends } from "../data/rawMaterials";

const RawMaterialsContext = createContext();

export const useRawMaterials = () => {
  const context = useContext(RawMaterialsContext);
  if (!context) {
    throw new Error("useRawMaterials must be used within a RawMaterialsProvider");
  }
  return context;
};

export const RawMaterialsProvider = ({ children }) => {
  const [rawMaterials, setRawMaterials] = useState(initialRawMaterials);
  const [averagePrices, setAveragePrices] = useState(calculateAveragePrices());
  const [allProducts, setAllProducts] = useState([]);

  // Calculate average prices whenever raw materials change
  useEffect(() => {
    const newAveragePrices = {};
    
    Object.keys(rawMaterials).forEach(material => {
      const products = rawMaterials[material].products;
      const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
      const averagePrice = totalPrice / products.length;
      
      newAveragePrices[material] = {
        averagePrice: Math.round(averagePrice),
        totalProducts: products.length,
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        }
      };
    });
    
    setAveragePrices(newAveragePrices);
  }, [rawMaterials]);

  // Update all products whenever raw materials change
  useEffect(() => {
    const newAllProducts = [];
    Object.keys(rawMaterials).forEach(material => {
      rawMaterials[material].products.forEach(product => {
        newAllProducts.push({
          ...product,
          rawMaterial: material,
          rawMaterialIcon: rawMaterials[material].icon
        });
      });
    });
    setAllProducts(newAllProducts);
  }, [rawMaterials]);

  // Add product to raw material
  const addProductToRawMaterial = (rawMaterialName, newProduct) => {
    setRawMaterials(prev => {
      const updated = { ...prev };
      if (updated[rawMaterialName]) {
        updated[rawMaterialName] = {
          ...updated[rawMaterialName],
          products: [...updated[rawMaterialName].products, newProduct]
        };
      }
      return updated;
    });
  };

  // Get raw material options for dropdowns
  const getRawMaterialOptions = () => {
    return Object.keys(rawMaterials).map(material => ({
      value: material,
      label: `${rawMaterials[material].icon} ${material}`,
      category: rawMaterials[material].category
    }));
  };

  // Get supplier's products
  const getSupplierProducts = (supplierName) => {
    return Object.keys(rawMaterials).flatMap(material => 
      rawMaterials[material].products.filter(product => 
        product.supplier === supplierName || product.supplier.includes(supplierName)
      )
    );
  };

  const value = {
    rawMaterials,
    averagePrices,
    allProducts,
    marketTrends,
    addProductToRawMaterial,
    getRawMaterialOptions,
    getSupplierProducts
  };

  return (
    <RawMaterialsContext.Provider value={value}>
      {children}
    </RawMaterialsContext.Provider>
  );
}; 