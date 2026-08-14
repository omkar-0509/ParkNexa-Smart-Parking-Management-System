package com.sms.services;

import com.sms.entity.ParkingLocation;
import com.sms.entity.ParkingSlot;
import com.sms.repository.ParkingLocationRepository;
import com.sms.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository slotRepository;
    private final ParkingLocationRepository locationRepository;

    public ParkingSlotService(
            ParkingSlotRepository slotRepository,
            ParkingLocationRepository locationRepository) {

        this.slotRepository = slotRepository;
        this.locationRepository = locationRepository;
    }

    // Create Slot
    public ParkingSlot createSlot(ParkingSlot slot) {

        Long locationId = slot.getParkingLocation().getId();

        ParkingLocation location = locationRepository.findById(locationId)
                .orElseThrow(() ->
                        new RuntimeException("Parking location not found"));

        slot.setParkingLocation(location);

        return slotRepository.save(slot);
    }

    // Get All Slots
    public List<ParkingSlot> getAllSlots() {
        return slotRepository.findAll();
    }

    // Get Slot By ID
    public Optional<ParkingSlot> getSlotById(Long id) {
        return slotRepository.findById(id);
    }

    // Get Slots By Location
    public List<ParkingSlot> getSlotsByLocation(Long locationId) {
        return slotRepository.findByParkingLocationId(locationId);
    }

    // Get Slots By Status
    public List<ParkingSlot> getSlotsByStatus(String status) {
        return slotRepository.findByStatus(status);
    }

    // Update Slot
    public ParkingSlot updateSlot(Long id, ParkingSlot updatedSlot) {

        ParkingSlot existingSlot = slotRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Parking slot not found"));

        existingSlot.setSlotNumber(updatedSlot.getSlotNumber());
        existingSlot.setStatus(updatedSlot.getStatus());

        Long locationId = updatedSlot.getParkingLocation().getId();

        ParkingLocation location = locationRepository.findById(locationId)
                .orElseThrow(() ->
                        new RuntimeException("Parking location not found"));

        existingSlot.setParkingLocation(location);

        return slotRepository.save(existingSlot);
    }

    // Delete Slot
    public void deleteSlot(Long id) {
        slotRepository.deleteById(id);
    }
}