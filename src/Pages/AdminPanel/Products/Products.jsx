

import React from "react";
import ProductManage from "./ProductManage"; // adjust path

const Products = () => {
  const sampleProducts = [
    {
      name: "Kitchen storage cabinet",
      category: "Accessories",
      image: "https://via.placeholder.com/40",
      price: 550,
      stock: 100,
      hotDeals: true,
      topFeature: false
    },
    {
      name: "কিচেনেরেক স্ট্যান্ড",
      category: "Accessories",
      image: "https://via.placeholder.com/40",
      price: 550,
      stock: 100,
      hotDeals: false,
      topFeature: false
    },
    {
      name: "Western Fashion Pant",
      category: "Western Wear",
      image: "https://via.placeholder.com/40",
      price: 550,
      stock: 100,
      hotDeals: false,
      topFeature: false
    }
  ];

  return <ProductManage products={sampleProducts} />;
};

export default Products;
