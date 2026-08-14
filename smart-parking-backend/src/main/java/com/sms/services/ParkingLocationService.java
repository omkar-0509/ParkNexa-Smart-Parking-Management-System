package com.sms.services;

import com.sms.entity.ParkingLocation;
import com.sms.repository.ParkingLocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingLocationService {

    private final ParkingLocationRepository repository;

    public ParkingLocationService(ParkingLocationRepository repository) {
        this.repository = repository;
    }

    // Create
    public ParkingLocation createParkingLocation(ParkingLocation parkingLocation) {
        return repository.save(parkingLocation);
    }

    // Get All
    public List<ParkingLocation> getAllParkingLocations() {
        return repository.findAll();
    }

    // Get By ID
    public Optional<ParkingLocation> getParkingLocationById(Long id) {
        return repository.findById(id);
    }

    // Update
    public ParkingLocation updateParkingLocation(
            Long id,
            ParkingLocation updatedLocation) {

        ParkingLocation existingLocation =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Parking location not found"));

        existingLocation.setName(updatedLocation.getName());
        existingLocation.setAddress(updatedLocation.getAddress());
        existingLocation.setTotalSlots(updatedLocation.getTotalSlots());

        return repository.save(existingLocation);
    }

    // Delete
    public void deleteParkingLocation(Long id) {
        repository.deleteById(id);
    }
}