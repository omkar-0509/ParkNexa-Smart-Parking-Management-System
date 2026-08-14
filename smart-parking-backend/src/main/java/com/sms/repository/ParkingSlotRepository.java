package com.sms.repository;

import com.sms.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSlotRepository
        extends JpaRepository<ParkingSlot, Long> {

    List<ParkingSlot> findByParkingLocationId(Long locationId);

    List<ParkingSlot> findByStatus(String status);
}