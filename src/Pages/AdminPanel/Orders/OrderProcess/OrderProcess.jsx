
import React from 'react';

const OrderProcess = () => {
  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <div className="container mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Order Process [Invoice : #74556]
        </h1>

        {/* Product Table Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 w-16">SL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 w-32">Image</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-t py-3 px-4">1</td>
                  <td className="border-t py-3 px-4">
                    <img
                      alt="Blue dress"
                      className="h-16 w-16 object-cover rounded-md"
                      src="https://static-01.daraz.com.bd/p/1dde51d12bda71f78c88a6d7235e9ce7.jpg"
                    />
                  </td>
                  <td className="border-t py-3 px-4 text-gray-700">
                    Western Fashion Ladis Stitched Tops and Pant soft silk dress for women
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <form>
            {/* Name and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customer_name">
                  Customer name
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="customer_name"
                  type="text"
                  defaultValue="অভি"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customer_phone">
                  Customer Phone
                </label>
                <input
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="customer_phone"
                  type="text"
                  defaultValue="01717242401"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="mb-4 md:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customer_address">
                Customer Address
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="customer_address"
                rows="3"
                defaultValue="362, 363 West Nakhalpara (Nakhalpara Railcrossing), Tejgaon, Dhaka 1215"
              />
            </div>

            {/* Delivery Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="delivery_area">
                Delivery Area
              </label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="delivery_area"
              >
                <option></option>
                <option>সারা বাংলাদেশে ১২০ টাকা</option>
                <option>ঢাকার ভিতর ৮০ টাকা</option>
                <option>ঢাকার পার্শ্ববর্তী এলাকা ১০০ টাকা</option>
                <option>ফ্রি ডেলিভারি</option>
              </select>
            </div>


            {/* Order Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="order_status">
                Order Status
              </label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                id="order_status"
              >
                <option>Choose ...</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 w-full md:w-auto"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;