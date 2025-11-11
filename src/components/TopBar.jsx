import { Link, NavLink } from "react-router-dom";
import CurrencySelector from "./CurrencySelector.jsx";

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
          <NavLink to="/configurator">Configurator</NavLink>
          <NavLink to="/powershare">PowerShare™</NavLink>
          <NavLink to="/company">Company</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="topbar-actions">
          <CurrencySelector />
          <Link className="reserve-btn" to="/configurator">
            Configure
          </Link>
        </div>
      </div>
    </header>
  );
}
