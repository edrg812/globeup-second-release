import React from "react";
import { Navigate } from "react-router-dom";
import useProfile from "../hooks/useProfile";
const ProtectedRoute = ({ allowedRole, children }) => {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div>Loading...</div>; // spinner or loader
  }

  // If not logged in or wrong role → redirect home
  if (!profile || profile.user_type !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
