import React from 'react';

const Coupon = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <label htmlFor="coupon" className="text-sm font-medium">Have a GlobeUp Coupon?</label>
      <div className="flex flex-col sm:flex-row gap-2 mt-1">
        <input
          id="coupon"
          type="text"
          placeholder="Promo / Coupon Code"
          className="border px-3 py-2 text-sm rounded w-full"
        />
        <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm w-full sm:w-auto">
          Apply
        </button>
      </div>
    </div>
  );
};

export default Coupon;
