package com.sgiork.ect.controller;

import com.sgiork.ect.model.Auction;
import com.sgiork.ect.model.Bid;
import com.sgiork.ect.model.User;
import com.sgiork.ect.repository.AuctionRepository;
import com.sgiork.ect.repository.BidRepository;
import com.sgiork.ect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin
public class BidController {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> placeBid(@RequestBody Bid bid) {
        Optional<Auction> auctionOpt = auctionRepository.findById(bid.getAuction().getId());
        Optional<User> userOpt = userRepository.findById(bid.getBidder().getId());

        if (auctionOpt.isEmpty() || userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid auction or user");
        }

        Auction auction = auctionOpt.get();
        if (bid.getAmount() <= auction.getCurrentPrice()) {
            return ResponseEntity.badRequest().body("Bid must be higher than current price");
        }

        auction.setCurrentPrice(bid.getAmount());
        auctionRepository.save(auction);

        bid.setAuction(auction);
        bid.setBidder(userOpt.get());
        bidRepository.save(bid);

        return ResponseEntity.ok("Bid placed successfully");
    }
}
