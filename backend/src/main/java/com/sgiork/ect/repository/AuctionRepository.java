package com.sgiork.ect.repository;

import com.sgiork.ect.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findBySellerId(Long sellerId);
}
