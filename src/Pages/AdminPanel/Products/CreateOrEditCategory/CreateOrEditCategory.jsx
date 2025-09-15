

import Editor from "../Shared/Editor";
import { useState } from 'react';
import { FaChevronDown, FaCog, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const CreateOrEditCategory = ({ 
  editedData = null, 
  loading = false,
  categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Books' },
    { id: '4', name: 'Home & Garden' },
  ], // this is default value for creation and editing
}) => {
  const isEditMode = Boolean(editedData);

  const [formData, setFormData] = useState({
    category: editedData?.category || '',
    categoryName: editedData?.categoryName || '',
    title: editedData?.title || '',
    status: editedData?.status ?? true
  });

  // by using lifting to the state up we access Editor state through send it via props as description, setDescription
  const [description, setDescription] = useState(editedData?.description || '');
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("form data : ",{
      ...formData,
      description
    })
    navigate(-1);
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-purple-50 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancelClick}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition duration-300"
              disabled={loading}
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit category' : 'Create category'}
            </h1>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
         
            <button
              onClick={() => navigate('/admin/products/categories/manage')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <FaCog className="mr-2" />
              Manage
            </button>
          </div>
        </header>

        {/* Form Container */}
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Category Select */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category *
              </label>
              <div className="relative">
                <select
                  className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                >
                  <option value="">Choose ...</option>
                  {categories.map((catg) => (
                    <option key={catg.id} value={catg.id}>
                      {catg.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaChevronDown className="fill-current h-4 w-4" />
                </div>
              </div>
            </div>

            {/* category Name Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category-name">
                 Category Name *
              </label>
              <input
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                id="category-name"
                name="categoryName"
                type="text"
                value={formData.categoryName}
                onChange={handleInputChange}
                required
                disabled={loading}
                placeholder="Enter category name"
              />
            </div>

            {/* Meta Title Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta-title">
                Meta Title
              </label>
              <input
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                id="meta-title"
                name="metaTitle"
                type="text"
                value={formData.metaTitle}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter meta title for SEO"
              />
            </div>


            <Editor 
                
                content = {description}
                setContent = {setDescription}
                formData={formData}
                handleInputChange={handleInputChange}
                loading={loading}
                handleCancelClick={handleCancelClick}
                isEditMode={isEditMode}
            />


          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditCategory;