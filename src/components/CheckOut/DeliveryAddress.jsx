import React from 'react';

const DeliveryAddress = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="123 Main St"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="New York"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="NY"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
            Zip Code
          </label>
          <input
            type="text"
            id="zip"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="10001"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="555-123-4567"
          />
        </div>
      </form>
    </div>
  );
};

export default DeliveryAddress;

