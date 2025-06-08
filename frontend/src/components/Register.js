import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ onAuth }) => {
  const [form, setForm] = useState({
    username: "", password: "", confirmPassword: "",
    firstName: "", lastName: "", email: "", phone: "",
    address: "", location: "", afm: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const payload = {
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      location: form.location,
      afm: form.afm
    };

    try {
      await axios.post("https://localhost:8443/api/users/register", payload);
      // Auto-login after successful registration
      const loginRes = await axios.post("https://localhost:8443/api/users/login", {
        username: form.username,
        password: form.password
      });
      localStorage.setItem("user", JSON.stringify(loginRes.data));
      localStorage.removeItem("guest");
      if (onAuth) onAuth(loginRes.data);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage("❌ Username already exists");
      } else if (err.response?.status === 401) {
        setMessage("❌ Login failed after registration");
      } else {
        setMessage("❌ Registration failed");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required onChange={handleChange} value={form.username} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={form.password} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} value={form.confirmPassword} />

        <input name="firstName" placeholder="First Name" required onChange={handleChange} value={form.firstName} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} value={form.lastName} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={form.email} />
        <input type="tel" name="phone" placeholder="Phone" required onChange={handleChange} value={form.phone} />

        <input name="address" placeholder="Address" required onChange={handleChange} value={form.address} />
        <input name="location" placeholder="Location" required onChange={handleChange} value={form.location} />
        <input name="afm" placeholder="Tax ID (ΑΦΜ)" required onChange={handleChange} value={form.afm} />

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
