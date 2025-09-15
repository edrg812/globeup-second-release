import React, { useState } from 'react';
import { FaCalendar, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReportTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Sample report data
  const reportData = {
    totalSales: 12500,
    averageOrderValue: 50.00,
    totalOrders: 250
  };

  // Sample top selling products data
  const topProducts = [
    { id: 1, name: 'Handmade Leather Wallet', unitsSold: 250, totalRevenue: 5000 },
    { id: 2, name: 'Artisan Soap Set', unitsSold: 200, totalRevenue: 4000 },
    { id: 3, name: 'Organic Cotton T-Shirt', unitsSold: 150, totalRevenue: 3000 },
    { id: 4, name: 'Hand-Poured Candle', unitsSold: 100, totalRevenue: 2000 },
    { id: 5, name: 'Ceramic Coffee Mug', unitsSold: 50, totalRevenue: 1000 },
    { id: 6, name: 'Bamboo Cutting Board', unitsSold: 45, totalRevenue: 1125 },
    { id: 7, name: 'Reusable Shopping Bag', unitsSold: 40, totalRevenue: 800 },
    { id: 8, name: 'Wooden Watch', unitsSold: 35, totalRevenue: 1750 },
    { id: 9, name: 'Handmade Jewelry', unitsSold: 30, totalRevenue: 1500 },
    { id: 10, name: 'Organic Tea Set', unitsSold: 25, totalRevenue: 625 }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(topProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = topProducts.slice(startIndex, startIndex + itemsPerPage);
  const showingStart = startIndex + 1;
  const showingEnd = Math.min(startIndex + itemsPerPage, topProducts.length);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-900 text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-gray-600 text-base font-normal leading-normal">Your sales performance at a glance.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 rounded-md h-10 px-4 bg-white border border-gray-300 text-gray-900 text-sm font-semibold leading-normal shadow-sm hover:bg-gray-50 transition-colors">
              <FaCalendar className="text-lg" />
              <span className="truncate">Last 30 Days</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-md h-10 px-4 bg-blue-600 text-white text-sm font-semibold leading-normal shadow-sm hover:bg-blue-700 transition-colors">
              <FaDownload className="text-lg" />
              <span className="truncate">Export</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-8">
          {/* Stats Cards */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(reportData.totalSales)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600">Average Order Value</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(reportData.averageOrderValue)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{reportData.totalOrders}</p>
              </div>
            </div>
          </section>

          {/* Top Selling Products */}
          <section>
            <h2 className="text-gray-900 text-xl font-semibold leading-tight mb-4">Top Selling Products</h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Units Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.unitsSold}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(product.totalRevenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Simple Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              <span className="text-sm text-gray-600">
                Showing {showingStart} to {showingEnd} of {topProducts.length} results
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaChevronLeft className="text-xs" />
                  Previous
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReportTab;