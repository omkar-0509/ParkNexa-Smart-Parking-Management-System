function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🅿️</span>
        <span>Smart Parking</span>
      </div>

      <div className="navbar-menu">
        <span>Dashboard</span>
        <span>Parking Locations</span>
        <span>Parking Slots</span>
      </div>

      <div className="navbar-user">
        <span className="user-icon">👤</span>
        <span>Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;