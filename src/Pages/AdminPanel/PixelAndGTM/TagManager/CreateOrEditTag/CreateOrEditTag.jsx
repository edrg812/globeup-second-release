

import React, { useState } from 'react';
import { FiSettings, FiCheck } from 'react-icons/fi';
import {Link} from "react-router-dom";


const CreateOrEditTag = ({previousData}) => {
  const [formData, setFormData] = useState({
    tagsId: previousData?.tagsId || '',
    status: previousData?.status || true
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleStatus = () => {
    setFormData(prev => ({
      ...prev,
      status: !prev.status
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tagsId.trim()) {
      newErrors.tagsId = 'tags ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // API call would go here
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen font-sans">
      <div className="min-h-screen">
        <header className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{previousData ? 'Edit tag' : 'Create tag'}</h1>
          <Link
            to="/admin/settings/tags/manage"
            
            className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 flex items-center gap-2"
          >
            <FiSettings /> Manage
          </Link>
        </header>

        <main className="p-4">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 mt-6 md:mt-10">
            <form onSubmit={handleSubmit}>
              {/* tags ID Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="tags-id">
                  tags ID *
                </label>
                <input
                  id="tags-id"
                  name="tagsId"
                  type="text"
                  value={formData.tagsId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${errors.tagsId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                  placeholder="Enter your tags ID"
                />
                {errors.tagsId && (
                  <p className="mt-1 text-sm text-red-600">{errors.tagsId}</p>
                )}
              </div>

              {/* Status Toggle */}
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Status
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${formData.status ? 'bg-blue-300' : 'bg-gray-200'}`}
                    onClick={toggleStatus}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        formData.status ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-gray-700">
                    {formData.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition duration-300 flex items-center justify-center gap-2"
              >
                <FiCheck size={18} /> Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateOrEditTag;