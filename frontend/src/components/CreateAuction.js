import React, { useState } from "react";
import api from "../api";
import "./Register.css";

const CreateAuction = () => {
  const isGuest = localStorage.getItem("guest") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    startingPrice: "",
    endTime: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      startingPrice: parseFloat(form.startingPrice),
      seller: { id: user.id },
    };

    try {
      await api.post("/auctions", payload);
      setMessage("✅ Auction created successfully!");
      setForm({
        name: "",
        description: "",
        category: "",
        startingPrice: "",
        endTime: "",
      });
    } catch {
      setMessage("❌ Failed to create auction");
    }
  };

  if (isGuest) {
    return (
      <div className="register-container">
        <h2>Create Auction</h2>
        <p style={{ color: "gray" }}>
          Guests are not allowed to create auctions. Please log in first.
        </p>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Title"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="startingPrice"
          placeholder="Starting Price"
          value={form.startingPrice}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="datetime-local"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
      <p style={{ color: "red", marginTop: "20px" }}>
        This file is now replaced by AuctionForm.js. Please use AuctionForm.js
        for auction creation.
      </p>
    </div>
  );
};

export default CreateAuction;
