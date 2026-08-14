function ParkingSlotForm({
  slotForm,
  parkingLocations,
  editingSlotId,
  onChange,
  onSubmit,
  onCancel,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!slotForm.slotNumber.trim()) {
      return;
    }

    if (!slotForm.locationId) {
      return;
    }

    onSubmit(event);
  };

  return (
    <section className="form-section">

      <div className="section-header">
        <div>
          <p className="section-label">
            SLOT MANAGEMENT
          </p>

          <h2>
            {editingSlotId
              ? "Edit Parking Slot"
              : "Add Parking Slot"}
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="parking-form"
      >

        <div className="form-group">
          <label htmlFor="slot-number">
            Slot Number
          </label>

          <input
            id="slot-number"
            type="text"
            name="slotNumber"
            placeholder="Example: A01"
            value={slotForm.slotNumber}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="slot-status">
            Status
          </label>

          <select
            id="slot-status"
            name="status"
            value={slotForm.status}
            onChange={onChange}
            required
          >
            <option value="AVAILABLE">
              AVAILABLE
            </option>

            <option value="OCCUPIED">
              OCCUPIED
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="slot-location">
            Parking Location
          </label>

          <select
            id="slot-location"
            name="locationId"
            value={slotForm.locationId}
            onChange={onChange}
            required
          >
            <option value="">
              Select Parking Location
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

        <div className="form-actions">

          <button type="submit">
            {editingSlotId
              ? "Update Slot"
              : "Add Slot"}
          </button>

          {editingSlotId && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </section>
  );
}

export default ParkingSlotForm;