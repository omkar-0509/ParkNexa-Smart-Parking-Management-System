function ParkingLocationForm({
  parkingForm,
  editingLocationId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="form-section">
      <div className="section-header">
        <div>
          <p className="section-label">MANAGEMENT</p>

          <h2>
            {editingLocationId
              ? "Edit Parking Location"
              : "Add Parking Location"}
          </h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className="parking-form">
        <div className="form-group">
          <label htmlFor="parking-name">
            Parking Name
          </label>

          <input
            id="parking-name"
            type="text"
            name="name"
            placeholder="Enter parking name"
            value={parkingForm.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parking-address">
            Address
          </label>

          <input
            id="parking-address"
            type="text"
            name="address"
            placeholder="Enter parking address"
            value={parkingForm.address}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parking-slots">
            Total Slots
          </label>

          <input
            id="parking-slots"
            type="number"
            name="totalSlots"
            placeholder="Enter total slots"
            min="1"
            value={parkingForm.totalSlots}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">
            {editingLocationId
              ? "Update Location"
              : "Add Parking"}
          </button>

          {editingLocationId && (
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

export default ParkingLocationForm;