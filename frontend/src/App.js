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
    window.location.href = "/login";
  };

  const loggedUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <Router>
      <div>
        <nav style={{ textAlign: "center", margin: "20px 0" }}>
          {!isLoggedIn && (
            <>
              <Link to="/register" style={{ marginRight: "20px" }}>Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/" style={{ marginRight: "20px" }}>Auctions</Link>
              <Link to="/create-auction" style={{ marginRight: "20px" }}>Create Auction</Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  backgroundColor: "#c00",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Logout
              </button>
              <span style={{ fontWeight: "bold" }}>
                Welcome, {loggedUser.firstName}
              </span>
            </>
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
