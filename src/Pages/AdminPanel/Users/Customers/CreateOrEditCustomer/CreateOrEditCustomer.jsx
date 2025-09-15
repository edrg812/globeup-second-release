
import { useState } from 'react';
import { FiX, FiUpload, FiCheck, FiUsers } from 'react-icons/fi';
import {Link} from 'react-router-dom';

const CreateOrEditCustomer = ({ customer = null }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    password: '',
    confirmPassword: ''
  });

  const [selectedRoles, setSelectedRoles] = useState(customer?.roles || ['Editor']);
  const [profileImage, setProfileImage] = useState(customer?.image || null);
  const [isActive, setIsActive] = useState(customer?.status !== false);
  const [fileName, setFileName] = useState('No file chosen');
  const [errors, setErrors] = useState({});

  const availableRoles = ['Admin', 'Editor', 'Salesman', 'Customer'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when customer types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!customer && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (selectedRoles.length === 0) {
      newErrors.roles = 'At least one role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submittedData = {
        ...formData,
        roles: selectedRoles,
        image: profileImage,
        status: isActive
      };
      console.log('Form submitted:', submittedData);
      // API call would go here
    }
  };

  return (
    <div className="bg-purple-100 p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {customer ? 'Edit customer' : 'Create New customer'}
          </h1>
          <Link
            to="/admin/customers/manage"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <FiUsers /> Manage customers
          </Link>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password {!customer && '*'}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                  Confirm Password {!customer && '*'}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Roles Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roles *
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                        selectedRoles.includes(role)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {role}
                      {selectedRoles.includes(role) && (
                        <FiX className="ml-2 text-white hover:text-gray-200" size={14} />
                      )}
                    </button>
                  ))}
                </div>
                {errors.roles && (
                  <p className="mt-1 text-sm text-red-600">{errors.roles}</p>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
                  Image {customer ? '' : '*'}
                </label>
                <div className="flex items-center">
                  <label className="w-full flex items-center px-4 py-2 bg-white rounded-md shadow-sm tracking-wide uppercase border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <FiUpload className="text-gray-500 mr-2" size={16} />
                    <span className="text-sm text-gray-500">Choose File</span>
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <span className="ml-3 text-sm text-gray-500 truncate">{fileName}</span>
                  </label>
                </div>
                <div className="mt-4 flex items-center">
                  {profileImage && <img
                    alt="customer profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    src={profileImage}
                  /> }
                </div>
              </div>

              {/* Status Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      isActive ? 'bg-teal-500' : 'bg-gray-300'
                    }`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-sm text-gray-700">
                    {isActive ? (
                      <span className="flex items-center">
                        <FiCheck className="text-teal-500 mr-1" size={14} />
                        Active
                      </span>
                    ) : (
                      'Inactive'
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
              >
                {customer ? 'Update customer' : 'Create customer'}
                <FiCheck size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditCustomer;