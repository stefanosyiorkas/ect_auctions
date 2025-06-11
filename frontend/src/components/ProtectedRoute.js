import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const isGuest = localStorage.getItem("guest") === "true";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isGuest) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user, isGuest, location, navigate]);

  return user || isGuest ? children : null;
};

export default ProtectedRoute;
