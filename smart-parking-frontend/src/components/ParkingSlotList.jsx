function ParkingSlotList({
  slots,
  onEdit,
  onDelete,
}) {
  return (
    <section className="list-section">

      <div className="section-header">
        <div>
          <p className="section-label">
            PARKING MANAGEMENT
          </p>

          <h2>Parking Slots</h2>
        </div>

        <span className="item-count">
          {slots.length} Slots
        </span>
      </div>

      {slots.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            🅿️
          </div>

          <h3>No Parking Slots Found</h3>

          <p>
            Add a parking slot or change your filters.
          </p>
        </div>
      ) : (
        <div className="slot-grid">

          {slots.map((slot) => (

            <div
              className="slot-card"
              key={slot.id}
            >

              <div className="slot-card-header">

                <div>
                  <p className="section-label">
                    SLOT
                  </p>

                  <h3>
                    {slot.slotNumber}
                  </h3>
                </div>

                <span
                  className={`slot-status ${
                    slot.status === "AVAILABLE"
                      ? "available"
                      : "occupied"
                  }`}
                >
                  {slot.status}
                </span>

              </div>

              <div className="slot-location">

                <span>
                  Parking Location
                </span>

                <strong>
                  {slot.parkingLocation
                    ? slot.parkingLocation.name
                    : "Unknown"}
                </strong>

              </div>

              <div className="slot-actions">

                <button
                  type="button"
                  className="edit-button"
                  onClick={() => onEdit(slot)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(slot.id)}
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

export default ParkingSlotList;