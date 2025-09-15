
import { useState } from 'react';
import { FaEdit, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaHeart, FaShoppingCart, FaBell, FaHistory, FaTimes, FaDollarSign, FaBoxes, FaChartBar,  FaCommentDots } from 'react-icons/fa';
import { FiFilter } from "react-icons/fi";

// import Review from "../../../../src/components/Profile/Review";
import Review from "../../components/Profile/Tabs/SellerReport/SellerReport";

import Earning from "../../components/Profile/Tabs/Earning/Earning";
import Stock from "../../components/Profile/Tabs/StockTab";
// import Report from "../../../components/Profile/Tabs/ReportTab";

import Report from '../../components/Profile/Tabs/SellerReport/SellerReport';






// Custom hook for cart management
const useCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Cozy Knit Sweater', price: 79.99, quantity: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVP_RdQJ6_U41UbfV-viEMxEnebyN0yznsef_KlonhUUf0bkt-BxFP9XReMrqSiEQzwsg6rMUjBpk3-5asVVx4zDH-r3iHHSun6iPb2yoai9-bBewVHGeYxs-lKMkNuQrCBquy17hH9caa2NbLny6f1OgaW-EJtp7ik4XUL8jSciv70nrDIiSGSVWbJtHGvRfk3zK535H6y9J8bC1lFAr6magF5KZx6-uI2EwZMEe7JwktYMm0TcprgiBpyM3QW8VZPQHuppe6soGt' },
    { id: 2, name: 'Classic Leather Boots', price: 149.99, quantity: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBblh_jR4KJ1LqaT5bkExCrXijCqJ0HiskBCk-_yDEn0wzRNSuVbgZK2Zl_h52-pqVPhJVsOBm4ljAElIKeIcsKLzGa0j5DqoNeNLZvm2foD3Vuhy27J2IdRicdpfHZQfC_b6FvLKEZ1IC2Z0yOASNkEkbQl7EdisrYHvTkucGP884RW3NJLn-odDx_Sgim_J6Mbu82_IXBBG_NUHr79b5GCpciXzy0gQMx9qLZFJgy1lQP1GIXeZQG3aeflO4z80hKr8Zxz1DCcEuM' },
  ]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addItem = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      }
      
      return [...prevItems, {...product, quantity: 1}];
    });
  };

  return {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem,
    addItem
  };
};


// Order Details Modal Component
const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Order #{order.id} • Placed on {order.date}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Items Purchased</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
                        <img 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md" 
                          src={item.image} 
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing Address</h3>
                    <p className="text-sm text-gray-600">Same as shipping address</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mr-4">
                      <span className="text-green-600">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-green-600 capitalize">{order.status}</p>
                      <p className="text-sm text-gray-600">on {order.deliveryDate || order.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                      <span className="text-xs font-bold">MC</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">MasterCard</p>
                      <p className="text-sm text-gray-600">ending in 1234</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-gray-900 font-medium">${order.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Shipping</p>
                      <p className="text-gray-900 font-medium">${order.shippingCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Taxes</p>
                      <p className="text-gray-900 font-medium">${order.tax.toFixed(2)}</p>
                    </div>
                    <div className="border-t border-gray-200 my-3"></div>
                    <div className="flex justify-between font-bold text-base">
                      <p className="text-gray-900">Total</p>
                      <p className="text-blue-600">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Picture Component
const ProfilePicture = ({ src, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
        <img 
          src={src || "https://via.placeholder.com/128"} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
            <FaEdit className="text-white" size={20} />
          </div>
        )}
      </div>
      <button 
        onClick={onEdit}
        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Edit profile picture"
      >
        <FaEdit size={14} />
      </button>
    </div>
  );
};

// Input Field Component
const InputField = ({ icon, label, type, name, value, onChange, placeholder, required = false, disabled = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100' : ''}`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

// Gender Select Component
const GenderSelect = ({ value, onChange, disabled = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          <FaVenusMars />
        </div>
        <select
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${disabled ? 'bg-gray-100' : ''}`}
          disabled={disabled}
          name="gender"
        >
         
          <option value="male">Male</option>
          <option value="female">Female</option>
          
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, cartCount }) => {
  const tabs = [
    // { id: 'profile', label: 'Profile', icon: <FaUser className="mr-2" /> },
    { id: 'orders', label: 'Orders', icon: <FaHistory className="mr-2" /> },
    { id: 'reviews', label: 'Reviews', icon: <FaCommentDots size={20} color="orange" /> },

    // { 
    //   id: 'cart', 
    //   label: 'Cart', 
    //   icon: (
    //     <div className="relative mr-2">
    //       <FaShoppingCart />
    //       {cartCount > 0 && (
    //         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    //           {cartCount}
    //         </span>
    //       )}
    //     </div>
    //   ) 
    // },
    // {id: "earning", label: "Earning", icon: <FaDollarSign className='mr-2' />},
    {id: "stock", label: "Stock", icon: <FaDollarSign className='mr-2' />},
    {id: "report", label: "Report", icon: <FaBoxes className='mr-2' />},
    // { id: 'notifications', label: 'Notifications', icon: <FaChartBar className="mr-2" /> },
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
      </nav>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ userData, handleInputChange, isEditing, setIsEditing, handleSave, handleCancel, handleProfilePictureEdit }) => {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-8">
        <ProfilePicture 
          src={userData.profilePicture || "https://via.placeholder.com/128"} 
          onEdit={handleProfilePictureEdit}
        />
        <h2 className="text-xl font-semibold mt-4">{userData.firstName} {userData.lastName}</h2>
        <p className="text-gray-600">{userData.email}</p>
        <span className='text-gray-900'>(Seller)</span>
        <a className='text-green-950' href='#'>Become a supplier</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={<FaUser />}
          label="First Name"
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          placeholder="Enter your first name"
          required
          disabled={!isEditing}
        />
        
        <InputField
          icon={<FaUser />}
          label="Last Name"
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          placeholder="Enter your last name"
          required
          disabled={!isEditing}
        />
        
        <InputField
          icon={<FaEnvelope />}
          label="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
          disabled={!isEditing}
        />
        
        <InputField
          icon={<FaPhone />}
          label="Phone Number"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          disabled={!isEditing}
        />
        
        <InputField
          icon={<FaBirthdayCake />}
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        
        <GenderSelect
          value={userData.gender}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};


const OrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ status: "all" }); // filter state
  const [showFilters, setShowFilters] = useState(false); // for mobile filter toggle

  const orders = [
    { id: "12345", date: "July 15, 2023", total: 120.0, subtotal: 99.96, shippingCost: 5.0, tax: 7.5, status: "Shipped", deliveryDate: "July 18, 2023", items: [{ id: 1, name: "Cozy Knit Sweater", price: 79.99, quantity: 1, image: "https://example.com/sweater.jpg" }, { id: 2, name: "Classic Leather Boots", price: 149.99, quantity: 1, image: "https://example.com/boots.jpg" }], shippingAddress: { name: "Sophia Clark", street: "123 Green Street", city: "Anytown", state: "CA", zip: "91234" } },
    { id: "12344", date: "June 20, 2023", total: 85.5, subtotal: 79.99, shippingCost: 5.0, tax: 0.51, status: "Delivered", deliveryDate: "June 22, 2023", items: [{ id: 3, name: "Sneakers", price: 79.99, quantity: 1, image: "https://example.com/sneakers.jpg" }], shippingAddress: { name: "Sophia Clark", street: "123 Green Street", city: "Anytown", state: "CA", zip: "91234" } },
    { id: "12343", date: "May 5, 2023", total: 45.0, subtotal: 39.99, shippingCost: 5.0, tax: 0.01, status: "Cancelled", items: [{ id: 4, name: "Hat", price: 39.99, quantity: 1, image: "https://example.com/hat.jpg" }], shippingAddress: { name: "Sophia Clark", street: "123 Green Street", city: "Anytown", state: "CA", zip: "91234" } },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // filter logic
  const filteredOrders =
    filters.status === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filters.status);

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Filters Sidebar */}
      <div className="md:w-64">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <FiFilter />
          Filters
        </button>

        {/* Filter panel */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block bg-white border border-gray-200 rounded-lg p-4`}
        >
          <h3 className="font-semibold text-gray-900 mb-4">Filter Orders</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="all"
                checked={filters.status === "all"}
                onChange={() => setFilters({ status: "all" })}
                className="text-blue-600"
              />
              All Orders
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="shipped"
                checked={filters.status === "shipped"}
                onChange={() => setFilters({ status: "shipped" })}
                className="text-blue-600"
              />
              Shipped
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="delivered"
                checked={filters.status === "delivered"}
                onChange={() => setFilters({ status: "delivered" })}
                className="text-blue-600"
              />
              Delivered
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="cancelled"
                checked={filters.status === "cancelled"}
                onChange={() => setFilters({ status: "cancelled" })}
                className="text-blue-600"
              />
              Cancelled
            </label>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </p>
            <p className="text-gray-600">
              Try changing your filter options or browse our collections!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.date}
                    </p>
                    <p className="text-xs text-gray-500">#{order.id}</p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ৳{order.total.toFixed(2)}
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 text-right">
                  <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};



// Shopping Cart Tab Component
const ShoppingCartTab = ({ cartItems, updateQuantity, removeItem, subtotal, shipping, total }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto max-w-xs mb-6 text-gray-400">
            <FaShoppingCart size={64} className="mx-auto" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</p>
          <p className="text-gray-600">Looks like you haven't added any items to your cart yet.</p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-6 px-4 sm:px-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Sold by: FashionStore</p>
                        <div className="flex items-center gap-2 mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              className="p-1.5 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-10 text-center border-0 text-sm p-0 focus:ring-0"
                              value={item.quantity}
                              readOnly
                            />
                            <button 
                              className="p-1.5 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between h-full">
                        <p className="text-base font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1 mt-4"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-4">Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taxes</span>
                  <span className="text-sm font-medium text-gray-900">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab = () => {
  const notifications = [
    { id: 1, title: 'Order Update', message: 'Your order #12345 has been shipped. Track your package for real-time updates.', time: '2 hours ago', read: false },
    { id: 2, title: 'New Products', message: 'New arrivals in the Summer Collection. Check them out now!', time: '1 day ago', read: false },
    { id: 3, title: 'Promotional Offer', message: 'Don\'t miss out! Enjoy 20% off on all footwear for a limited time.', time: '3 days ago', read: true },
    { id: 4, title: 'Order Update', message: 'Heads up! Your order #67890 is out for delivery and will arrive today.', time: '5 days ago', read: true },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border hover:bg-gray-50 transition-colors cursor-pointer ${
              notification.read ? 'border-transparent opacity-70' : 'border-gray-200'
            }`}
          >
            <div className="mt-1 flex-shrink-0">
              <span className={`block h-2.5 w-2.5 rounded-full ${notification.read ? 'bg-transparent' : 'bg-blue-600'}`}></span>
            </div>
            <div className="flex-grow">
              <p className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>{notification.title}</p>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main User Profile Component
const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    firstName: 'Sophia',
    lastName: 'Bennett',
    email: 'sophia.bennett@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    gender: 'female',
    profilePicture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOIAnd9pxNWqaYR1UIcq97K0vfIy3vW18Iic53qlLBYCptew8OxNVPt2RYbcDY8pbHk7dfQeo8wdRfprYoXATmyLnOvhAsBBV40peOMgEUvL8FACwTTTrIFshBa7mlITDfpAirmGRo27kLF-_w9rxql_mGF0aVmQztA4CoUumaTv1_su1_ptuj_Oazkib-WX--m2UsZ9TRy2KZcGwKBe2gSVzfPelcPt_oAWzoUzx3YI_-KG3nmot2Df2FmkNjixCmwzIamfX4576d'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});
  
  // Use the custom cart hook
  const {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem,
    addItem
  } = useCart();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real application, you would save the data to your backend here
    console.log('Saving user data:', userData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setOriginalData({...userData});
    setIsEditing(true);
  };

  const handleProfilePictureEdit = () => {
    // Create a file input element to handle image upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUserData(prev => ({
            ...prev,
            profilePicture: event.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image
    });
    setActiveTab('cart');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileTab
            userData={userData}
            handleInputChange={handleInputChange}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleProfilePictureEdit={handleProfilePictureEdit}
          />
        );
      case 'orders':
        return <OrdersTab />;
   
        
      case 'cart':
        return (
          <ShoppingCartTab
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        );
      case 'notifications':
        return <NotificationsTab />;
      case 'reviews':
        return <Review />
      case 'earning':
        return <Earning />
      case 'stock':
        return <Stock /> 
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
            cartCount={cartCount}
          />
          {renderTabContent()}
         
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;