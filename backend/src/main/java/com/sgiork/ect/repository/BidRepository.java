package com.sgiork.ect.repository;

import com.sgiork.ect.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
