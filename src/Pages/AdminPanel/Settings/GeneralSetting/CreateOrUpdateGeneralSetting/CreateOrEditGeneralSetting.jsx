import React, { useState } from 'react';
import { FiUpload, FiSave, FiSettings } from 'react-icons/fi';
import {Link} from 'react-router-dom';


const CreateOrUpdateGeneralSetting = ({ initialData = null }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: initialData?.name || 'GlobeUp',
    whiteLogo: initialData?.whiteLogo || null,
    darkLogo: initialData?.darkLogo || null,
    favicon: initialData?.favicon || null
  });

  const [fileNames, setFileNames] = useState({
    whiteLogo: 'No file chosen',
    darkLogo: 'No file chosen',
    favicon: 'No file chosen'
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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames(prev => ({ ...prev, [field]: file.name }));
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [field]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.whiteLogo) newErrors.whiteLogo = 'White logo is required';
    if (!formData.darkLogo) newErrors.darkLogo = 'Dark logo is required';
    if (!formData.favicon) newErrors.favicon = 'Favicon is required';
    
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
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              General Setting {initialData ? 'Update' : 'Create'}
            </h1>
            <Link
              to="/admin/settings/manage"
              className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center gap-2"
            >
              <FiSettings /> Manage
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* White Logo Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="white-logo">
                  White Logo *
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="mr-2" />
                    <span className="text-sm">Choose File</span>
                    <input
                      className="hidden"
                      id="white-logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'whiteLogo')}
                    />
                    <span className="ml-3 text-sm text-gray-500 truncate">{fileNames.whiteLogo}</span>
                  </label>
                </div>
            {formData.whiteLogo && (
                  <div className="mt-4">
                    <img
                      alt="White logo preview"
                      className="w-20 h-20 object-contain rounded-md border border-gray-200"
                      src={formData.whiteLogo}
                    />
                  </div>
                )}

                {errors.whiteLogo && (
                  <p className="mt-1 text-sm text-red-600">{errors.whiteLogo}</p>
                )}
              </div>

              {/* Dark Logo Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dark-logo">
                  Dark Logo *
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="mr-2" />
                    <span className="text-sm">Choose File</span>
                    <input
                      className="hidden"
                      id="dark-logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'darkLogo')}
                    />
                    <span className="ml-3 text-sm text-gray-500 truncate">{fileNames.darkLogo}</span>
                  </label>
                </div>
                {formData.darkLogo && (
                  <div className="mt-4">
                    <img
                      alt="Dark logo preview"
                      className="w-20 h-20 object-contain rounded-md border border-gray-200"
                      src={formData.darkLogo}
                    />
                  </div>
                )}
    

                {errors.darkLogo && (
                  <p className="mt-1 text-sm text-red-600">{errors.darkLogo}</p>
                )}
              </div>

              {/* Favicon Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="favicon">
                  Favicon Logo *
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="mr-2" />
                    <span className="text-sm">Choose File</span>
                    <input
                      className="hidden"
                      id="favicon"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'favicon')}
                    />
                    <span className="ml-3 text-sm text-gray-500 truncate">{fileNames.favicon}</span>
                  </label>
                </div>
                {formData.favicon && (
                  <div className="mt-4">
                    <img
                      alt="Favicon preview"
                      className="w-20 h-20 object-contain rounded-md border border-gray-200"
                      src={formData.favicon}
                    />
                  </div>
                )}

                {errors.favicon && (
                  <p className="mt-1 text-sm text-red-600">{errors.favicon}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-600 transition duration-300 flex items-center justify-center gap-2"
              >
                <FiSave /> {initialData ? 'Update Settings' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateGeneralSetting;