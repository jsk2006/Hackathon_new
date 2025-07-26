// Raw Materials Categories with their associated products
export const rawMaterials = {
  "Tomatoes": {
    icon: "🍅",
    description: "Fresh and processed tomato products",
    category: "vegetables",
    products: [
      {
        id: "tomato_fresh",
        name: "Fresh Tomatoes",
        price: 45,
        originalPrice: 60,
        description: "Fresh red tomatoes, perfect for cooking",
        stock: 50,
        unit: "kg",
        supplier: "Fresh Farms Ltd",
        popularity: 95
      },
      {
        id: "tomato_exotic",
        name: "Exotic Tomatoes",
        price: 80,
        originalPrice: 100,
        description: "Premium exotic tomato varieties",
        stock: 20,
        unit: "kg",
        supplier: "Premium Produce",
        popularity: 75
      },
      {
        id: "tomato_cherry",
        name: "Cherry Tomatoes",
        price: 120,
        originalPrice: 150,
        description: "Sweet cherry tomatoes for salads",
        stock: 15,
        unit: "kg",
        supplier: "Garden Fresh",
        popularity: 85
      }
    ]
  },
  "Onions": {
    icon: "🧅",
    description: "Various types of onions",
    category: "vegetables",
    products: [
      {
        id: "onion_red",
        name: "Red Onions",
        price: 30,
        originalPrice: 40,
        description: "Fresh red onions, essential for every kitchen",
        stock: 100,
        unit: "kg",
        supplier: "Veggie Supply Co",
        popularity: 90
      },
      {
        id: "onion_white",
        name: "White Onions",
        price: 25,
        originalPrice: 35,
        description: "Fresh white onions for cooking",
        stock: 80,
        unit: "kg",
        supplier: "Fresh Farms Ltd",
        popularity: 85
      },
      {
        id: "onion_sweet",
        name: "Sweet Onions",
        price: 40,
        originalPrice: 50,
        description: "Sweet onions for salads and garnishing",
        stock: 30,
        unit: "kg",
        supplier: "Premium Produce",
        popularity: 70
      }
    ]
  },
  "Potatoes": {
    icon: "🥔",
    description: "Different varieties of potatoes",
    category: "vegetables",
    products: [
      {
        id: "potato_regular",
        name: "Regular Potatoes",
        price: 25,
        originalPrice: 35,
        description: "Fresh potatoes, great for various dishes",
        stock: 75,
        unit: "kg",
        supplier: "Fresh Farms Ltd",
        popularity: 88
      },
      {
        id: "potato_sweet",
        name: "Sweet Potatoes",
        price: 45,
        originalPrice: 60,
        description: "Sweet potatoes rich in nutrients",
        stock: 25,
        unit: "kg",
        supplier: "Health Foods",
        popularity: 80
      }
    ]
  },
  "Milk": {
    icon: "🥛",
    description: "Dairy milk products",
    category: "dairy",
    products: [
      {
        id: "milk_full",
        name: "Full Cream Milk",
        price: 60,
        originalPrice: 75,
        description: "Fresh cow milk, daily delivery",
        stock: 100,
        unit: "liter",
        supplier: "Dairy Delight",
        popularity: 95
      },
      {
        id: "milk_toned",
        name: "Toned Milk",
        price: 50,
        originalPrice: 65,
        description: "Toned milk with reduced fat",
        stock: 80,
        unit: "liter",
        supplier: "Dairy Delight",
        popularity: 85
      },
      {
        id: "milk_buffalo",
        name: "Buffalo Milk",
        price: 80,
        originalPrice: 100,
        description: "Rich buffalo milk for premium products",
        stock: 40,
        unit: "liter",
        supplier: "Premium Dairy",
        popularity: 75
      }
    ]
  },
  "Chicken": {
    icon: "🍗",
    description: "Various chicken cuts and products",
    category: "meat",
    products: [
      {
        id: "chicken_breast",
        name: "Chicken Breast",
        price: 180,
        originalPrice: 220,
        description: "Fresh chicken breast, boneless and skinless",
        stock: 30,
        unit: "kg",
        supplier: "Meat Masters",
        popularity: 92
      },
      {
        id: "chicken_thigh",
        name: "Chicken Thigh",
        price: 150,
        originalPrice: 180,
        description: "Fresh chicken thighs with bone",
        stock: 25,
        unit: "kg",
        supplier: "Meat Masters",
        popularity: 85
      },
      {
        id: "chicken_leg",
        name: "Chicken Leg",
        price: 140,
        originalPrice: 170,
        description: "Fresh chicken legs for curries",
        stock: 35,
        unit: "kg",
        supplier: "Fresh Meat Co",
        popularity: 88
      }
    ]
  },
  "Rice": {
    icon: "🍚",
    description: "Different varieties of rice",
    category: "grains",
    products: [
      {
        id: "rice_basmati",
        name: "Basmati Rice",
        price: 80,
        originalPrice: 100,
        description: "Premium quality basmati rice",
        stock: 150,
        unit: "kg",
        supplier: "Grain Goodness",
        popularity: 90
      },
      {
        id: "rice_regular",
        name: "Regular Rice",
        price: 55,
        originalPrice: 70,
        description: "Premium quality rice, perfect for daily cooking",
        stock: 200,
        unit: "kg",
        supplier: "Grain Goodness",
        popularity: 85
      },
      {
        id: "rice_brown",
        name: "Brown Rice",
        price: 65,
        originalPrice: 80,
        description: "Healthy brown rice rich in fiber",
        stock: 60,
        unit: "kg",
        supplier: "Health Foods",
        popularity: 75
      }
    ]
  },
  "Oil": {
    icon: "🛢️",
    description: "Various cooking oils",
    category: "oils",
    products: [
      {
        id: "oil_vegetable",
        name: "Vegetable Oil",
        price: 120,
        originalPrice: 150,
        description: "Pure cooking oil, essential for cooking",
        stock: 40,
        unit: "liter",
        supplier: "Oil Express",
        popularity: 87
      },
      {
        id: "oil_mustard",
        name: "Mustard Oil",
        price: 140,
        originalPrice: 170,
        description: "Pure mustard oil for traditional cooking",
        stock: 30,
        unit: "liter",
        supplier: "Oil Express",
        popularity: 80
      },
      {
        id: "oil_olive",
        name: "Olive Oil",
        price: 200,
        originalPrice: 250,
        description: "Extra virgin olive oil for healthy cooking",
        stock: 20,
        unit: "liter",
        supplier: "Premium Oils",
        popularity: 70
      }
    ]
  },
  "Flour": {
    icon: "🌾",
    description: "Different types of flour",
    category: "grains",
    products: [
      {
        id: "flour_wheat",
        name: "Wheat Flour",
        price: 40,
        originalPrice: 50,
        description: "Fine wheat flour for baking",
        stock: 150,
        unit: "kg",
        supplier: "Grain Goodness",
        popularity: 90
      },
      {
        id: "flour_maida",
        name: "Maida (All Purpose)",
        price: 35,
        originalPrice: 45,
        description: "All purpose flour for various dishes",
        stock: 120,
        unit: "kg",
        supplier: "Grain Goodness",
        popularity: 85
      },
      {
        id: "flour_gram",
        name: "Gram Flour",
        price: 45,
        originalPrice: 55,
        description: "Besan for traditional dishes",
        stock: 80,
        unit: "kg",
        supplier: "Traditional Foods",
        popularity: 80
      }
    ]
  },
  "Eggs": {
    icon: "🥚",
    description: "Fresh farm eggs",
    category: "dairy",
    products: [
      {
        id: "eggs_regular",
        name: "Regular Eggs",
        price: 120,
        originalPrice: 150,
        description: "Fresh farm eggs, dozen pack",
        stock: 50,
        unit: "dozen",
        supplier: "Egg Farm",
        popularity: 88
      },
      {
        id: "eggs_brown",
        name: "Brown Eggs",
        price: 140,
        originalPrice: 170,
        description: "Premium brown eggs",
        stock: 30,
        unit: "dozen",
        supplier: "Premium Eggs",
        popularity: 75
      }
    ]
  },
  "Spices": {
    icon: "🟡",
    description: "Essential cooking spices",
    category: "oils",
    products: [
      {
        id: "spice_turmeric",
        name: "Turmeric Powder",
        price: 45,
        originalPrice: 60,
        description: "Pure turmeric powder for cooking",
        stock: 30,
        unit: "kg",
        supplier: "Spice World",
        popularity: 78
      },
      {
        id: "spice_chilli",
        name: "Red Chilli Powder",
        price: 50,
        originalPrice: 65,
        description: "Pure red chilli powder",
        stock: 25,
        unit: "kg",
        supplier: "Spice World",
        popularity: 82
      },
      {
        id: "spice_coriander",
        name: "Coriander Powder",
        price: 40,
        originalPrice: 55,
        description: "Fresh coriander powder",
        stock: 35,
        unit: "kg",
        supplier: "Spice World",
        popularity: 75
      }
    ]
  }
};

// Calculate average prices for each raw material
export const calculateAveragePrices = () => {
  const averages = {};
  
  Object.keys(rawMaterials).forEach(material => {
    const products = rawMaterials[material].products;
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const averagePrice = totalPrice / products.length;
    
    averages[material] = {
      averagePrice: Math.round(averagePrice),
      totalProducts: products.length,
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price))
      }
    };
  });
  
  return averages;
};

// Get all products from all raw materials
export const getAllProducts = () => {
  const allProducts = [];
  Object.keys(rawMaterials).forEach(material => {
    rawMaterials[material].products.forEach(product => {
      allProducts.push({
        ...product,
        rawMaterial: material,
        rawMaterialIcon: rawMaterials[material].icon
      });
    });
  });
  return allProducts;
};

// Market trends for raw materials
export const marketTrends = {
  "Tomatoes": { 
    trend: "up", 
    change: "+8%", 
    reason: "High demand, seasonal shortage",
    demand: 85
  },
  "Onions": { 
    trend: "down", 
    change: "-5%", 
    reason: "Good harvest season",
    demand: 65
  },
  "Potatoes": { 
    trend: "stable", 
    change: "0%", 
    reason: "Stable supply",
    demand: 45
  },
  "Milk": { 
    trend: "up", 
    change: "+6%", 
    reason: "Feed cost increase",
    demand: 90
  },
  "Chicken": { 
    trend: "up", 
    change: "+12%", 
    reason: "Increased demand",
    demand: 88
  },
  "Rice": { 
    trend: "down", 
    change: "-3%", 
    reason: "Government subsidy",
    demand: 75
  },
  "Oil": { 
    trend: "up", 
    change: "+4%", 
    reason: "Global oil prices",
    demand: 82
  },
  "Flour": { 
    trend: "stable", 
    change: "0%", 
    reason: "Stable wheat supply",
    demand: 70
  },
  "Eggs": { 
    trend: "up", 
    change: "+7%", 
    reason: "Feed cost increase",
    demand: 78
  },
  "Spices": { 
    trend: "up", 
    change: "+3%", 
    reason: "Export demand",
    demand: 60
  }
}; 