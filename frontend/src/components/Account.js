import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({ ...user });
  const [message, setMessage] = useState("");
  const [myAuctions, setMyAuctions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchMyAuctions = async () => {
    try {
      const res = await axios.get(
        `https://localhost:8443/api/auctions/user/${user.id}`
      );
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
      const res = await axios.put(
        `https://localhost:8443/api/users/${user.id}`,
        form
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("✅ Profile updated successfully");
    } catch {
      setMessage("❌ Failed to update profile");
    }
  };

  const deleteAuction = async (auctionId) => {
    if (!window.confirm("Are you sure you want to delete this auction?"))
      return;
    try {
      await axios.delete(`https://localhost:8443/api/auctions/${auctionId}`);
      setMyAuctions((prev) => prev.filter((a) => a.id !== auctionId));
      setMessage("✅ Auction deleted");
    } catch {
      setMessage("❌ Cannot delete auction (it may have started or has bids)");
    }
  };

  return (
    <div className="register-container">
      <h2>My Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} disabled />
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          name="afm"
          placeholder="AFM"
          value={form.afm}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>

      {message && <p>{message}</p>}

      <h3 style={{ marginTop: "2rem" }}>My Auctions</h3>
      {myAuctions.length === 0 ? (
        <p>No auctions created.</p>
      ) : (
        <ul>
          {myAuctions.map((a) => {
            // Robust date parsing
            let endsDate;
            if (typeof a.endTime === "number") {
              // If timestamp is in seconds, convert to ms
              endsDate = new Date(
                a.endTime < 1e12 ? a.endTime * 1000 : a.endTime
              );
            } else {
              endsDate = new Date(a.endTime);
            }
            const isExpired = endsDate < new Date();
            return (
              <li key={a.id} style={{ marginBottom: "14px" }}>
                <strong>{a.name}</strong> – ${a.currentPrice} <br />
                Ends:{" "}
                {isNaN(endsDate.getTime())
                  ? "Invalid date"
                  : endsDate.toLocaleString()}{" "}
                <br />
                <button
                  onClick={() => deleteAuction(a.id)}
                  disabled={false}
                  title={
                    isExpired ? "Delete expired auction" : "Delete auction"
                  }
                  style={{
                    marginTop: "6px",
                    padding: "6px 12px",
                    backgroundColor: "crimson",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                {isExpired && (
                  <span style={{ color: "#888", marginLeft: 8 }}>
                    (Expired)
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Account;
