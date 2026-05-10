import { useAuth } from "../auth/useAuth";

// This top bar shows the app name, current user, and logout button.
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">Vi</span>
        <h1>Vi-Notes</h1>
      </div>
      <div className="navbar-actions">
        <span className="welcome-text">Writing as {user?.name}</span>
        {/* Clicking this clears the saved login token. */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
