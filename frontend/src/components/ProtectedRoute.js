import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const isGuest = localStorage.getItem("guest") === "true";
  const location = useLocation();

  if (user || isGuest) {
    return children;
  }
  return <Navigate to="/login" replace state={{ from: location }} />;
};


export default ProtectedRoute;
