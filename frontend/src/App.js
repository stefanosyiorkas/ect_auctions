import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuctionList from "./components/AuctionList";
import CreateAuction from "./components/CreateAuction";
import ProtectedRoute from "./components/ProtectedRoute";
import AuctionDetails from "./components/AuctionDetails";
import Account from "./components/Account";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    setIsLoggedIn(false);
    setLoggedUser(null);
    window.location.href = "/login";
  };

  const handleAuth = (userObj) => {
    setIsLoggedIn(true);
    setLoggedUser(userObj);
  };

  const linkStyle = { textDecoration: "none", color: "#0a66c2" };

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
            borderBottom: "1px solid #ddd",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {isLoggedIn && (
              <>
                <Link to="/" style={linkStyle}>
                  Auctions
                </Link>
                <Link to="/create-auction" style={linkStyle}>
                  Create Auction
                </Link>
                <Link to="/account" style={linkStyle}>
                  My Account
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#0a66c2" }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#0a66c2" }}
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {isLoggedIn && loggedUser && (
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontWeight: "500" }}>
                Welcome, {loggedUser.firstName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  backgroundColor: "#c00",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AuctionList />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register onAuth={handleAuth} />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route
            path="/create-auction"
            element={
              <ProtectedRoute>
                <CreateAuction />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/auction/:id"
            element={
              <ProtectedRoute>
                <AuctionDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
