import { useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaSave, FaCog } from 'react-icons/fa';
import { Link } from "react-router-dom";

const CreateOrEditContact = ({ 
  initialData 
}) => {
  const [formData, setFormData] = useState(initialData || {
    hotline: '',
    hotmail: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    googleMap: '',
    status: true
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <div className="bg-gray-800 p-4 w-full"></div>
      
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {initialData ? 'Edit Contact' : 'Create Contact'}
          </h1>
          <Link 
            to={`/admin/settings/contact/manage`} 
            className="flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 md:px-6 rounded-lg shadow-md transition duration-300"
          >
            <FaCog className="mr-2" />
            Manage
          </Link>
        </div>
        
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Hotline Number */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="hotline">
                  Hotline Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="hotline"
                    type="text"
                    value={formData.hotline}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Hot Mail */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="hotmail">
                  Hot Mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="hotmail"
                    type="email"
                    value={formData.hotmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="phone"
                    type="text"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* WhatsApp Number */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="whatsapp">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaWhatsapp className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="whatsapp"
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Email Address */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Address */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                  Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Google Map */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="googleMap">
                  Google Map
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="googleMap"
                    type="text"
                    value={formData.googleMap}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Status Toggle */}
              <div className="flex items-center">
                <label className="block text-gray-700 text-sm font-semibold mr-4" htmlFor="status">
                  Status
                </label>
                <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
                  <input 
                    className="absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer transform transition-transform duration-200 ease-in-out"
                    id="status"
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleChange}
                    style={{ 
                      right: formData.status ? '0' : '0.5rem', 
                      borderColor: formData.status ? '#3B82F6' : '#D1D5DB' 
                    }}
                  />
                  <label 
                    className={`block overflow-hidden h-7 rounded-full cursor-pointer ${formData.status ? 'bg-blue-500' : 'bg-gray-300'}`}
                    htmlFor="status"
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-8">
              <button 
                type="submit"
                className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg shadow-md transition duration-300"
              >
                <FaSave className="mr-2" />
                {initialData ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditContact;