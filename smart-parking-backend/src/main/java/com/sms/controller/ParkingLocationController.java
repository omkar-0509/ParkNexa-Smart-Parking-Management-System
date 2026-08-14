package com.sms.controller;

import com.sms.entity.ParkingLocation;
import com.sms.services.ParkingLocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingLocationController {

    private final ParkingLocationService service;

    public ParkingLocationController(ParkingLocationService service) {
        this.service = service;
    }

    // POST - Create Parking Location
    @PostMapping
    public ResponseEntity<ParkingLocation> createParkingLocation(
            @RequestBody ParkingLocation parkingLocation) {

        ParkingLocation savedLocation =
                service.createParkingLocation(parkingLocation);

        return ResponseEntity.ok(savedLocation);
    }

    // GET - Get All Parking Locations
    @GetMapping
    public ResponseEntity<List<ParkingLocation>> getAllParkingLocations() {

        return ResponseEntity.ok(
                service.getAllParkingLocations()
        );
    }

    // GET - Get Parking Location By ID
    @GetMapping("/{id}")
    public ResponseEntity<ParkingLocation> getParkingLocationById(
            @PathVariable Long id) {

        return service.getParkingLocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT - Update Parking Location
    @PutMapping("/{id}")
    public ResponseEntity<ParkingLocation> updateParkingLocation(
            @PathVariable Long id,
            @RequestBody ParkingLocation parkingLocation) {

        return ResponseEntity.ok(
                service.updateParkingLocation(id, parkingLocation)
        );
    }

    // DELETE - Delete Parking Location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingLocation(
            @PathVariable Long id) {

        service.deleteParkingLocation(id);

        return ResponseEntity.noContent().build();
    }
}