import { useState } from 'react';
import { FaSave, FaCog } from 'react-icons/fa';
import { Link } from "react-router-dom";

const CreateOrEditOrderStatus = ({ 
  initialData 
}) => {
  const [formData, setFormData] = useState(initialData || {
    orderState: "",
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
            {initialData ? 'Edit Order' : 'Create Order'}
          </h1>
          <Link 
            to={`/admin/settings/order-status/manage`} 
            className="flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 md:px-6 rounded-lg shadow-md transition duration-300"
          >
            <FaCog className="mr-2" />
            Manage
          </Link>
        </div>
        
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* orderState */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="orderState">
                  Order State
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  id="orderState"
                  type="text"
                  value={formData.orderState}
                  onChange={handleChange}
                />
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
                    style={{ right: formData.status ? '0' : '0.5rem', borderColor: formData.status ? '#3B82F6' : '#D1D5DB' }}
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
                {initialData ? 'Edit' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditOrderStatus;