import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} CEERION. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/company">About</Link>
        <Link to="/contact">Contact</Link>
        <a href="#">Support</a>
        <a href="#">FAQ</a>
      </div>
    </footer>
  );
}
