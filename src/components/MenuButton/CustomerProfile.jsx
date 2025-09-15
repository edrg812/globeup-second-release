import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon,
  MapPinIcon,
  DocumentTextIcon,
  BellIcon,
  HeartIcon,
  PowerIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
const apiUrl= import.meta.env.VITE_REACT_APP_API_URL


const CustomerProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch(`${apiUrl}/api/user/profile/`) // Django endpoint
        .then((res) => res.json())
        .then((data) => setProfileInfo(data))
        .catch((err) => {
          console.error(err);
          setError(true);
        });
    }
  }, [isOpen]);

  const accountLinks = [
    { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
    { label: "Help", to: "/help", icon: QuestionMarkCircleIcon },
    { label: "Returns", to: "/returns", icon: ArrowPathIcon },
    { label: "Address", to: "/address", icon: MapPinIcon },
    { label: "Policies", to: "/policies", icon: DocumentTextIcon },
    { label: "Notifications", to: "/notifications", icon: BellIcon },
    { label: "My Wishlist", to: "/wishlist", icon: HeartIcon },
    { label: "Logout", to: "/logout", icon: PowerIcon },
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Profile
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>

            {/* Profile Content */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <img
                src={
                  profileInfo?.profile_image
                    ? `http://127.0.0.1:8000${profileInfo.profile_image}`
                    : "https://randomuser.me/api/portraits/men/65.jpg"
                }
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
                      {profileInfo.first_name} {profileInfo.last_name}
                    </h1>
                    <p className="text-gray-600 text-sm">{profileInfo.user_type}</p>
                    <p className="text-gray-600 text-sm">
                      DOB: {profileInfo.date_of_birth} | Gender: {profileInfo.gender}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Shipping: {profileInfo.default_shipping_address}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Billing: {profileInfo.default_billing_address}
                    </p>
                    <div className="flex justify-center sm:justify-start gap-4 mt-3">
                      <Link to="#" className="text-blue-600 hover:underline text-sm">
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

            {/* Account Section */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Account Settings
              </h2>
              <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {accountLinks.map(renderLink)}
              </nav>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerProfileModal;







