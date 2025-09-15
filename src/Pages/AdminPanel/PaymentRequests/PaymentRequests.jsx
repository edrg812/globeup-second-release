// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import {
//   FiSearch,
//   FiFilter,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCheck,
//   FiX,
// } from "react-icons/fi";
// const apiurl = import.meta.env.VITE_REACT_APP_API_URL;

// const PaymentRequests = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchEarnings = async () => {
//       try {
//         const response = await axios.get(`${apiurl}/amin/earnings/`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`, // if you use JWT
//           },
//         });

//        const formattedData = response.data.results.map((item) => {
//   const lastMethod =
//     item.method_detail && item.method_detail.length > 0
//       ? item.method_detail[item.method_detail.length - 1]
//       : null;

  
//   return {
//     id: item.id,
//     name: `Reseller ${item.user}`,
//     email: item.user_phone,
//     avatar: "https://i.ibb.co.com/WNYcNMzZ/Free-Avatar-Generated-with-AI.jpg",
//     date: new Date(item.created_at).toLocaleDateString(),
//     amount: parseFloat(item.user_requested_amount_withdraw),
//     status: item.status,
//     method: lastMethod, // 👈 store last method here
//   };
// });


//         setData(formattedData);
//         setFilteredData(formattedData);
//       } catch (error) {
//         console.error("Error fetching earnings:", error);
//       }
//     };

//     fetchEarnings();
//   }, []); // run once on



//   const handleMarkAsPaid = async (earningId, withdrawId) => {
//   try {
//     // Send both requests in parallel
//     await Promise.all([
//       axios.post(
//         `${apiurl}/earnings/${earningId}/paid/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       ),
//       axios.patch(
//         `${apiurl}/withdraw-request/${withdrawId}/update/`,
//         { processed: true },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       ),
//     ]);

//     // Update UI after success
//     setData((prev) =>
//       prev.map((item) =>
//         item.id === earningId ? { ...item, status: "paid", processed: true } : item
//       )
//     );
//     setFilteredData((prev) =>
//       prev.map((item) =>
//         item.id === earningId ? { ...item, status: "paid", processed: true } : item
//       )
//     );
//   } catch (error) {
//     console.error("Error marking as paid:", error);
//   }
// };

// const handleMarkAsFailed = async (earningId, withdrawId) => {
//   try {
//     // Send both requests in parallel
//     await Promise.all([
//       axios.post(
//         `${apiurl}/earnings/${earningId}/failed/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       ),
//       axios.patch(
//         `${apiurl}/withdraw-request/${withdrawId}/update/`,
//         { processed: false },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       ),
//     ]);

//     // Update UI after success
//     setData((prev) =>
//       prev.map((item) =>
//         item.id === earningId ? { ...item, status: "failed", processed: false } : item
//       )
//     );
//     setFilteredData((prev) =>
//       prev.map((item) =>
//         item.id === earningId ? { ...item, status: "failed", processed: false } : item
//       )
//     );
//   } catch (error) {
//     console.error("Error marking as failed:", error);
//   }
// };

//   // State management
//   // const [data, setData] = useState(initialData);
//   // const [filteredData, setFilteredData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Filter and search functionality
//   useEffect(() => {
//     let result = data;

//     // Apply search filter
//     if (searchTerm) {
//       result = result.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (statusFilter !== "all") {
//       result = result.filter((item) => item.status === statusFilter);
//     }

//     setFilteredData(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [searchTerm, statusFilter, data]);

//   // Get current items for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle status change (approve/reject)
//   const handleStatusChange = (id, newStatus) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.id === id ? { ...item, status: newStatus } : item
//       )
//     );
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     let className =
//       "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ";

//     switch (status) {
//       case "pending":
//         className += "bg-yellow-100 text-yellow-800";
//         break;
//       case "approved":
//         className += "bg-green-100 text-green-800";
//         break;
//       case "rejected":
//         className += "bg-red-100 text-red-800";
//         break;
//       default:
//         className += "bg-gray-100 text-gray-800";
//     }

//     return (
//       <span className={className}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   // Generate page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   // Show limited page numbers with ellipsis
//   const renderPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total pages is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);

//       // Calculate start and end of visible page range
//       let startPage = Math.max(2, currentPage - 1);
//       let endPage = Math.min(totalPages - 1, currentPage + 1);

//       // Adjust if we're at the beginning
//       if (currentPage <= 3) {
//         endPage = 4;
//       }

//       // Adjust if we're at the end
//       if (currentPage >= totalPages - 2) {
//         startPage = totalPages - 3;
//       }

//       // Add ellipsis after first page if needed
//       if (startPage > 2) {
//         pages.push("ellipsis-left");
//       }

//       // Add middle pages
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }

//       // Add ellipsis before last page if needed
//       if (endPage < totalPages - 1) {
//         pages.push("ellipsis-right");
//       }

//       // Always show last page
//       pages.push(totalPages);
//     }

//     return pages.map((page, index) => {
//       if (page === "ellipsis-left" || page === "ellipsis-right") {
//         return (
//           <span key={index} className="px-2 py-1 text-gray-500">
//             ...
//           </span>
//         );
//       }

//       return (
//         <button
//           key={index}
//           onClick={() => paginate(page)}
//           className={`inline-flex h-8 w-8 items-center justify-center rounded-md border ${
//             currentPage === page
//               ? "border-[#1173d4] bg-[#1173d4] text-white"
//               : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
//           } text-sm font-medium`}
//         >
//           {page}
//         </button>
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       <main className="flex-1 bg-gray-100/50 py-8">
//         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900">
//               Payment Requests
//             </h2>
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search requests..."
//                   className="w-full rounded-md border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-[#1173d4] focus:ring-[#1173d4] sm:w-64"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="relative">
//                 <button
//                   className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
//                   onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 >
//                   <FiFilter className="text-base" />
//                   Filter
//                 </button>

//                 {isFilterOpen && (
//                   <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <div className="py-1">
//                       <button
//                         className={`block w-full px-4 py-2 text-left text-sm ${
//                           statusFilter === "all"
//                             ? "bg-gray-100 text-gray-900"
//                             : "text-gray-700"
//                         }`}
//                         onClick={() => {
//                           setStatusFilter("all");
//                           setIsFilterOpen(false);
//                         }}
//                       >
//                         All Statuses
//                       </button>
//                       <button
//                         className={`block w-full px-4 py-2 text-left text-sm ${
//                           statusFilter === "pending"
//                             ? "bg-gray-100 text-gray-900"
//                             : "text-gray-700"
//                         }`}
//                         onClick={() => {
//                           setStatusFilter("pending");
//                           setIsFilterOpen(false);
//                         }}
//                       >
//                         Pending
//                       </button>
//                       <button
//                         className={`block w-full px-4 py-2 text-left text-sm ${
//                           statusFilter === "approved"
//                             ? "bg-gray-100 text-gray-900"
//                             : "text-gray-700"
//                         }`}
//                         onClick={() => {
//                           setStatusFilter("approved");
//                           setIsFilterOpen(false);
//                         }}
//                       >
//                         Approved
//                       </button>
//                       <button
//                         className={`block w-full px-4 py-2 text-left text-sm ${
//                           statusFilter === "rejected"
//                             ? "bg-gray-100 text-gray-900"
//                             : "text-gray-700"
//                         }`}
//                         onClick={() => {
//                           setStatusFilter("rejected");
//                           setIsFilterOpen(false);
//                         }}
//                       >
//                         Rejected
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
//             <table className="w-full table-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Reseller Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Request Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
//                     Actions
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
//                     payment method
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {currentItems.length > 0 ? (
//                   currentItems.map((item) => (
//                     <tr key={item.id} className="hover:bg-gray-50">
//                       <td className="whitespace-nowrap px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <img
//                             alt={`${item.name} avatar`}
//                             className="h-10 w-10 rounded-full object-cover"
//                             src={item.avatar}
//                           />
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {item.name}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {item.email}
//                             </div>
                            
//                           </div>
//                         </div>
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//                         {item.date}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800">
//                         ${item.amount.toFixed(2)}
//                       </td>
//                       <td className="whitespace-nowrap px-6 py-4">
//                         <StatusBadge status={item.status} />
//                       </td>
                      
//                       <td className="whitespace-nowrap px-6 py-4 text-right">
//                         {item.status === "pending" ? (
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => handleMarkAsFailed(item.id)}
//                               className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                             >
//                               <FiX className="mr-1" />
//                               Reject
//                             </button>
//                             <button
//                               onClick={() => handleMarkAsPaid(item.id)}
//                               className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                             >
//                               <FiCheck className="mr-1" />
//                               Accept
//                             </button>
//                           </div>
//                         ) : (
//                           <span
//                             className={`font-bold ${
//                               item.status === "paid"
//                                 ? "text-green-600"
//                                 : item.status === "failed"
//                                 ? "text-red-600"
//                                 : "text-gray-600"
//                             }`}
//                           >
//                             {item.status}
//                           </span>
//                         )}
//                       </td>

//                        {/* ✅ Payment method column */}
// <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
//   {item.method 
//     ? `${item.method.payment_method} - ${item.method.account_details}` 
//     : "N/A"}
// </td>

//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="px-6 py-4 text-center text-sm text-gray-500"
//                     >
//                       No payment requests found matching your criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
//             <div className="text-sm text-gray-600">
//               Showing{" "}
//               <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
//               <span className="font-semibold">
//                 {Math.min(indexOfLastItem, filteredData.length)}
//               </span>{" "}
//               of <span className="font-semibold">{filteredData.length}</span>{" "}
//               results
//             </div>

//             {totalPages > 1 && (
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => paginate(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   <FiChevronLeft className="text-lg" />
//                 </button>

//                 {renderPageNumbers()}

//                 <button
//                   onClick={() =>
//                     paginate(Math.min(totalPages, currentPage + 1))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   <FiChevronRight className="text-lg" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PaymentRequests;
























import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX,
} from "react-icons/fi";
const apiurl = import.meta.env.VITE_REACT_APP_API_URL;

const PaymentRequests = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch earnings
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`${apiurl}/amin/earnings/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const formattedData = response.data.results.map((item) => {
          const lastMethod =
            item.method_detail && item.method_detail.length > 0
              ? item.method_detail[item.method_detail.length - 1]
              : null;

          return {
            id: item.id, // earning ID
            name: `Reseller ${item.user}`,
            email: item.user_phone,
            avatar:
              "https://i.ibb.co.com/WNYcNMzZ/Free-Avatar-Generated-with-AI.jpg",
            date: new Date(item.created_at).toLocaleDateString(),
            amount: parseFloat(item.user_requested_amount_withdraw),
            status: item.status,
            method: lastMethod, // last method
          };
        });

        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error fetching earnings:", error);
      }
    };

    fetchEarnings();
  }, []);

  // Mark as Paid
  const handleMarkAsPaid = async (earningId, methodId) => {
    if (!methodId) return console.error("Withdraw ID missing!");

    try {
      await Promise.all([
        axios.post(
          `${apiurl}/earnings/${earningId}/paid/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        ),
        axios.patch(
          `${apiurl}/withdraw-request/${methodId}/update/`,
          { processed: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        ),
      ]);

      setData((prev) =>
        prev.map((item) =>
          item.id === earningId ? { ...item, status: "paid" } : item
        )
      );
      setFilteredData((prev) =>
        prev.map((item) =>
          item.id === earningId ? { ...item, status: "paid" } : item
        )
      );
    } catch (error) {
      console.error("Error marking as paid:", error);
    }
  };

  // Mark as Failed
  const handleMarkAsFailed = async (earningId, methodId) => {
    if (!methodId) return console.error("Withdraw ID missing!");

    try {
      await Promise.all([
        axios.post(
          `${apiurl}/earnings/${earningId}/failed/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        ),
        axios.patch(
          `${apiurl}/withdraw-request/${methodId}/update/`,
          { processed: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        ),
      ]);

      setData((prev) =>
        prev.map((item) =>
          item.id === earningId ? { ...item, status: "failed" } : item
        )
      );
      setFilteredData((prev) =>
        prev.map((item) =>
          item.id === earningId ? { ...item, status: "failed" } : item
        )
      );
    } catch (error) {
      console.error("Error marking as failed:", error);
    }
  };

  // Pagination and search/filter state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = data;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((item) => item.status === statusFilter);
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const StatusBadge = ({ status }) => {
    let className = "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ";

    switch (status) {
      case "pending":
        className += "bg-yellow-100 text-yellow-800";
        break;
      case "paid":
        className += "bg-green-100 text-green-800";
        break;
      case "failed":
        className += "bg-red-100 text-red-800";
        break;
      default:
        className += "bg-gray-100 text-gray-800";
    }

    return (
      <span className={className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) endPage = 4;
      if (currentPage >= totalPages - 2) startPage = totalPages - 3;
      if (startPage > 2) pages.push("ellipsis-left");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("ellipsis-right");
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "ellipsis-left" || page === "ellipsis-right") {
        return (
          <span key={index} className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      return (
        <button
          key={index}
          onClick={() => paginate(page)}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md border ${
            currentPage === page
              ? "border-[#1173d4] bg-[#1173d4] text-white"
              : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          } text-sm font-medium`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="flex-1 bg-gray-100/50 py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Payment Requests
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full rounded-md border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-[#1173d4] focus:ring-[#1173d4] sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FiFilter className="text-base" />
                  Filter
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          statusFilter === "all"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setStatusFilter("all");
                          setIsFilterOpen(false);
                        }}
                      >
                        All Statuses
                      </button>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          statusFilter === "pending"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setStatusFilter("pending");
                          setIsFilterOpen(false);
                        }}
                      >
                        Pending
                      </button>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          statusFilter === "approved"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setStatusFilter("approved");
                          setIsFilterOpen(false);
                        }}
                      >
                        Approved
                      </button>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          statusFilter === "rejected"
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setStatusFilter("rejected");
                          setIsFilterOpen(false);
                        }}
                      >
                        Rejected
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reseller Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            alt={`${item.name} avatar`}
                            className="h-10 w-10 rounded-full object-cover"
                            src={item.avatar}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800">
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        {item.status === "pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleMarkAsFailed(item.id, item.method?.id)
                              }
                              className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <FiX className="mr-1" />
                              Reject
                            </button>
                            <button
                              onClick={() =>
                                handleMarkAsPaid(item.id, item.method?.id)
                              }
                              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              <FiCheck className="mr-1" />
                              Accept
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`font-bold ${
                              item.status === "paid"
                                ? "text-green-600"
                                : item.status === "failed"
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {item.status}
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.method
                          ? `${item.method.payment_method} - ${item.method.account_details}`
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No payment requests found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-semibold">
                {Math.min(indexOfLastItem, filteredData.length)}
              </span>{" "}
              of <span className="font-semibold">{filteredData.length}</span>{" "}
              results
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FiChevronLeft className="text-lg" />
                </button>

                {renderPageNumbers()}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentRequests;
