import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AuctionList.css";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:8443/api/auctions")
      .then((res) => setAuctions(res.data))
      .catch((err) => console.error("Failed to fetch auctions", err));
  }, []);

  const filteredAuctions = auctions.filter((auction) =>
    auction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="auction-list-container">
      <h2>Active Auctions</h2>

      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredAuctions.length === 0 ? (
        <p>No matching auctions.</p>
      ) : (
        <div className="auction-grid">
          {filteredAuctions.map((auction) => (
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
