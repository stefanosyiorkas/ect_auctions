import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "", password: "", confirmPassword: "",
    firstName: "", lastName: "", email: "", phone: "",
    address: "", location: "", afm: ""
  });
  const [message, setMessage] = useState("");

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
      setMessage("✅ Registered successfully! You can now log in.");
      setForm({ username: "", password: "", confirmPassword: "", firstName: "", lastName: "", email: "", phone: "", address: "", location: "", afm: "" });
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage("❌ Username already exists");
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
