import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";

const AuctionForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    name: "",
    category: "",
    startingPrice: "",
    currentPrice: "",
    startTime: "",
    endTime: "",
    location: "",
    country: "",
    description: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const now = new Date();
    const start = new Date(form.startTime);
    const end = new Date(form.endTime);
    if (start < now) {
      toast.error("Start time cannot be in the past.");
      return;
    }
    if (end <= start) {
      toast.error("End time must be after start time.");
      return;
    }
    const payload = {
      ...form,
      startingPrice: parseFloat(form.startingPrice),
      currentPrice: parseFloat(form.currentPrice),
      seller: { id: user.id }
    };

    try {
      await axios.post("https://localhost:8443/api/auctions", payload);
      toast.success("Auction created successfully!");
      setForm({ name: "", category: "", startingPrice: "", currentPrice: "", startTime: "", endTime: "", location: "", country: "", description: "" });
    } catch {
      toast.error("Failed to create auction");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" title="Ονομασία του αντικειμένου" required value={form.name} onChange={handleChange} />
        <input name="category" placeholder="Category" title="Κατηγορία στην οποία ανήκει το αντικείμενο" required value={form.category} onChange={handleChange} />
        <input type="number" step="0.01" name="startingPrice" placeholder="Starting Price" title="Ελάχιστη προσφορά εκκίνησης" required value={form.startingPrice} onChange={handleChange} />
        <input type="number" step="0.01" name="currentPrice" placeholder="Current Price" title="Τρέχουσα τιμή (αρχικά ίδια με Starting Price)" required value={form.currentPrice} onChange={handleChange} />
        <input type="datetime-local" name="startTime" title="Ημερομηνία και ώρα έναρξης" required value={form.startTime} onChange={handleChange} />
        <input type="datetime-local" name="endTime" title="Ημερομηνία και ώρα λήξης" required value={form.endTime} onChange={handleChange} />
        <input name="location" placeholder="Location" title="Τοποθεσία του αντικειμένου (π.χ. Αθήνα)" required value={form.location} onChange={handleChange} />
        <input name="country" placeholder="Country" title="Χώρα προέλευσης" required value={form.country} onChange={handleChange} />
        <textarea name="description" placeholder="Description" title="Περιγραφή του αντικειμένου" required value={form.description} onChange={handleChange} />

        <button type="submit">Submit Auction</button>
      </form>
    </div>
  );
};

export default AuctionForm;
