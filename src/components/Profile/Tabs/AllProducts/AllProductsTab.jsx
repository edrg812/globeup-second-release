

import React, { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AllProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/supplier_added_product_variants`, { // eikhana change hota para
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data.results); // using your response structure
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceEdit = async (variantId) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/supplier/product-variant/${variantId}/edit-price/`,
        { price: newPrice },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update state
      setProducts((prev) =>
        prev.map((p) =>
          p.id === variantId ? { ...p, price: response.data.price } : p
        )
      );
      setEditingId(null);
      setNewPrice("");
      alert("Price updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update price.");
    }
  };

  if (loading) return <p className="p-4 text-gray-700">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">SL</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      setEditingId(product.id);
                      setNewPrice(product.price);
                    }}
                  >
                    ✏️ Edit Price
                  </button>
                 <button
  className="text-red-500 hover:underline"
  onClick={async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${apiUrl}/delete/product/${product.id}/`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });

        // Remove the deleted product from state
        setProducts((prev) => prev.filter((p) => p.id !== product.id));

        alert("Product deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete the product.");
      }
    }
  }}
>
  🗑️
</button>

                </td>
                <td className="py-3 px-4">{product.product.name}</td>
                <td className="py-3 px-4">{product.product.category}</td>
                <td className="py-3 px-4">
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">
                  {editingId === product.id ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="border rounded px-2 py-1 w-20"
                      />
                      <button
                        onClick={() => handlePriceEdit(product.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-white ${
                    product.is_active ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsTab;
