import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", form);
      setMessage("Εγγραφή επιτυχής!");
    } catch (error) {
      setMessage("Σφάλμα: " + error.response.data);
    }
  };

  return (
    <div className="register-container">
        <h2>Register</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="firstName" placeholder="First name" onChange={handleChange} />
        <input name="lastName" placeholder="Last name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <button type="submit">Register</button>
        </form>
    </div>
    );

};

export default Register;
