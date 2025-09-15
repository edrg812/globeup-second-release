
import React, { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiEdit2 } from 'react-icons/fi';

const CreateOrEditSocialMedia = ({ initialData = null}) => {
  // Form state
  const [form, setForm] = useState({
    title: initialData?.title || '',
    icon: initialData?.icon || '',
    link: initialData?.link || '',
    color: initialData?.color || '#3b82f6',
    status: initialData?.status ?? true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="bg-purple-50 min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Social Media' : 'Add Social Media'}
          </h2>
          <button 
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Icon Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Class *
              </label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="fab fa-icon"
                required
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link *
              </label>
              <input
                name="link"
                type="url"
                value={form.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color *
              </label>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded border border-gray-300"
                  style={{ backgroundColor: form.color }}
                />
                <input
                  name="color"
                  type="color"
                  value={form.color}
                  onChange={handleChange}
                  className="h-10 w-16 cursor-pointer"
                />
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">
                Status
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.status}
                  onChange={() => setForm(p => ({ ...p, status: !p.status }))}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm text-gray-600">
                  {form.status ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              {initialData ? (
                <>
                  <FiEdit2 className="mr-1" /> Update
                </>
              ) : (
                <>
                  <FiPlus className="mr-1" /> Create
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrEditSocialMedia;