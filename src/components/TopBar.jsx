import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import CurrencySelector from "./CurrencySelector.jsx";

export default function TopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="logo">
          CEERION
        </Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/system">System</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/configurator">Config</NavLink>
          <NavLink to="/powershare">PowerShare</NavLink>
          <NavLink to="/company">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="topbar-actions">
          <CurrencySelector />
          <Link className="reserve-btn" to="/configurator">
            Configure
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="mobile-nav">
          <NavLink to="/" end onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/system" onClick={toggleMobileMenu}>System</NavLink>
          <NavLink to="/products" onClick={toggleMobileMenu}>Products</NavLink>
          <NavLink to="/configurator" onClick={toggleMobileMenu}>Config</NavLink>
          <NavLink to="/powershare" onClick={toggleMobileMenu}>PowerShare</NavLink>
          <NavLink to="/company" onClick={toggleMobileMenu}>About</NavLink>
          <NavLink to="/contact" onClick={toggleMobileMenu}>Contact</NavLink>
        </nav>
      )}
    </header>
  );
}
