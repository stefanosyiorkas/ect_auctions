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
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
      const sorted = res.data.sort((a, b) => b.amount - a.amount);
      setBids(sorted);
    } catch {
      setBids([]);
    }
  };

  useEffect(() => {
    fetchAuction();
    fetchBids();
  }, [id]);

  const isEnded = auction ? new Date(auction.endTime) < new Date() : false;
  const winnerId = bids.length > 0 ? bids[0].bidder.id : null;

  const handleBid = async (e) => {
    e.preventDefault();
    if (!window.confirm(`Place bid of $${parseFloat(bidAmount).toFixed(2)}?`)) {
      return;
    }
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

  const sendSellerMessage = async (e) => {
    e.preventDefault();
    try {
      await api.post("/messages", {
        sender: { id: user.id },
        receiver: { id: auction.seller.id },
        content: message,
      });
      toast.success("Message sent");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
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

      {isEnded && winnerId === user?.id && (
        <form onSubmit={sendSellerMessage} style={{ marginTop: 20 }}>
          <h3>Contact Seller</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default AuctionDetails;
