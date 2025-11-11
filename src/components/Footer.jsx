import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Products</h4>
          <Link to="/products">H1 Home Essentials</Link>
          <Link to="/products">B3 Microgrid Campus</Link>
          <Link to="/configurator">Configurator</Link>
        </div>
        <div className="footer-section">
          <h4>Learn</h4>
          <Link to="/system">Integrated System</Link>
          <Link to="/powershare">PowerShare™</Link>
          <Link to="/company">FAQ</Link>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/company">About</Link>
          <Link to="/company">Careers</Link>
          <Link to="/company">Sustainability</Link>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <Link to="/contact">Get in Touch</Link>
          <a href="mailto:info@ceerionenergy.com">info@ceerionenergy.com</a>
          <a href="tel:+18885551234">1-888-555-CEERION</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CEERION Energy. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Warranty</a>
        </div>
      </div>
    </footer>
  );
}
