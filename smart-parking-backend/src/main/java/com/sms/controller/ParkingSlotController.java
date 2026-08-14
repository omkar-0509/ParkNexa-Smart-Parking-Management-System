package com.sms.controller;

import com.sms.entity.ParkingSlot;
import com.sms.services.ParkingSlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingSlotController {

    private final ParkingSlotService service;

    public ParkingSlotController(ParkingSlotService service) {
        this.service = service;
    }

    // Create Slot
    @PostMapping
    public ResponseEntity<ParkingSlot> createSlot(
            @RequestBody ParkingSlot slot) {

        return ResponseEntity.ok(
                service.createSlot(slot)
        );
    }

    // Get All Slots
    @GetMapping
    public ResponseEntity<List<ParkingSlot>> getAllSlots() {

        return ResponseEntity.ok(
                service.getAllSlots()
        );
    }

    // Get Slot By ID
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlot> getSlotById(
            @PathVariable Long id) {

        return service.getSlotById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get Slots By Location
    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<ParkingSlot>> getSlotsByLocation(
            @PathVariable Long locationId) {

        return ResponseEntity.ok(
                service.getSlotsByLocation(locationId)
        );
    }

    // Get Slots By Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ParkingSlot>> getSlotsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                service.getSlotsByStatus(status)
        );
    }

    // Update Slot
    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlot> updateSlot(
            @PathVariable Long id,
            @RequestBody ParkingSlot slot) {

        return ResponseEntity.ok(
                service.updateSlot(id, slot)
        );
    }

    // Delete Slot
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(
            @PathVariable Long id) {

        service.deleteSlot(id);

        return ResponseEntity.noContent().build();
    }
}