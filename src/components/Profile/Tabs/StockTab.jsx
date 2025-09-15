// import React, { useState } from 'react';
// import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const StockTab = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
  
//   // Sample stock data
//   const stockData = [
//     {
//       id: 1,
//       name: 'Eco-Friendly Bamboo Toothbrush',
//       sku: 'SKU12345',
//       stock: 150,
//       price: 5.99,
//       status: 'In Stock',
//       statusColor: 'emerald'
//     },
//     {
//       id: 2,
//       name: 'Organic Cotton T-Shirt',
//       sku: 'SKU67890',
//       stock: 50,
//       price: 19.99,
//       status: 'Low Stock',
//       statusColor: 'yellow'
//     },
//     {
//       id: 3,
//       name: 'Handmade Soy Candle',
//       sku: 'SKU11223',
//       stock: 0,
//       price: 12.50,
//       status: 'Out of Stock',
//       statusColor: 'red'
//     },
//     {
//       id: 4,
//       name: 'Recycled Paper Notebook',
//       sku: 'SKU44556',
//       stock: 200,
//       price: 7.50,
//       status: 'In Stock',
//       statusColor: 'emerald'
//     },
//     {
//       id: 5,
//       name: 'Stainless Steel Water Bottle',
//       sku: 'SKU77889',
//       stock: 75,
//       price: 15.00,
//       status: 'In Stock',
//       statusColor: 'emerald'
//     },
//     {
//       id: 6,
//       name: 'Organic Cotton Tote Bag',
//       sku: 'SKU99001',
//       stock: 25,
//       price: 12.99,
//       status: 'Low Stock',
//       statusColor: 'yellow'
//     },
//     {
//       id: 7,
//       name: 'Bamboo Cutting Board',
//       sku: 'SKU22334',
//       stock: 0,
//       price: 24.99,
//       status: 'Out of Stock',
//       statusColor: 'red'
//     },
//     {
//       id: 8,
//       name: 'Reusable Coffee Cup',
//       sku: 'SKU55667',
//       stock: 100,
//       price: 18.50,
//       status: 'In Stock',
//       statusColor: 'emerald'
//     },
//     {
//       id: 9,
//       name: 'Hemp Face Towels',
//       sku: 'SKU88990',
//       stock: 10,
//       price: 9.99,
//       status: 'Low Stock',
//       statusColor: 'yellow'
//     },
//     {
//       id: 10,
//       name: 'Wooden Hair Brush',
//       sku: 'SKU11223',
//       stock: 45,
//       price: 14.50,
//       status: 'In Stock',
//       statusColor: 'emerald'
//     }
//   ];

//   // Filter products based on search term and status filter
//   const filteredProducts = stockData.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || 
//                          (statusFilter === 'in-stock' && product.status === 'In Stock') ||
//                          (statusFilter === 'low-stock' && product.status === 'Low Stock') ||
//                          (statusFilter === 'out-of-stock' && product.status === 'Out of Stock');
    
//     return matchesSearch && matchesStatus;
//   });

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
//   const showingStart = startIndex + 1;
//   const showingEnd = Math.min(startIndex + itemsPerPage, filteredProducts.length);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const getStatusClass = (statusColor) => {
//     switch (statusColor) {
//       case 'emerald':
//         return 'bg-emerald-100 text-emerald-700';
//       case 'yellow':
//         return 'bg-yellow-100 text-yellow-700';
//       case 'red':
//         return 'bg-red-100 text-red-700';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD', // eta bdt dea change kora nite hoba
//     }).format(amount);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-8">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Stock</h1>
//             <p className="mt-1 text-base text-gray-600">A clean and focused view of your current stock levels.</p>
//           </div>
//         </div>

//         {/* Stock Table */}
//         <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
//           {/* Search and Filter */}
//           <div className="p-4">
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <label className="relative flex-1 w-full">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <FaSearch />
//                 </span>
//                 <input
//                   type="text"
//                   className="w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-base text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1); // Reset to first page when searching
//                   }}
//                 />
//               </label>
              
//               <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//                 <select
//                   className="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-700 focus:border-blue-500 focus:ring-blue-500"
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setCurrentPage(1); // Reset to first page when filtering
//                   }}
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="in-stock">In Stock</option>
//                   <option value="low-stock">Low Stock</option>
//                   <option value="out-of-stock">Out of Stock</option>
//                 </select>
                
//                 <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 justify-center">
//                   <FaFilter className="text-lg" />
//                   <span>More Filters</span>
//                 </button>
//               </div>
//             </div>
            
//             {/* Results count */}
//             {filteredProducts.length >  0 & statusFilter !== 'all' ?  (
//               <div className="mt-3 text-sm text-gray-600">
//                 Showing {showingStart}-{showingEnd} of {filteredProducts.length} products
//                 {statusFilter !== 'all' && (
//                   <span className="ml-2">
//                     (Filtered by: {statusFilter === 'in-stock' ? 'In Stock' : 
//                                  statusFilter === 'low-stock' ? 'Low Stock' : 'Out of Stock'})
//                   </span>
//                 )}
//               </div>
//             ): null}
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
//                   <th className="px-6 py-4">Product Name</th>
//                   <th className="px-6 py-4">SKU</th>
//                   <th className="px-6 py-4 text-center">Stock</th>
//                   <th className="px-6 py-4 text-right">Price</th>
//                   <th className="px-6 py-4 text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {paginatedProducts.length > 0 ? (
//                   paginatedProducts.map((product) => (
//                     <tr key={product.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 text-base font-medium text-gray-900">{product.name}</td>
//                       <td className="px-6 py-4 text-base text-gray-600">{product.sku}</td>
//                       <td className="px-6 py-4 text-center text-base text-gray-600">{product.stock}</td>
//                       <td className="px-6 py-4 text-right text-base text-gray-600">{formatCurrency(product.price)}</td>
//                       <td className="px-6 py-4 text-center">
//                         <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(product.statusColor)}`}>
//                           {product.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                       No products found matching your criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {filteredProducts.length > 0 && (
//             <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-6 py-3 gap-4">
//               <p className="text-sm text-gray-600">
//                 Showing {showingStart}-{showingEnd} of {filteredProducts.length} results
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium ${
//                     currentPage === 1 
//                       ? 'text-gray-400 cursor-not-allowed' 
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <FaChevronLeft className="text-xs" />
//                   <span>Previous</span>
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium ${
//                     currentPage === totalPages 
//                       ? 'text-gray-400 cursor-not-allowed' 
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <span>Next</span>
//                   <FaChevronRight className="text-xs" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockTab;


import React, { useState } from 'react';
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StockTab = ({ stockData = [], loading = false, error = null }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  // Filter products based on search term and status filter
  const filteredProducts = stockData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'in-stock' && product.status === 'In Stock') ||
                         (statusFilter === 'low-stock' && product.status === 'Low Stock') ||
                         (statusFilter === 'out-of-stock' && product.status === 'Out of Stock');
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const showingStart = startIndex + 1;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredProducts.length);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusClass = (statusColor) => {
    switch (statusColor) {
      case 'emerald':
        return 'bg-emerald-100 text-emerald-700';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700';
      case 'red':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Stock</h1>
            <p className="mt-1 text-base text-gray-600">A clean and focused view of products current stock levels.</p>
          </div>
        </div>

        {/* Stock Table */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Search and Filter */}
          <div className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="relative flex-1 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-base text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </label>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <select
                  className="rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                
                <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 justify-center">
                  <FaFilter className="text-lg" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
            
            {/* Results count */}
            {filteredProducts.length > 0 && statusFilter !== 'all' && (
              <div className="mt-3 text-sm text-gray-600">
                Showing {showingStart}-{showingEnd} of {filteredProducts.length} products
                {statusFilter !== 'all' && (
                  <span className="ml-2">
                    (Filtered by: {statusFilter === 'in-stock' ? 'In Stock' : 
                                 statusFilter === 'low-stock' ? 'Low Stock' : 'Out of Stock'})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4 text-center">Stock</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-base font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-base text-gray-600">{product.sku}</td>
                      <td className="px-6 py-4 text-center text-base text-gray-600">{product.stock}</td>
                      <td className="px-6 py-4 text-right text-base text-gray-600">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(product.statusColor)}`}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No products found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-6 py-3 gap-4">
              <p className="text-sm text-gray-600">
                Showing {showingStart}-{showingEnd} of {filteredProducts.length} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FaChevronLeft className="text-xs" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>Next</span>
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTab;