import { useEffect, useState } from "react";
import CustomerProfile from "../Profile/CustomerProfile/CustomerProfile";
import SellerProfile from "../Profile/SellerProfile/SellerProfile";
import SupplierProfile from "../Profile/SupplierProfile/SupplierProfile";
import axios from "axios";
// import useProfile from "../../hooks/useProfile";

const ProfileWrapper = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
//   const { profile, loading: profileLoading, error, refetch } = useProfile();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/user-profile/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUserType(response.data.user_type); // Assuming your API returns user_type
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

//   if (loading) return <p>Loading profile...</p>;
// console.log("Profile data:", profile.user_type);
  if (userType === "customer") return <CustomerProfile />;
  if (userType === "reseller") return <SellerProfile />;
  if (userType === "supplier") return <SupplierProfile />;

  return <p>Unknown user type</p>;
};

export default ProfileWrapper;
