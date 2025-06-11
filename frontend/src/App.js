import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AuctionList from "./components/AuctionList";
import AuctionForm from "./components/AuctionForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AuctionDetails from "./components/AuctionDetails";
import Account from "./components/Account";
import Messages from "./components/Messages";
import MessageBell from "./components/MessageBell";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";

const RedirectHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (loggedUser) {
      api
        .get(`/messages/inbox/${loggedUser.id}`)
        .then((res) => {
          const count = res.data.filter((m) => !m.readFlag).length;
          setUnread(count);
        })
        .catch(() => setUnread(0));
    }
  }, [loggedUser]);

  const refreshUnread = () => {
    if (loggedUser) {
      api
        .get(`/messages/inbox/${loggedUser.id}`)
        .then((res) => {
          const count = res.data.filter((m) => !m.readFlag).length;
          setUnread(count);
        })
        .catch(() => setUnread(0));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    setIsLoggedIn(false);
    setLoggedUser(null);
    setUnread(0);
    window.location.href = "/login";
  };

  const handleAuth = (userObj) => {
    setIsLoggedIn(true);
    setLoggedUser(userObj);
    refreshUnread();
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
                <Link to="/messages" style={linkStyle}>
                  Messages
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
              <MessageBell
                userId={loggedUser.id}
                unread={unread}
                refreshUnread={refreshUnread}
              />
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
                <AuctionList unread={unread} />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register onAuth={handleAuth} />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route path="/create-auction" element={<AuctionForm />} />
          <Route path="*" element={<RedirectHome />} />
          <Route
            path="/auction/:id"
            element={
              <ProtectedRoute>
                <AuctionDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages refreshUnread={refreshUnread} />
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
        <ToastContainer position="top-center" />
      </div>
    </Router>
  );
}

export default App;
