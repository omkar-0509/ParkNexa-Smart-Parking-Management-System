function SlotFilters({
  selectedStatus,
  selectedLocation,
  parkingLocations,
  onStatusChange,
  onLocationChange,
}) {
  return (
    <section className="filter-section">

      {/* HEADER */}
      <div className="filter-header">
        <div>
          <p className="filter-label">
            PARKING MANAGEMENT
          </p>

          <h2>Slot Filters</h2>
        </div>

        <div className="filter-icon">
          ⚙️
        </div>
      </div>

      {/* STATUS FILTER */}
      <div className="filter-block">

        <p className="filter-title">
          Slot Status
        </p>

        <div className="filter-buttons">

          <button
            className={selectedStatus === "ALL" ? "active" : ""}
            onClick={() => onStatusChange("ALL")}
          >
            <span>◉</span>
            All
          </button>

          <button
            className={
              selectedStatus === "AVAILABLE"
                ? "active available"
                : ""
            }
            onClick={() =>
              onStatusChange("AVAILABLE")
            }
          >
            <span>●</span>
            Available
          </button>

          <button
            className={
              selectedStatus === "OCCUPIED"
                ? "active occupied"
                : ""
            }
            onClick={() =>
              onStatusChange("OCCUPIED")
            }
          >
            <span>●</span>
            Occupied
          </button>

        </div>
      </div>

      {/* LOCATION FILTER */}
      <div className="filter-block">

        <p className="filter-title">
          Parking Location
        </p>

        <div className="select-wrapper">

          <span className="select-icon">
            📍
          </span>

          <select
            value={selectedLocation}
            onChange={(event) =>
              onLocationChange(event.target.value)
            }
          >
            <option value="ALL">
              All Parking Locations
            </option>

            {parkingLocations.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.name}
              </option>
            ))}
          </select>

        </div>

      </div>

    </section>
  );
}

export default SlotFilters;