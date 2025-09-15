import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!res.ok) throw new Error("Logout failed");
      } catch (err) {
        console.error(err);
      }
    }

    // Remove tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect to login page
    navigate("/login");
    useEffect(()=>{
        handleLogout()
    },[])
  };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition-colors"
//     >
//       Logout
//     </button>
//   );
 };

export default Logout;
