import React, { useState } from 'react';

const CreateOrEditReview = ({ reviewInfo}) => { // actual edited review will be fetched from api
  // Default values for new review
  const defaultReview = {
    product: '',
    customerName: '',
    customerEmail: 'N / A',
    rating: 5,
    review: '',
    status: true,
   
  };

  const [formData, setFormData] = useState(reviewInfo || defaultReview);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // it have to implement
    
  };

  return (
    <div className="bg-violet-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            {reviewInfo ? 'Edit Review' : 'Create Review'}
          </h1>
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg">
            Manage
          </button>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="product">
                  Product *
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a product</option>
                    <option value="প্রিমিয়াম কোয়ালিটি কটন পাঞ্জাবী | PLW-512">
                      প্রিমিয়াম কোয়ালিটি কটন পাঞ্জাবী | PLW-512
                    </option>
                    {/* Add more products as needed */}
                  </select>
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerName">
                  Customer Name *
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  id="customerName"
                  name="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customerEmail">
                  Customer Email *
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="rating">
                  Rating *
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="review">
                Review *
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                id="review"
                name="review"
                rows="6"
                value={formData.review}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                Status
              </label>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    className="sr-only"
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleChange}
                  />
                  <div className={`block ${formData.status ? 'bg-purple-200' : 'bg-gray-200'} w-14 h-8 rounded-full`}></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                      formData.status ? 'transform translate-x-6 bg-purple-500' : ''
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded-lg"
                type="submit"
              >
                {reviewInfo ? 'Update Review' : 'Create Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditReview;