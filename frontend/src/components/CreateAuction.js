import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // reuse styling

const CreateAuction = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    startingPrice: "",
    startTime: "",
    endTime: ""
  });

  const [message, setMessage] = useState("");
  const sellerId = 1; // mock user

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      startingPrice: parseFloat(form.startingPrice),
      seller: { id: sellerId }
    };
    try {
      await axios.post("http://localhost:8080/api/auctions", payload);
      setMessage("Auction created successfully!");
      setForm({
        name: "", description: "", category: "", startingPrice: "", startTime: "", endTime: ""
      });
    } catch (err) {
      setMessage("Failed to create auction");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Auction</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="startingPrice" placeholder="Starting Price" type="number" step="0.01" value={form.startingPrice} onChange={handleChange} required />
        <input name="startTime" type="datetime-local" value={form.startTime} onChange={handleChange} required />
        <input name="endTime" type="datetime-local" value={form.endTime} onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAuction;
