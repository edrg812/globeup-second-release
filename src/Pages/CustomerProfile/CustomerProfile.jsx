
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  CreditCardIcon,
  ClockIcon,
  CheckBadgeIcon,
  TruckIcon,
  PaperAirplaneIcon,
  StarIcon,
  XCircleIcon,
  MapPinIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  BellIcon,
  HeartIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const CustomerProfile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // Fetch user profile
  useEffect(() => {
    fetch("https://fakestoreapi.com/users/1")
      .then((res) => res.json())
      .then((data) => setProfileInfo(data))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    }
  };

  const orderLinks = [
    { label: "All", to: "/orders/all", icon: ClipboardDocumentListIcon },
    { label: "To Pay", to: "/orders/to-pay", icon: CreditCardIcon },
    { label: "Pending", to: "/orders/pending", icon: ClockIcon },
    { label: "Confirmed", to: "/orders/confirmed", icon: CheckBadgeIcon },
    { label: "To Ship", to: "/orders/to-ship", icon: TruckIcon },
    { label: "Shipped", to: "/orders/shipped", icon: PaperAirplaneIcon },
    { label: "Reviews", to: "/orders/reviews", icon: StarIcon },
    { label: "Cancellations", to: "/orders/cancellations", icon: XCircleIcon },
  ];

  const accountLinks = [
    { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
    { label: "Help", to: "/help", icon: QuestionMarkCircleIcon },
    { label: "Returns", to: "/returns", icon: ArrowPathIcon },
    { label: "Address", to: "/address", icon: MapPinIcon },
    { label: "Policies", to: "/policies", icon: DocumentTextIcon },
    { label: "Notifications", to: "/notifications", icon: BellIcon },
    { label: "My Wishlist", to: "/wishlist", icon: HeartIcon },
  ];

  const renderLink = ({ label, to, icon: Icon }) => (
    <Link
      to={to}
      key={label}
      className="flex flex-col items-center gap-2 p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-200 focus:ring-2 focus:outline-none transition"
      aria-label={label}
    >
      <Icon className="h-6 w-6 text-indigo-500" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 grid">
      {/* Profile Header */}
      <div className="bg-white shadow-md p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
        <img
          src="https://randomuser.me/api/portraits/men/65.jpg"
          alt="User profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
        />

        <div className="text-center sm:text-left flex-1 space-y-2">
          {error && (
            <p className="text-red-500 text-sm">Failed to load user info.</p>
          )}

          {!profileInfo && !error && (
            <p className="text-gray-500 text-sm">Loading profile...</p>
          )}

          {profileInfo && (
            <>
              <h1 className="text-2xl font-semibold text-gray-800">
                {profileInfo.name.firstname} {profileInfo.name.lastname}
              </h1>
              <p className="text-gray-600 text-sm">{profileInfo.email}</p>
              <div className="flex justify-center sm:justify-start gap-4 mt-3">
                <Link to="profile" className="text-blue-600 hover:underline text-sm">
                  Edit Profile
                </Link>
                <Link to="#" className="text-blue-600 hover:underline text-sm">
                  My Voucher
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            My Orders
          </h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {orderLinks.map(renderLink)}
          </nav>
        </section>

        {/* Account */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h2>
          <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {accountLinks.map(renderLink)}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-2 p-3 rounded-lg text-sm text-gray-700 hover:bg-gray-200 focus:ring-2 focus:outline-none transition"
            >
              <PowerIcon className="h-6 w-6 text-red-500" />
              <span>Logout</span>
            </button>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfile;

