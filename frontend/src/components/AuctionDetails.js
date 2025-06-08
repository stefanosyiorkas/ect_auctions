import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // reuse styling

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/auctions`)
      .then(res => {
        const found = res.data.find(item => item.id.toString() === id);
        setAuction(found);
      });
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();

    try {
      // Mock bid submission (implement real API later)
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Simulated bid:", {
        bidderId: user.id,
        auctionId: id,
        amount: parseFloat(bidAmount)
      });

      setMessage("Bid submitted (simulated)");
      setBidAmount("");
    } catch {
      setMessage("Failed to submit bid");
    }
  };

  if (!auction) return <p>Loading auction...</p>;

  return (
    <div className="register-container">
      <h2>{auction.name}</h2>
      <p><strong>Description:</strong> {auction.description}</p>
      <p><strong>Category:</strong> {auction.category}</p>
      <p><strong>Current Price:</strong> ${auction.currentPrice}</p>
      <p><strong>Ends:</strong> {auction.endTime}</p>

      <form onSubmit={handleBid}>
        <input
          type="number"
          placeholder="Your bid"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
          step="0.01"
        />
        <button type="submit">Submit Bid</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AuctionDetails;
