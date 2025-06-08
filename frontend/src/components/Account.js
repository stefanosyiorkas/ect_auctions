import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ ...user, confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [myAuctions, setMyAuctions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchMyAuctions = async () => {
    try {
      const res = await axios.get(`https://localhost:8443/api/auctions/user/${user.id}`);
      setMyAuctions(res.data);
    } catch {
      setMyAuctions([]);
    }
  };

  useEffect(() => {
    fetchMyAuctions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://localhost:8443/api/users/${user.id}`, form);
      setMessage("✅ Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch {
      setMessage("❌ Failed to update profile");
    }
  };

  return (
    <div className="register-container">
      <h2>My Account</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} disabled />
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="afm" placeholder="ΑΦΜ" value={form.afm} onChange={handleChange} required />

        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}

      <h3 style={{ marginTop: "30px" }}>My Auctions</h3>
      {myAuctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        <ul>
          {myAuctions.map((a) => (
            <li key={a.id}>
              <strong>{a.name}</strong> – ${a.currentPrice} – ends {new Date(a.endTime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
