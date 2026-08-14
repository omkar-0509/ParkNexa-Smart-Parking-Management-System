function DashboardSummary({
  totalLocations,
  totalSlots,
  availableSlots,
  occupiedSlots,
}) {
  return (
    <section className="summary-section">
      <div className="section-header">
        <div>
          <p className="section-label">OVERVIEW</p>
          <h2>Parking Summary</h2>
        </div>
      </div>

      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">📍</div>

          <div>
            <p>Total Locations</p>
            <h3>{totalLocations}</h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🅿️</div>

          <div>
            <p>Total Slots</p>
            <h3>{totalSlots}</h3>
          </div>
        </div>

        <div className="summary-card available-card">
          <div className="summary-icon">✓</div>

          <div>
            <p>Available Slots</p>
            <h3>{availableSlots}</h3>
          </div>
        </div>

        <div className="summary-card occupied-card">
          <div className="summary-icon">●</div>

          <div>
            <p>Occupied Slots</p>
            <h3>{occupiedSlots}</h3>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DashboardSummary;