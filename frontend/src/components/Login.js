import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Reuse styling

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", form);
      setMessage("Welcome, " + res.data.firstName + "!");
      localStorage.setItem("user", JSON.stringify(res.data));
        // Redirect to home or dashboard
        window.location.href = "/"; // Adjust as needed
    } catch (err) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
