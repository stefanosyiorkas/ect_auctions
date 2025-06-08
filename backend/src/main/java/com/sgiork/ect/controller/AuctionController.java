package com.sgiork.ect.controller;

import com.sgiork.ect.model.Auction;
import com.sgiork.ect.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionRepository auctionRepository;

    @PostMapping
    public Auction createAuction(@RequestBody Auction auction) {
        if (auction.getCurrentPrice() == null)
            auction.setCurrentPrice(auction.getStartingPrice());

        return auctionRepository.save(auction);
    }

    @GetMapping
    public List<Auction> listAuctions() {
        return auctionRepository.findAll();
    }
}
