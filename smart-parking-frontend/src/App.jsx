import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

import Navbar from "./components/Navbar";
import DashboardSummary from "./components/DashboardSummary";
import ParkingLocationForm from "./components/ParkingLocationForm";
import ParkingLocationList from "./components/ParkingLocationList";
import ParkingSlotForm from "./components/ParkingSlotForm";
import ParkingSlotList from "./components/ParkingSlotList";
import SlotFilters from "./components/SlotFilters";

function App() {
  const [parkingLocations, setParkingLocations] = useState([]);
  const [slots, setSlots] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");

  const [parkingForm, setParkingForm] = useState({
    name: "",
    address: "",
    totalSlots: "",
  });

  const [slotForm, setSlotForm] = useState({
    slotNumber: "",
    status: "AVAILABLE",
    locationId: "",
  });

  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editingSlotId, setEditingSlotId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchParkingLocations();
    fetchSlots();
  }, []);

  const fetchParkingLocations = async () => {
    try {
      const response = await api.get("/parking");
      setParkingLocations(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load parking locations");
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await api.get("/slots");
      setSlots(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load parking slots");
    }
  };

  const totalLocations = parkingLocations.length;
  const totalSlots = slots.length;
  const availableSlots = slots.filter((slot) => slot.status === "AVAILABLE").length;
  const occupiedSlots = slots.filter((slot) => slot.status === "OCCUPIED").length;

  const filterSlots = async (status) => {
    try {
      setSelectedStatus(status);
      setSelectedLocation("ALL");

      if (status === "ALL") {
        await fetchSlots();
      } else {
        const response = await api.get(`/slots/status/${status}`);
        setSlots(response.data);
      }

      setMessage("");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to filter parking slots");
    }
  };

  const filterSlotsByLocation = async (locationId) => {
    try {
      setSelectedLocation(locationId);
      setSelectedStatus("ALL");

      if (locationId === "ALL") {
        await fetchSlots();
      } else {
        const response = await api.get(`/slots/location/${locationId}`);
        setSlots(response.data);
      }

      setMessage("");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load slots for selected location");
    }
  };

  const handleParkingChange = (event) => {
    setParkingForm({
      ...parkingForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSlotChange = (event) => {
    setSlotForm({
      ...slotForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleParkingSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/parking", {
        name: parkingForm.name,
        address: parkingForm.address,
        totalSlots: Number(parkingForm.totalSlots),
      });

      setMessage("Parking location created successfully!");
      setParkingForm({ name: "", address: "", totalSlots: "" });
      await fetchParkingLocations();
    } catch (error) {
      setError("Failed to create parking location");
    }
  };

  const handleParkingUpdate = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/parking/${editingLocationId}`, {
        name: parkingForm.name,
        address: parkingForm.address,
        totalSlots: Number(parkingForm.totalSlots),
      });

      setMessage("Parking location updated successfully!");
      setParkingForm({ name: "", address: "", totalSlots: "" });
      setEditingLocationId(null);
      await fetchParkingLocations();
    } catch (error) {
      setError("Failed to update parking location");
    }
  };

  const handleEditLocation = (location) => {
    setEditingLocationId(location.id);
    setParkingForm({
      name: location.name,
      address: location.address,
      totalSlots: location.totalSlots,
    });
  };

  const handleCancelLocationEdit = () => {
    setEditingLocationId(null);
    setParkingForm({ name: "", address: "", totalSlots: "" });
  };

  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Delete this parking location?")) return;

    try {
      await api.delete(`/parking/${id}`);
      setMessage("Parking location deleted successfully!");
      await fetchParkingLocations();
      await fetchSlots();
    } catch (error) {
      setError("Cannot delete location. Delete its slots first.");
    }
  };

  const handleSlotSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/slots", {
        slotNumber: slotForm.slotNumber,
        status: slotForm.status,
        parkingLocation: { id: Number(slotForm.locationId) },
      });

      setMessage("Parking slot created successfully!");
      setSlotForm({
        slotNumber: "",
        status: "AVAILABLE",
        locationId: "",
      });

      await fetchSlots();
    } catch (error) {
      setError("Failed to create parking slot");
    }
  };

  const handleSlotUpdate = async (event) => {
    event.preventDefault();

    try {
      await api.put(`/slots/${editingSlotId}`, {
        slotNumber: slotForm.slotNumber,
        status: slotForm.status,
        parkingLocation: { id: Number(slotForm.locationId) },
      });

      setMessage("Parking slot updated successfully!");
      setEditingSlotId(null);
      await fetchSlots();
    } catch (error) {
      setError("Failed to update parking slot");
    }
  };

  const handleEditSlot = (slot) => {
    setEditingSlotId(slot.id);
    setSlotForm({
      slotNumber: slot.slotNumber,
      status: slot.status,
      locationId: String(slot.parkingLocation.id),
    });
  };

  const handleCancelSlotEdit = () => {
    setEditingSlotId(null);
    setSlotForm({
      slotNumber: "",
      status: "AVAILABLE",
      locationId: "",
    });
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm("Delete this parking slot?")) return;

    try {
      await api.delete(`/slots/${id}`);
      setMessage("Parking slot deleted successfully!");
      await fetchSlots();
    } catch (error) {
      setError("Failed to delete parking slot");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="dashboard-container">
        <section className="welcome-row">
          <div>
            <p className="welcome-label">SMART PARKING CONTROL CENTER</p>
            <h1>Manage your parking ecosystem</h1>
            <p>Monitor locations, availability and live parking status from one modern dashboard.</p>
          </div>

          <div className="welcome-badge">
            <span>🅿️</span>
            <div>
              <small>System Status</small>
              <strong>Live</strong>
            </div>
          </div>
        </section>

        <DashboardSummary
          totalLocations={totalLocations}
          totalSlots={totalSlots}
          availableSlots={availableSlots}
          occupiedSlots={occupiedSlots}
        />

        {message && <div className="success-message">✓ {message}</div>}
        {error && <div className="error-message">⚠ {error}</div>}

        <section className="live-dashboard-grid">
          <div className="parking-map-card">
            <div className="card-title-row">
              <div>
                <p className="section-label">LIVE VISUALIZATION</p>
                <h2>Parking Map</h2>
              </div>

              <span className="live-indicator">● LIVE</span>
            </div>

            <div className="parking-visual-grid">
              {slots.length === 0 ? (
                <div className="empty-map">
                  No parking slots available
                </div>
              ) : (
                slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`parking-spot ${slot.status.toLowerCase()}`}
                  >
                    <span>🅿</span>
                    <strong>{slot.slotNumber}</strong>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="live-status-card">
            <p className="section-label">LIVE STATUS</p>
            <h2>Capacity Overview</h2>

            <div className="capacity-circle">
              <strong>
                {totalSlots === 0
                  ? 0
                  : Math.round((occupiedSlots / totalSlots) * 100)}
                %
              </strong>
              <span>Occupied</span>
            </div>

            <div className="status-row">
              <span>🟢 Available</span>
              <strong>{availableSlots}</strong>
            </div>

            <div className="status-row">
              <span>🔴 Occupied</span>
              <strong>{occupiedSlots}</strong>
            </div>
          </div>
        </section>

        <section className="management-grid">
          <ParkingLocationForm
            parkingForm={parkingForm}
            editingLocationId={editingLocationId}
            onChange={handleParkingChange}
            onSubmit={editingLocationId ? handleParkingUpdate : handleParkingSubmit}
            onCancel={handleCancelLocationEdit}
          />

          <SlotFilters
            selectedStatus={selectedStatus}
            selectedLocation={selectedLocation}
            parkingLocations={parkingLocations}
            onStatusChange={filterSlots}
            onLocationChange={filterSlotsByLocation}
          />
        </section>

        <ParkingLocationList
          parkingLocations={parkingLocations}
          onEdit={handleEditLocation}
          onDelete={handleDeleteLocation}
        />

        <section className="management-grid">
          <ParkingSlotForm
            slotForm={slotForm}
            parkingLocations={parkingLocations}
            editingSlotId={editingSlotId}
            onChange={handleSlotChange}
            onSubmit={editingSlotId ? handleSlotUpdate : handleSlotSubmit}
            onCancel={handleCancelSlotEdit}
          />

          <div className="quick-stats-card">
            <p className="section-label">QUICK STATS</p>
            <h2>Parking Health</h2>

            <div className="health-stat">
              <span>Total Slots</span>
              <strong>{totalSlots}</strong>
            </div>

            <div className="health-stat available">
              <span>Available</span>
              <strong>{availableSlots}</strong>
            </div>

            <div className="health-stat occupied">
              <span>Occupied</span>
              <strong>{occupiedSlots}</strong>
            </div>
          </div>
        </section>

        <ParkingSlotList
          slots={slots}
          onEdit={handleEditSlot}
          onDelete={handleDeleteSlot}
        />
      </main>
    </div>
  );
}

export default App;