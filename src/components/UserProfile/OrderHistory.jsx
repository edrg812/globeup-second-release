// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [count, setCount] = useState(0);
//   const [page, setPage] = useState(1);

//   const fetchOrders = async (page = 1) => {
//     const token = localStorage.getItem("access_token");
//     const res = await axios.get(`/api/orders/history/?page=${page}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setOrders(res.data.results);
//     setCount(Math.ceil(res.data.count / 10)); // total pages
//     setPage(page);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-semibold mb-6 text-gray-800">
//         📦 Order History
//       </h2>

//       <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
//         <table className="w-full text-sm text-left text-gray-600">
//           <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm uppercase">
//             <tr>
//               <th className="px-6 py-4">Order ID</th>
//               <th className="px-6 py-4">Status</th>
//               <th className="px-6 py-4">Total</th>
//               <th className="px-6 py-4">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="border-b hover:bg-blue-50 transition-colors duration-150"
//                 >
//                   <td className="px-6 py-4 font-semibold text-gray-800">
//                     #{order.id}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 text-xs font-medium rounded-full ${
//                         order.status === "completed"
//                           ? "bg-green-100 text-green-700"
//                           : order.status === "pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 font-medium">${order.total_amount}</td>
//                   <td className="px-6 py-4">
//                     {new Date(order.created_at).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="4"
//                   className="px-6 py-8 text-center text-gray-500 italic"
//                 >
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {count > 1 && (
//         <div className="flex items-center justify-center mt-6 space-x-2">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchOrders(page - 1)}
//             className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>

//           {[...Array(count)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => fetchOrders(i + 1)}
//               className={`px-4 py-2 rounded-lg font-medium ${
//                 page === i + 1
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-white border border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             disabled={page === count}
//             onClick={() => fetchOrders(page + 1)}
//             className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }





// import { useEffect, useState } from "react";

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const pageSize = 10;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_REACT_APP_API_URL}order-history/?page=${page}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch orders");

//         const data = await res.json();
//         setOrders(data.results);
//         setCount(data.count);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchOrders();
//   }, [page]);

//   const totalPages = Math.ceil(count / pageSize);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Order History</h2>

//       <div className="grid gap-4">
//         {orders.length === 0 ? (
//           <p className="text-gray-500">No orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Order #{order.id}
//                 </h3>
//                 <span
//                   className={`px-3 py-1 text-sm rounded-full ${
//                     order.status === "pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : order.status === "completed"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Placed on: {new Date(order.created_at).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700 font-medium mt-2">
//                 Total: ${order.total_amount}
//               </p>

//               <div className="mt-3">
//                 <h4 className="text-sm font-semibold text-gray-700">
//                   Items:
//                 </h4>
//                 <ul className="list-disc list-inside text-sm text-gray-600">
//                   {order.items.map((item) => (
//                     <li key={item.id}>
//                       {item.product_variant} × {item.quantity} — $
//                       {item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-6 space-x-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((prev) => prev - 1)}
//             className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
//           >
//             ⬅ Prev
//           </button>
//           <span className="text-gray-700">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((prev) => prev + 1)}
//             className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
//           >
//             Next ➡
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }






import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10;
  const apiUrl= import.meta.env.VITE_REACT_APP_API_URL

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/order-history/?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.results);
        setCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [page]);

  const totalPages = Math.ceil(count / pageSize);

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Order History</h2>

      <div className="grid gap-4">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Placed on: {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Total: ${order.total_amount}
              </p>

              <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  Items:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product_variant.name} × {item.quantity} — ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}
