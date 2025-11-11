import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Price from "../components/Price.jsx";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext.jsx";

const getProducts = (formatPrice) => [
  {
    id: "h1",
    name: "H1 Home Essentials",
    segment: "Residential",
    priceUSD: 3500,
    get price() {
      return `Starting at ${formatPrice(this.priceUSD)}*`;
    },
    summary:
      "A right-sized CEERION Energy package for single-family homes that want protection from outages, lower bills, and EV-based backup.",
    features: [
      "4-12 kW solar generation (rooftop or carport)",
      "10-40 kWh modular battery storage",
      "CEERION POWER MANAGERâ„¢ for circuit-level control",
      "EV-native: V2H for extending backup runtime",
      "Up to 32 controllable circuits",
      "Storm Mode and automatic islanding",
    ],
    specs: {
      "Service Rating": "200A (upgradable to 400A)",
      "Solar Capacity": "4-12 kW DC-coupled",
      "Battery Capacity": "10-40 kWh (LiFePOâ‚„)",
      "Backup Transition": "<20ms seamless",
      "EV Charging": "Up to 11.5kW L2, V2H capable",
      "Installation Time": "2-3 days typical",
    },
  },
  {
    id: "b3",
    name: "B3 Microgrid Campus",
    segment: "Commercial / Campus",
    priceUSD: 9500,
    get price() {
      return `Starting at ${formatPrice(this.priceUSD)}*`;
    },
    summary:
      "A scalable, dispatchable energy platform for clinics, estates, schools, and business parks that need always-on power.",
    features: [
      "15-50+ kW scalable solar arrays",
      "30-100+ kWh multi-bank battery storage",
      "Multi-building microgrid orchestration",
      "Fleet EV integration and V2B capability",
      "Priority load management for critical operations",
      "Remote monitoring and control",
    ],
    specs: {
      "Service Rating": "400A+ (scalable)",
      "Solar Capacity": "15-50+ kW (expandable)",
      "Battery Capacity": "30-100+ kWh (modular)",
      "Backup Transition": "<20ms seamless",
      "EV Charging": "Multiple DC fast chargers supported",
      "Installation Time": "1-2 weeks typical",
    },
  },
];

export default function Products() {
  const { formatPrice } = useCurrency();
  const products = getProducts(formatPrice);
  
  return (
    <>
      <Hero
        eyebrow="Residential & Commercial Solutions"
        title="CEERION Energy Product Lines"
        subtitle="From single-family homes to multi-building campuses, we have a solution sized for your energy independence needs."
      />

      <Section title="Our Product Philosophy">
        <p>
          CEERION Energy products are designed as complete, integrated systems—not loose collections
          of components. Every system includes solar generation, battery storage, and the CEERION
          POWER MANAGER™, ensuring seamless operation, resilience, and intelligent control from day one.
        </p>
      </Section>

      <Section title="Available Configurations">
        {products.map((p) => (
          <div key={p.id} style={{ marginBottom: "var(--spacing-2xl)" }}>
            <div className="product-header">
              <div>
                <h2>{p.name}</h2>
                <p className="muted">{p.segment}</p>
                <p className="price-tag">{p.price}</p>
              </div>
              <Link to="/configurator" className="primary-btn">
                Configure This System
              </Link>
            </div>

            <div className="grid-2" style={{ marginTop: "var(--spacing-lg)" }}>
              <div className="card">
                <h4>Overview</h4>
                <p>{p.summary}</p>
                <h4 style={{ marginTop: "var(--spacing-md)" }}>Key Features</h4>
                <ul className="bullet-list">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h4>Technical Specifications</h4>
                <div className="specs-list">
                  {Object.entries(p.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <strong>{key}:</strong>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Product Comparison">
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell"></div>
            <div className="comparison-cell">
              <h4>H1 Home Essentials</h4>
              <p className="muted">Residential</p>
            </div>
            <div className="comparison-cell">
              <h4>B3 Microgrid Campus</h4>
              <p className="muted">Commercial</p>
            </div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Best For</div>
            <div className="comparison-cell">Single-family homes</div>
            <div className="comparison-cell">Multi-building, estates, clinics</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Solar Range</div>
            <div className="comparison-cell">4-12 kW</div>
            <div className="comparison-cell">15-50+ kW</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Battery Range</div>
            <div className="comparison-cell">10-40 kWh</div>
            <div className="comparison-cell">30-100+ kWh</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Starting Price</div>
            <div className="comparison-cell"><Price amount={3500} />*</div>
            <div className="comparison-cell"><Price amount={9500} />*</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Installation Time</div>
            <div className="comparison-cell">2-3 days</div>
            <div className="comparison-cell">1-2 weeks</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">EV Integration</div>
            <div className="comparison-cell">1-2 vehicles (V2H)</div>
            <div className="comparison-cell">Fleet support (V2B)</div>
          </div>

          <div className="comparison-row">
            <div className="comparison-label">Warranty</div>
            <div className="comparison-cell">10 years standard</div>
            <div className="comparison-cell">10 years standard, 15 available</div>
          </div>
        </div>
        
        <div style={{ marginTop: "var(--spacing-lg)", padding: "var(--spacing-md)", backgroundColor: "var(--c-charcoal)", borderRadius: "var(--border-radius)", fontSize: "0.9rem", color: "var(--c-silver)" }}>
          <p>
            <strong>*Pricing Note:</strong> Starting prices reflect base 4kW solar configuration for H1 (expandable to 12kW) and base configuration for B3. 
            Final pricing varies based on system size, installation complexity, and regional factors. 
            Federal incentives (such as the 30% ITC) are specific to the United States and other regions with similar renewable energy legislation. 
            Contact us for a detailed quote and incentive information specific to your location.
          </p>
        </div>
      </Section>

      <Section title="What's Included With Every System">
        <div className="grid-3">
          <div className="card">
            <h4>🔆 Complete Hardware</h4>
            <ul className="bullet-list">
              <li>High-efficiency solar panels</li>
              <li>Modular battery packs (LiFePO₄)</li>
              <li>CEERION POWER MANAGER™</li>
              <li>All mounting and electrical hardware</li>
              <li>EV charging infrastructure</li>
            </ul>
          </div>
          <div className="card">
            <h4>🔧 Professional Installation</h4>
            <ul className="bullet-list">
              <li>Site assessment and system design</li>
              <li>Permit acquisition</li>
              <li>Certified electrician installation</li>
              <li>System commissioning</li>
              <li>Customer training</li>
            </ul>
          </div>
          <div className="card">
            <h4>📱 Software & Support</h4>
            <ul className="bullet-list">
              <li>Mobile app for monitoring/control</li>
              <li>Real-time energy flow visualization</li>
              <li>Storm Mode and backup features</li>
              <li>Over-the-air software updates</li>
              <li>24/7 technical support</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Financing & Incentives">
        <p>
          CEERION Energy systems qualify for significant federal and state incentives in the United States and other regions with similar renewable energy legislation. We also offer
          flexible financing options to make energy independence accessible.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>💰 Available Incentives (US & Select Regions)</h4>
            <ul className="bullet-list">
              <li>30% Federal Investment Tax Credit (ITC) - US only</li>
              <li>State and local solar rebates (varies by region)</li>
              <li>Battery storage incentives (varies by jurisdiction)</li>
              <li>Net metering credits (where applicable)</li>
              <li>Commercial accelerated depreciation (MACRS) - US only</li>
            </ul>
            <p style={{ marginTop: "var(--spacing-sm)", fontSize: "0.9rem", color: "var(--c-silver)" }}>
              *Incentives vary by country and region. Contact us for specific incentives available in your area.
            </p>
          </div>
          <div className="card">
            <h4>🏦 Financing Options</h4>
            <ul className="bullet-list">
              <li>Zero-down solar loans (2.99% APR)</li>
              <li>Power Purchase Agreements (PPA)</li>
              <li>Solar leases</li>
              <li>Commercial equipment financing</li>
              <li>Cash purchase discounts available</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Ready to Design Your System?">
        <p>
          Use our interactive configurator to customize a CEERION Energy system for your specific
          needs. Get instant estimates for cost, savings, and backup runtime.
        </p>
        <div style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/configurator" className="primary-btn">
            Launch Configurator
          </Link>
          <Link to="/contact" className="ghost-btn">
            Schedule Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
