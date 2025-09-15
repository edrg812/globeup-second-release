import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductInformation from "../../components/ProductDetails/ProductInformation";


// Main Product Page Component
const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get product ID from URL

  console.log("product review from details", product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api_host = import.meta.env.VITE_REACT_APP_API_URL;
        const response = await axios.get(
          `${api_host}/products/${id}/` // Use the ID from URL
        );
        setProduct(response.data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch product:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center p-10">Product not found.</div>;
  }

  return (
    <div
      className="bg-gray-100 min-h-screen"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <div className="container mx-auto p-4 md:p-8">
        <ProductDetails product={product} />
        <ProductInformation product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
