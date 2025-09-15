/* import React, { useState } from 'react';

const AddressFormModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    district: '',
    city: '',
    detailedAddress: '',

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    if (form.name && form.mobile && form.district && form.city && form.area && form.detailedAddress) {
      onSave(form);
      onClose();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-full sm:max-w-lg md:max-w-2xl p-4 sm:p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-2 right-4 text-2xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold mb-6 text-center">Order Delevery Address</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
            <input id="name" name="name" onChange={handleChange} value={form.name} placeholder="Name" className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
            <input id="mobile" name="mobile" onChange={handleChange} value={form.mobile} placeholder="Mobile Number" className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District <span className="text-red-500">*</span></label>
            <select id="district" name="district" onChange={handleChange} value={form.district} className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required>
              <option value="">Select District</option>
              <option>Dhaka</option>
              <option>Chittagong</option>
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
            <select id="city" name="city" onChange={handleChange} value={form.city} className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required>
              <option value="">Select City</option>
              <option>Wari</option>
              <option>Gulshan</option>
            </select>
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area <span className="text-red-500">*</span></label>
            <select id="area" name="area" onChange={handleChange} value={form.area} className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required>
              <option value="">Select Area</option>
              <option>Area 1</option>
              <option>Area 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="detailedAddress" className="block text-sm font-medium text-gray-700">Detailed Address <span className="text-red-500">*</span></label>
            <input id="detailedAddress" name="detailedAddress" onChange={handleChange} value={form.detailedAddress} placeholder="Detailed Address" className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" required />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Type <span className="text-red-500">*</span></label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-gray-700">
              <input type="radio" name="label" value="Home" checked={form.label === 'Home'} onChange={handleChange} className="form-radio h-4 w-4 text-pink-600 transition duration-150 ease-in-out" />
              Home
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <input type="radio" name="label" value="Office" checked={form.label === 'Office'} onChange={handleChange} className="form-radio h-4 w-4 text-pink-600 transition duration-150 ease-in-out" />
              Office
            </label>
          </div>
        </div>

        <div className="mt-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={handleChange} />
            Default Delivery address
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddressFormModal;
 */

import React, { useState } from "react";

const AddressFormModal = ({ onClose, onSave }) => {
  const [shippingAddress, setShippingAddress] = useState("");

  const handleChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleSubmit = () => {
    if (shippingAddress.trim()) {
      onSave( shippingAddress );
      onClose();
    } else {
      alert("Please enter the shipping address.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-full sm:max-w-lg md:max-w-2xl p-4 sm:p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-4 text-2xl font-bold cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">
          Add Shipping Address
        </h2>

        <div>
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Shipping Address <span className="text-red-500">*</span>
          </label>
          <input
            id="shippingAddress"
            name="shippingAddress"
            type="text"
            onChange={handleChange}
            value={shippingAddress}
            placeholder="Enter your shipping address"
            className="mt-1 block w-full border p-2 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 cursor-pointer"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressFormModal;
