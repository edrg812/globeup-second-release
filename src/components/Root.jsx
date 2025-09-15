import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

const Root = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);

    const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-['Work_Sans']`}>
      <Header onClose={toggleSidebar} />

      {isSideBarOpen && !isAdminRoute  && <Sidebar onClose={toggleSidebar} />}

      <div className="grow">
        <Outlet />
      </div>

      <Footer />

      {/* react toastify container */}
      <ToastContainer />
    </div>
  );
};

export default Root;
