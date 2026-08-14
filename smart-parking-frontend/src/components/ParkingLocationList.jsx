function ParkingLocationList({
  parkingLocations,
  onEdit,
  onDelete,
}) {
  return (
    <section className="list-section">
      <div className="section-header">
        <div>
          <p className="section-label">LOCATIONS</p>

          <h2>Parking Locations</h2>
        </div>

        <span className="item-count">
          {parkingLocations.length} Locations
        </span>
      </div>

      {parkingLocations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📍</div>

          <h3>No Parking Locations</h3>

          <p>
            Add a parking location to get started.
          </p>
        </div>
      ) : (
        <div className="location-grid">
          {parkingLocations.map((location) => (
            <div
              className="location-card"
              key={location.id}
            >
              <div className="location-card-header">
                <div className="location-icon">
                  📍
                </div>

                <div>
                  <h3>{location.name}</h3>

                  <span className="location-id">
                    Location #{location.id}
                  </span>
                </div>
              </div>

              <div className="location-details">
                <div className="detail-row">
                  <span>Address</span>

                  <strong>
                    {location.address}
                  </strong>
                </div>

                <div className="detail-row">
                  <span>Total Slots</span>

                  <strong>
                    {location.totalSlots}
                  </strong>
                </div>
              </div>

              <div className="location-actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => onEdit(location)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(location.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ParkingLocationList;