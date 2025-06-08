import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const isGuest = localStorage.getItem("guest") === "true";

  return user || isGuest ? children : <Navigate to="/login" replace />;
};


export default ProtectedRoute;
