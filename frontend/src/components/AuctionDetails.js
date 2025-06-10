import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import "./Register.css";

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);

  const isGuest = localStorage.getItem("guest") === "true";

  const fetchAuction = async () => {
    try {
      const res = await api.get("/auctions");
      const found = res.data.find((item) => item.id.toString() === id);
      setAuction(found);
    } catch {
      toast.error("Failed to load auction");
    }
  };

  const fetchBids = async () => {
    try {
      const res = await api.get(`/bids/auction/${id}`);
      setBids(res.data);
    } catch {
      setBids([]);
    }
  };

  useEffect(() => {
    fetchAuction();
    fetchBids();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      amount: parseFloat(bidAmount),
      auction: { id: auction.id },
      bidder: { id: user.id },
    };

    try {
      await api.post("/bids", payload);
      toast.success("Bid placed successfully!");
      setBidAmount("");
      fetchAuction();
      fetchBids();
    } catch (err) {
      toast.error(err.response?.data || "Failed to submit bid");
    }
  };

  if (!auction) return <p>Loading auction...</p>;

  return (
    <div className="register-container">
      <h2>{auction.name}</h2>
      <p>
        <strong>Description:</strong> {auction.description}
      </p>
      <p>
        <strong>Category:</strong> {auction.category}
      </p>
      <p>
        <strong>Current Price:</strong> ${auction.currentPrice}
      </p>
      <p>
        <strong>Ends:</strong> {new Date(auction.endTime).toLocaleString()}
      </p>

      {!isGuest ? (
        <form onSubmit={handleBid}>
          <input
            type="number"
            placeholder="Your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
            step="0.01"
            min={auction.currentPrice + 0.01}
          />
          <button type="submit">Submit Bid</button>
        </form>
      ) : (
        <p style={{ marginTop: "20px", color: "gray" }}>
          You must be logged in to place a bid.
        </p>
      )}


      {bids.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Bid History</h3>
          <ul>
            {bids.map((bid) => (
              <li key={bid.id}>
                💰 ${bid.amount.toFixed(2)} –{" "}
                <strong>{bid.bidder.username}</strong>
                <br />
                🕒 {new Date(bid.bidTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuctionDetails;
