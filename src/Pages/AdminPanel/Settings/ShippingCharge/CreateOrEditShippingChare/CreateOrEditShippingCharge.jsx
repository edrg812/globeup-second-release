
import  { useState,  } from 'react';
import {  FaEnvelope, FaMapMarkerAlt,  FaSave, FaCog, FaBalanceScale } from 'react-icons/fa';

import {Link} from "react-router-dom";

const CreateOrEditShippingCharge = ({ 
  initialData , 
  
}) => {
  const [formData, setFormData] = useState(initialData || {
    area: '',
    amount: 0,
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
            to={`/admin/settings/shipping-charge/manage`} 

            className="flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 md:px-6 rounded-lg shadow-md transition duration-300"
          >
            <FaCog className="mr-2" />
            Manage
          </Link>
        </div>
        
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Area */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="area">
                  Area
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="area"
                    type="text"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Amount */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="amount">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBalanceScale className="text-gray-400" />
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    id="amount"
                    type="number"
                    value={formData.amount}
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
                    className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    id="status"
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleChange}
                  />
                  <label 
                    className={`toggle-label block overflow-hidden h-7 rounded-full cursor-pointer ${formData.status ? 'bg-blue-500' : 'bg-gray-300'}`}
                    htmlFor="status"
                  ></label>
                </div>
                <style jsx>{`
                  .toggle-checkbox:checked {
                    right: 0;
                    border-color: #3B82F6;
                  }
                  .toggle-checkbox:checked + .toggle-label {
                    background-color: #3B82F6;
                  }
                `}</style>
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

export default CreateOrEditShippingCharge;