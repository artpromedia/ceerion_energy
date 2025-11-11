import { Link, NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="logo">
          CEERION
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Energy</NavLink>
          <NavLink to="/system">Integrated System</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/powershare">PowerShare™</NavLink>
          <NavLink to="/company">Company</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <a className="reserve-btn" href="#reserve">
          Reserve
        </a>
      </div>
    </header>
  );
}
