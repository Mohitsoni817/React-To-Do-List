import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">✓</span>
        TaskFlow
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}