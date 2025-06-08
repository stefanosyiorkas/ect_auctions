import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/auctions")
      .then(res => setAuctions(res.data))
      .catch(err => console.error("Failed to fetch auctions", err));
  }, []);

  return (
    <div className="auction-list-container">
      <h2>Active Auctions</h2>
      {auctions.length === 0 ? (
        <p>No auctions available.</p>
      ) : (
        <div className="auction-grid">
          {auctions.map(auction => (
            <Link to={`/auction/${auction.id}`} key={auction.id} className="auction-card">
              <h3>{auction.name}</h3>
              <p><strong>Category:</strong> {auction.category}</p>
              <p><strong>Current Price:</strong> ${auction.currentPrice}</p>
              <p><strong>Ends:</strong> {new Date(auction.endTime).toLocaleString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;
