import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import System from "./pages/System.jsx";
import Products from "./pages/Products.jsx";
import PowerShare from "./pages/PowerShare.jsx";
import Contact from "./pages/Contact.jsx";
import Company from "./pages/Company.jsx";
import Configurator from "./pages/Configurator.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <TopBar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/system" element={<System />} />
          <Route path="/products" element={<Products />} />
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/powershare" element={<PowerShare />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
