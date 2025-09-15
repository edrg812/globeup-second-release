import { Link, useNavigate } from "react-router-dom";
import Logo from "./parts/Logo";
import NavigationBar from "./parts/NavigationBar";
import { IoMenu, IoCartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import BasicModal from "../shared/BasicModal";
import RequestReseller from "./parts/RequestReseller";
import { useAppSelector } from "../../redux/hooks";
import useProfile from "../../hooks/useProfile";

const Header = ({ onClose }) => {
  const [isRequestResellerModalOpen, setIsRequestResellerModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // custom hooks
  const { profile } = useProfile();

  // cart info
  const resellerCartInfo = useAppSelector((state) => state.resellerCart);
  const { totalQuantity } = useAppSelector((state) => state.cart);

  // ✅ Check if user is logged in (access_token exists)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const onRequestReseller = () => {
    console.log("you've requested to become a reseller");
    // close the modal
    setIsRequestResellerModalOpen(false);
  };

  // ✅ Logout function (just clear tokens, no request)
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-[9999] bg-[#944df7] py-3 px-4 sm:px-6 lg:px-8 mb-2 md:mb-3 lg:mb-4 flex justify-center items-center">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo & Menu */}
        <div className="flex items-center gap-6">
          <Logo />
          <button
            className="flex justify-center items-center cursor-pointer"
            onClick={onClose}
          >
            <IoMenu className="text-white text-lg md:text-xl lg:text-2xl" />
          </button>
        </div>

        <NavigationBar setRequestModalOpen={setIsRequestResellerModalOpen} />

        {/* Auth buttons & Cart */}
        <div className="flex items-center space-x-4">
          {/* Reseller Cart Icon */}
          {profile?.user_type === "reseller" && (
            <Link
              to="/reseller/checkout"
              className="relative flex items-center justify-center text-white hover:bg-black/20 p-1 rounded"
            >
              <IoCartOutline className="text-xl md:text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {resellerCartInfo.totalQuantity}
              </span>
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            to="/checkout"
            className="relative flex items-center justify-center text-white hover:bg-black/20 p-1 rounded"
          >
            <IoCartOutline className="text-xl md:text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:inline-flex items-center justify-center px-2 font-medium text-white hover:bg-black/20"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="hidden md:inline-flex items-center justify-center px-2 font-medium text-white hover:bg-black/20"
              >
                Log In
              </Link>
              <Link
                to={"/register"}
                className="hidden md:inline-flex items-center justify-center px-2 font-medium text-white hover:bg-black/20"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* request reseller modal */}
      <BasicModal
        isModalOpen={isRequestResellerModalOpen}
        onClose={() => setIsRequestResellerModalOpen(false)}
      >
        <RequestReseller
          onRequest={onRequestReseller}
          onClose={() => setIsRequestResellerModalOpen(false)}
        />
      </BasicModal>
    </header>
  );
};

export default Header;
