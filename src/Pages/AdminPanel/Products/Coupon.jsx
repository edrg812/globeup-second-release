import React from 'react';

const coupons = [
  { id: 1, code: "WELCOME10", discount: "10%", expiry: "2025-12-31", status: "Active" },
  { id: 2, code: "SUMMER20", discount: "20%", expiry: "2025-08-31", status: "Inactive" },
];

const Coupon = () => {
  return (
    <>
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          Create Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coupon Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, idx) => (
              <tr key={coupon.id} className="border-b">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    defaultValue={coupon.code}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    defaultValue={coupon.discount}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    className="border rounded px-2 py-1 w-full"
                    defaultValue={coupon.expiry}
                  />
                </td>
                <td className="px-6 py-4">
                  <select className="border rounded px-2 py-1 w-full" defaultValue={coupon.status}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Save
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Coupon;