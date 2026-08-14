package com.sms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String slotNumber;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private ParkingLocation parkingLocation;

    // Default Constructor
    public ParkingSlot() {
    }

    // Constructor
    public ParkingSlot(String slotNumber, String status,
                       ParkingLocation parkingLocation) {
        this.slotNumber = slotNumber;
        this.status = status;
        this.parkingLocation = parkingLocation;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlotNumber() {
        return slotNumber;
    }

    public void setSlotNumber(String slotNumber) {
        this.slotNumber = slotNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ParkingLocation getParkingLocation() {
        return parkingLocation;
    }

    public void setParkingLocation(ParkingLocation parkingLocation) {
        this.parkingLocation = parkingLocation;
    }
}