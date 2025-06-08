import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuctionList from "./components/AuctionList";
import CreateAuction from "./components/CreateAuction";
import ProtectedRoute from "./components/ProtectedRoute";
import AuctionDetails from "./components/AuctionDetails";

function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    window.location.href = "/login";
  };  

  const loggedUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <Router>
      <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 40px",
          backgroundColor: "#f8f8f8",
          borderBottom: "1px solid #ddd"
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          {isLoggedIn && (
            <>
              <Link to="/" style={{ textDecoration: "none", color: "#0a66c2" }}>Auctions</Link>
              <Link to="/create-auction" style={{ textDecoration: "none", color: "#0a66c2" }}>Create Auction</Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/register" style={{ textDecoration: "none", color: "#0a66c2" }}>Register</Link>
              <Link to="/login" style={{ textDecoration: "none", color: "#0a66c2" }}>Login</Link>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontWeight: "500" }}>Welcome, {loggedUser.firstName}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                backgroundColor: "#c00",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>


        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <AuctionList />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-auction" element={
            <ProtectedRoute>
              <CreateAuction />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/auction/:id" element={
            <ProtectedRoute>
              <AuctionDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
