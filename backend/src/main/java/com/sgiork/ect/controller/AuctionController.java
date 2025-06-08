package com.sgiork.ect.controller;

import com.sgiork.ect.model.Auction;
import com.sgiork.ect.repository.AuctionRepository;
import com.sgiork.ect.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private BidRepository bidRepository;

    // @PostMapping
    // public Auction createAuction(@RequestBody Auction auction) {
    //     if (auction.getCurrentPrice() == null)
    //         auction.setCurrentPrice(auction.getStartingPrice());

    //     return auctionRepository.save(auction);
    // }
    @PostMapping
    public Auction createAuction(@RequestBody Auction auction) {
        return auctionRepository.save(auction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAuction(@PathVariable Long id) {
        Optional<Auction> opt = auctionRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Auction auction = opt.get();
        long bidCount = bidRepository.countByAuctionId(auction.getId());
        boolean isActive = auction.getEndTime().isAfter(LocalDateTime.now());
        if (isActive && bidCount > 0) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot delete active auction with bids");
        }
        auctionRepository.delete(auction);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<Auction> listAuctions() {
        return auctionRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Auction> getAuctionsByUser(@PathVariable Long userId) {
        return auctionRepository.findBySellerId(userId);
    }

}
