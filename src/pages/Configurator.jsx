import { useState } from "react";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Price from "../components/Price.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";

const PRODUCTS = {
  h1: {
    name: "H1 Home Essentials",
    basePrice: 35000,
    solarPrice: 2500, // per kW
    batteryPrice: 800, // per kWh
    description: "Complete residential energy independence system",
  },
  b3: {
    name: "B3 Microgrid Campus",
    basePrice: 95000,
    solarPrice: 2200, // per kW (bulk discount)
    batteryPrice: 700, // per kWh (bulk discount)
    description: "Scalable commercial/campus energy platform",
  },
};

export default function Configurator() {
  const { formatPrice, getCurrencyInfo } = useCurrency();
  const currencyInfo = getCurrencyInfo();
  
  const [config, setConfig] = useState({
    productType: "h1",
    solarSize: 8, // kW
    batterySize: 20, // kWh
    evIntegration: true,
    numEVs: 1,
    zipCode: "",
    avgMonthlyBill: 200,
  });

  const [showResults, setShowResults] = useState(false);

  const product = PRODUCTS[config.productType];

  // Calculate costs
  const systemCost =
    product.basePrice +
    config.solarSize * product.solarPrice +
    config.batterySize * product.batteryPrice;

  const federalTaxCredit = systemCost * 0.3; // 30% ITC
  const netCost = systemCost - federalTaxCredit;

  // Calculate savings (simplified)
  const dailySolarProduction = config.solarSize * 4.5; // kWh/day (avg)
  const dailySavings = dailySolarProduction * 0.15; // $0.15/kWh avg
  const monthlySavings = dailySavings * 30;
  const annualSavings = monthlySavings * 12;
  const paybackYears = netCost / annualSavings;

  // Backup runtime calculation
  const avgDailyUsage = (config.avgMonthlyBill / 0.15) / 30; // kWh/day
  const backupHours = (config.batterySize / avgDailyUsage) * 24;
  const backupWithEV = config.evIntegration ? backupHours + (75 / avgDailyUsage) * 24 : backupHours;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const updateConfig = (field, value) => {
    setConfig({ ...config, [field]: value });
    setShowResults(false);
  };

  return (
    <>
      <Hero
        eyebrow="Design Your System"
        title="CEERION Energy Configurator"
        subtitle="Build a custom energy solution tailored to your home or business. Get instant estimates for cost, savings, and backup runtime."
      />

      <Section title="Configure Your CEERION Energy System">
        <form className="configurator-form" onSubmit={handleSubmit}>
          {/* Product Type */}
          <div className="config-section">
            <h3>1. Select Your Product Line</h3>
            <div className="radio-group">
              <label className="radio-card">
                <input
                  type="radio"
                  name="productType"
                  value="h1"
                  checked={config.productType === "h1"}
                  onChange={(e) => updateConfig("productType", e.target.value)}
                />
                <div className="radio-content">
                  <h4>H1 Home Essentials</h4>
                  <p>Single-family residential (up to 5,000 sq ft)</p>
                  <p className="muted">Ideal for homes with 200A service</p>
                </div>
              </label>
              <label className="radio-card">
                <input
                  type="radio"
                  name="productType"
                  value="b3"
                  checked={config.productType === "b3"}
                  onChange={(e) => updateConfig("productType", e.target.value)}
                />
                <div className="radio-content">
                  <h4>B3 Microgrid Campus</h4>
                  <p>Multi-building, commercial, or estate</p>
                  <p className="muted">Scalable for complex operations</p>
                </div>
              </label>
            </div>
          </div>

          {/* Solar Size */}
          <div className="config-section">
            <h3>2. Solar Generation Capacity</h3>
            <label className="slider-label">
              <span>
                Solar Size: <strong>{config.solarSize} kW</strong>
              </span>
              <span className="muted">~{(config.solarSize * 4.5 * 30).toFixed(0)} kWh/month</span>
            </label>
            <input
              type="range"
              min={config.productType === "h1" ? "4" : "15"}
              max={config.productType === "h1" ? "15" : "50"}
              step="1"
              value={config.solarSize}
              onChange={(e) => updateConfig("solarSize", parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-markers">
              <span>Min</span>
              <span>Recommended</span>
              <span>Max</span>
            </div>
          </div>

          {/* Battery Size */}
          <div className="config-section">
            <h3>3. Battery Storage Capacity</h3>
            <label className="slider-label">
              <span>
                Battery Size: <strong>{config.batterySize} kWh</strong>
              </span>
              <span className="muted">
                ~{((config.batterySize / (config.avgMonthlyBill / 0.15 / 30)) * 24).toFixed(1)} hours backup
              </span>
            </label>
            <input
              type="range"
              min={config.productType === "h1" ? "10" : "30"}
              max={config.productType === "h1" ? "40" : "100"}
              step="5"
              value={config.batterySize}
              onChange={(e) => updateConfig("batterySize", parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-markers">
              <span>Min</span>
              <span>Recommended</span>
              <span>Max</span>
            </div>
          </div>

          {/* EV Integration */}
          <div className="config-section">
            <h3>4. EV Integration</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.evIntegration}
                onChange={(e) => updateConfig("evIntegration", e.target.checked)}
              />
              <div>
                <strong>Enable Vehicle-to-Home (V2H)</strong>
                <p className="muted">
                  Allows your EV to provide backup power and extend runtime during outages
                </p>
              </div>
            </label>
            {config.evIntegration && (
              <label className="input-label">
                Number of EVs
                <select
                  value={config.numEVs}
                  onChange={(e) => updateConfig("numEVs", parseInt(e.target.value))}
                >
                  <option value="1">1 EV</option>
                  <option value="2">2 EVs</option>
                  <option value="3">3+ EVs</option>
                </select>
              </label>
            )}
          </div>

          {/* Usage Info */}
          <div className="config-section">
            <h3>5. Your Energy Usage</h3>
            <label className="input-label">
              Average Monthly Electric Bill ($)
              <input
                type="number"
                min="50"
                max="2000"
                step="10"
                value={config.avgMonthlyBill}
                onChange={(e) => updateConfig("avgMonthlyBill", parseInt(e.target.value))}
              />
            </label>
            <label className="input-label">
              Zip Code (for solar estimates)
              <input
                type="text"
                placeholder="90210"
                maxLength="5"
                value={config.zipCode}
                onChange={(e) => updateConfig("zipCode", e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "var(--spacing-lg)" }}>
            Calculate Estimate
          </button>
        </form>
      </Section>

      {showResults && (
        <>
          <Section title="Your Custom CEERION Energy System">
            <div className="results-summary">
              <div className="result-card-large">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="specs-grid">
                  <div>
                    <strong>Solar:</strong> {config.solarSize} kW
                  </div>
                  <div>
                    <strong>Battery:</strong> {config.batterySize} kWh
                  </div>
                  <div>
                    <strong>EV Integration:</strong> {config.evIntegration ? `Yes (${config.numEVs} EV)` : "No"}
                  </div>
                  <div>
                    <strong>CPM:</strong> Included
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Cost & Savings Analysis">
            <div className="grid-3">
              <div className="card">
                <h4>Total System Cost</h4>
                <p className="price-large"><Price amount={systemCost} large /></p>
                <p className="muted">Before incentives</p>
              </div>
              <div className="card">
                <h4>Federal Tax Credit (30%)</h4>
                <p className="price-large">-<Price amount={federalTaxCredit} large /></p>
                <p className="muted">Investment Tax Credit</p>
              </div>
              <div className="card">
                <h4>Net Cost</h4>
                <p className="price-large"><Price amount={netCost} large /></p>
                <p className="muted">After federal incentives</p>
              </div>
            </div>
            <div className="grid-2" style={{ marginTop: "var(--spacing-lg)" }}>
              <div className="card">
                <h4>Estimated Monthly Savings</h4>
                <p className="price-large"><Price amount={monthlySavings} large /></p>
                <p className="muted">
                  ~{((monthlySavings / config.avgMonthlyBill) * 100).toFixed(0)}% reduction in electric bills
                </p>
              </div>
              <div className="card">
                <h4>Estimated Payback Period</h4>
                <p className="price-large">{paybackYears.toFixed(1)} years</p>
                <p className="muted">25+ year system lifespan</p>
              </div>
            </div>
          </Section>

          <Section title="Backup Power & Resilience">
            <div className="grid-2">
              <div className="card">
                <h4>Battery-Only Backup</h4>
                <p className="price-large">{backupHours.toFixed(1)} hours</p>
                <p className="muted">Runtime for typical whole-home backup</p>
              </div>
              <div className="card">
                <h4>With EV Integration</h4>
                <p className="price-large">
                  {config.evIntegration ? `${backupWithEV.toFixed(1)} hours` : "N/A"}
                </p>
                <p className="muted">
                  {config.evIntegration
                    ? "Extended runtime using V2H"
                    : "Enable EV integration for extended backup"}
                </p>
              </div>
            </div>
            <p style={{ textAlign: "center", marginTop: "var(--spacing-lg)" }}>
              <strong>Note:</strong> Backup runtime assumes average household usage. Actual runtime varies based on
              active loads and solar availability.
            </p>
          </Section>

          <Section title="What's Included">
            <div className="grid-2">
              <div className="card">
                <h4>✅ Complete System</h4>
                <ul className="bullet-list">
                  <li>Solar panels with mounting hardware</li>
                  <li>Battery storage modules (LiFePO₄)</li>
                  <li>CEERION POWER MANAGER™ (CPM)</li>
                  <li>All wiring, conduit, and electrical hardware</li>
                  <li>{config.evIntegration ? "EV charger with V2H capability" : "EV-ready infrastructure"}</li>
                </ul>
              </div>
              <div className="card">
                <h4>✅ Professional Services</h4>
                <ul className="bullet-list">
                  <li>Site assessment and system design</li>
                  <li>Permit acquisition and utility coordination</li>
                  <li>Professional installation by certified technicians</li>
                  <li>System commissioning and testing</li>
                  <li>Customer training and ongoing support</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Next Steps">
            <p>
              Ready to move forward with your custom CEERION Energy system? Contact our team to schedule a detailed site
              assessment, discuss financing options, and confirm your reservation.
            </p>
            <div style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:sales@ceerion.com" className="primary-btn">
                Contact Sales Team
              </a>
              <button
                type="button"
                onClick={() => {
                  setShowResults(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="ghost-btn"
              >
                Modify Configuration
              </button>
            </div>
          </Section>
        </>
      )}
    </>
  );
}
