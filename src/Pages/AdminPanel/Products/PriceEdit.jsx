// import React from 'react'

// const PriceEdit = () => {

//     // Sample data for products
//     // This would typically come from an API or state management
//     // const products = [
//     //   { id: 1, name: "Product 1", currentPrice: "$100", newPrice: "" },
//     //   { id: 2, name: "Product 2", currentPrice: "$200", newPrice: "" },
//     //   { id: 3, name: "Product 3", currentPrice:

//     //     "$300", newPrice: "" },
//     // ];
//     // For demonstration, we will use a static array
//     const products = [
//         { id: 1, name: "Product 1", currentPrice: "$100", newPrice: "" },
//         { id: 2, name: "Product 2", currentPrice: "$200", newPrice: "" },
//         { id: 3, name: "Product 3", currentPrice: "$300", newPrice: "" },
//     ];
//     // Function to handle saving the new price
//     const handleSave = (id) => {
//         // Logic to save the new price
//         console.log(`Saving new price for product ID: ${id}`);
//     };
    
//   return (

// <>
//     < div className="p-4 bg-gray-100 flex justify-between items-center">
//         <h1 className="text-2xl font-bold mb-4">Price Edit</h1>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Create  
//         </button>     
//     </div>

//     <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//       <thead className="bg-gray-200"> 
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Price</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//         </tr>
//         </thead>
//         <tbody>
//         {[1, 2, 3].map((item, index) => (
//             <tr key={index} className="border-b">
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Product {item}</td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <input type="text" className="border rounded px-2 py-1 w-full" placeholder="Current Price" defaultValue="$100" />
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <input type="text" className="border rounded px-2 py-1 w-full" placeholder="New Price" />
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//                 <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
//             </td>
//             </tr>
//         ))} 
//         </tbody>
//     </table> 
// </>
//   )
// }

// export default 


import React, { useEffect, useState } from "react";
import axios from "axios";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const PriceEdit = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({}); // track inline edits

  // Fetch variants from API
  const fetchVariants = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/variants/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setVariants(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch variants:", err);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  // Handle inline input changes
  const handleChange = (id, field, value) => {
    setEditing({
      ...editing,
      [id]: { ...editing[id], [field]: value },
    });
  };

  // Save updates
  const handleSave = async (variant) => {
    const data = {
      price: editing[variant.id]?.price ?? variant.price,
      old_price: editing[variant.id]?.old_price ?? variant.old_price,
      stock: editing[variant.id]?.stock ?? variant.stock,
    };

    try {
      await axios.patch(`${apiURL}/variants/${variant.id}/update/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      alert("Updated successfully!");
      fetchVariants(); // refresh data
      setEditing((prev) => ({ ...prev, [variant.id]: {} })); // reset edits
    } catch (err) {
      console.error("Failed to update variant:", err);
      alert("Error updating variant.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Price & Stock Edit</h1>
      {loading ? (
        <p>Loading variants...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Old Price</th>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={variant.id} className="border-b text-center">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{variant.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={editing[variant.id]?.old_price ?? variant.old_price}
                      onChange={(e) => handleChange(variant.id, "old_price", e.target.value)}
                      min={0}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={editing[variant.id]?.price ?? variant.price}
                      onChange={(e) => handleChange(variant.id, "price", e.target.value)}
                      min={0}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-full"
                      value={editing[variant.id]?.stock ?? variant.stock}
                      onChange={(e) => handleChange(variant.id, "stock", e.target.value)}
                      min={0}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSave(variant)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PriceEdit;
