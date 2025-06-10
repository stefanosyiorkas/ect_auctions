import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "./Register.css";

const Login = ({ onAuth }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.removeItem("guest"); // ensure not in guest mode
      if (onAuth) onAuth(res.data);
      navigate("/");
      toast.success("Logged in successfully");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const continueAsGuest = () => {
    localStorage.removeItem("user");
    localStorage.setItem("guest", "true");
    navigate("/");
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <button
        type="button"
        onClick={continueAsGuest}
        style={{
          marginTop: "12px",
          background: "transparent",
          border: "none",
          color: "#0a66c2",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default Login;
