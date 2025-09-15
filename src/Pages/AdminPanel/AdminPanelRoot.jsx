import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from "../../components/AdminPanel/AdminPanelRoot/NavigationBar/NavigationBar";

const AdminPanelRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 bg-[#f5f6f8]">
        <div className="hidden lg:block">
          <NavigationBar />
        </div>
        <div
          className={"md:col-span-2 lg:col-span-6 h-full scroll-auto"}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelRoot;
