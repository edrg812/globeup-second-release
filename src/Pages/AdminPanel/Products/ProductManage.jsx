


// import React from "react";
// import Table from "../../../components/shared/Table/Table";
// import TableRow from "../../../components/shared/Table/TableRow";
// import {Link} from "react-router-dom";

// const ProductManage = ({ products }) => {
//   const columns = [
//     "SL",
//     "Action",
//     "Name",
//     "Category",
//     "Image",
//     "Price",
//     "Stock",
//     "Deal & Feature",
//     "Status"
//   ];

//   return (
//     <div className="p-4 bg-gray-100">
      
//        <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Product Manage</h1>
//           <Link to="/admin/product/create" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
//             Create
//           </Link>
//         </div>


//       {/* Action Buttons */}
//       <div className="mb-3">
//         <button className="px-3 py-1 bg-green-500 text-white rounded mr-2">👍 Deal</button>
//         <button className="px-3 py-1 bg-red-500 text-white rounded mr-2">👎 Deal</button>
//         <button className="px-3 py-1 bg-purple-500 text-white rounded mr-2">👍 Active</button>
//         <button className="px-3 py-1 bg-orange-500 text-white rounded">Inactive</button>
//       </div>

//       {/* Table */}
//       <Table
//         columns={columns}
//         data={products}
//         renderRow={(product, index) => (
//           <TableRow
//             key={index}
//             cells={[
//               index + 1,
//               <Link to={`/admin/product/edit/${1000}`} className="text-blue-500 hover:underline">
//                 ✏️
//               </Link>,
//               <Link to={`/admin/product/delete/${1000}`} className="text-red-500 hover:underline">
//                 🗑️
//               </Link>,
//               product.name,
//               product.category,
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-10 h-10 object-cover rounded"
//               />,
//               product.price,
//               product.stock,
//               <>
//                 Hot Deals: {product.hotDeals ? "Yes" : "No"} <br />
//                 Top Feature: {product.topFeature ? "Yes" : "No"}
//               </>,
//               <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">
//                 Active
//               </span>
//             ]}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default ProductManage






import React, { useEffect, useState } from "react";
import Table from "../../../components/shared/Table/Table";
import TableRow from "../../../components/shared/Table/TableRow";
import { Link } from "react-router-dom";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    "SL",
    "Action",
    "Product Name",
    "Category",
    "Variant Image",
    "Price",
    "Stock",
    "Color",
    "Size",
    "Deal & Feature",
    "Status",
  ];

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch("http://localhost:8000/products/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // Flatten all variants with parent product info
        const allVariants = data.results.flatMap((product) =>
          product.variants.map((variant) => ({
            productId: product.id,
            productName: product.name,
            category: product.category,
            is_active: product.is_active,
            ...variant,
          }))
        );

        setProducts(allVariants);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-4 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Manage</h1>
        <Link
          to="/admin/product/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Create
        </Link>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={products}
        renderRow={(variant, index) => (
          <TableRow
            key={variant.id}
            cells={[
              index + 1,
              <>
                <Link
                  to={`/admin/product/edit/${variant.productId}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  ✏️
                </Link>
                <Link
                  to={`/admin/product/delete/${variant.productId}`}
                  className="text-red-500 hover:underline"
                >
                  🗑️
                </Link>
              </>,
              variant.productName,
              variant.category,
              variant.image ? (
                <img
                  src={variant.image}
                  alt={variant.productName}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                "No Image"
              ),
              variant.price,
              variant.stock,
              variant.color || "-",
              variant.size || "-",
              <>
                Hot Deals: {variant.hotDeals ? "Yes" : "No"} <br />
                Top Feature: {variant.topFeature ? "Yes" : "No"}
              </>,
              variant.is_active ? (
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">
                  Active
                </span>
              ) : (
                <span className="px-2 py-1 bg-gray-400 text-white rounded text-xs">
                  Inactive
                </span>
              ),
            ]}
          />
        )}
      />
    </div>
  );
};

export default ProductManage;

