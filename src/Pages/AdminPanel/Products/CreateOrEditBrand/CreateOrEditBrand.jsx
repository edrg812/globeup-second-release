

import React, { useState } from 'react';

const CreateOrEditBrand = ({ brand = null }) => {
  // Initialize state with existing brand data or defaults




  const [formData, setFormData] = useState({
    name: brand?.name || '',
    image: null,
    status: brand?.status !== undefined ? brand.status : true,
    fileName: brand?.image ? 'Existing file' : 'No file chosen'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        fileName: file ? file.name : 'No file chosen'
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // it have to implement
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {brand ? 'Edit Brand' : 'Create Brand'}
        </h1>
        <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          Manage
        </button>
      </header>
      
      <main className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image">
              Image
            </label>
            <div className="flex items-center">
              <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-md border border-gray-300">
                  Choose File
                </span>
                <span className="ml-4 text-gray-500">{formData.fileName}</span>
                <input
                  className="hidden"
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">
              Status
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                id="status"
                name="status"
                type="checkbox"
                checked={formData.status}
                onChange={handleInputChange}
              />
              <label
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  formData.status ? 'bg-teal-500' : 'bg-gray-300'
                }`}
                htmlFor="status"
              ></label>
            </div>
            <span className="text-gray-700 text-sm">
              {formData.status ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <div className="flex items-center">
            <button
              className="bg-teal-500 text-white px-8 py-2 rounded-lg hover:bg-teal-600 transition-colors"
              type="submit"
            >
              {brand ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </main>
      
      <style>
        {`
          .toggle-checkbox:checked {
            right: 0;
            border-color: #38b2ac;
          }
          .toggle-checkbox:checked + .toggle-label {
            background-color: #38b2ac;
          }
        `}
      </style>
    </div>
  );
};

export default CreateOrEditBrand;