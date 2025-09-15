

import { useState, useEffect } from 'react';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaHeart, FaShoppingCart, FaBell, FaHistory, FaTimes, FaDollarSign, FaBoxes, FaChartBar,  FaCommentDots ,  FaPlus} from 'react-icons/fa';
import { FiFilter } from "react-icons/fi";


import CreateOrEditProduct from '../../AdminPanel/Products/CreateOrEditProduct/CreateOrEditProduct';

import Stock from "../../../components/Profile/Tabs/StockTab";

import Report from '../../../components/Profile/Tabs/SellerReport/SellerReport';

import {Link} from "react-router-dom";
import api from "../../../services/api/axiosConfig.js";





// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [


   
    
   
    {id: "stock", label: "Stock", icon: <FaDollarSign className='mr-2' />},
    {id: "report", label: "Report", icon: <FaBoxes className='mr-2' />},
   
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
         <Link to={"/supplier/product/create"} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaPlus className='mr-2'/> Create Product
          </Link>
      </nav>
    </div>
  );
};










// Supplier Profile Component
const SupplierActions = () => {
  const [activeTab, setActiveTab] = useState('stock');
  
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Fetch stock data when component mounts
 useEffect(() => {
  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/supplier_added_product_variants');
      const data = response.data;

      // Transform API data to match Stock component structure
      const transformedData = data.results.map(item => ({
        id: item.id,
        name: item.product.name,
        sku: item.sku,
        stock: item.stock,
        price: parseFloat(item.price),
        old_price: parseFloat(item.old_price),
        status: getStockStatus(item.stock),
        statusColor: getStatusColor(item.stock),
        color: item.color,
        size: item.size,
        is_active: item.is_active,
        image: item.image,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setStockData(transformedData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch stock data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchStockData();
}, []);
    // Helper function to determine stock status
    const getStockStatus = (stock) => {
      if (stock === 0) return 'Out of Stock';
      if (stock <= 20) return 'Low Stock';
      return 'In Stock';
    };
  
    // Helper function to determine status color
    const getStatusColor = (stock) => {
      if (stock === 0) return 'red';
      if (stock <= 20) return 'yellow';
      return 'emerald';
    };
  

  

  const renderTabContent = () => {
    switch (activeTab) {
      
   
        
     
     case "stock":
        return <Stock stockData={stockData} loading={loading} error={error} />;
      case 'report':
        return <Report />
 
     

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TabNavigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            
          />
          {renderTabContent()}
         
          
        </div>
      </div>
    </div>
  );
};

export default SupplierActions;


