


import { Link } from "react-router-dom";
import {
  FiUser,
  FiBell,
  FiShoppingCart,
  FiGrid,
  FiSettings,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ onClose }) => {
  return (
    <div className="mt-20 z-50 w-[15rem] min-h-[50vh] bg-[#2e2e2e] text-white p-6 shadow-xl rounded-r-lg fixed top-0">
      {/* Close Icon */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-400"
        aria-label="Close sidebar"
      >
        <FiX size={24} />
      </button>

      <ul className="space-y-4">
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <FiGrid /> <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <FiUser /> <Link to="/profile">Profile</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <FiBell /> <Link to="/notifications">Notifications</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <FiShoppingCart /> <Link to="/cart">Cart</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <FiSettings /> <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;



