import Section from "../components/Section.jsx";

const products = [
  {
    id: "h1",
    name: "H1 Home Essentials",
    segment: "Residential",
    summary:
      "A right-sized CEERION Energy package for single-family homes that want protection from outages, lower bills, and EV-based backup.",
    features: [
      "Solar generation (rooftop or carport compatible)",
      "Modular battery storage for day/night shifting",
      "CEERION POWER MANAGER™ for circuit-level control",
      "EV-native: V2H for extending backup runtime"
    ],
  },
  {
    id: "b3",
    name: "B3 Microgrid Campus",
    segment: "Commercial / Campus",
    summary:
      "A scalable, dispatchable energy platform for clinics, estates, schools, and business parks that need always-on power.",
    features: [
      "Supports multi-building microgrid layouts",
      "Orchestrates multiple storage blocks",
      "Integrates mobile assets and CEERION EV fleet",
      "Ideal for sites with unreliable grid power"
    ],
  },
];

export default function Products() {
  return (
    <>
      <Section title="CEERION Energy Product Lines">
        <p>
          The CEERION Energy lineup is organized to serve both homes and campus-scale customers.
          Below are the products mentioned on the CEERION Energy page—H1 Home Essentials and B3
          Microgrid Campus—with structured descriptions for your prototype.
        </p>
      </Section>

      <Section title="Available Configurations">
        <div className="grid-2">
          {products.map((p) => (
            <div key={p.id} className="card">
              <h3>{p.name}</h3>
              <p className="muted">{p.segment}</p>
              <p>{p.summary}</p>
              <ul className="bullet-list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="ghost-btn" type="button">
                Add to Configurator
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Configurator (Placeholder)">
        <p>
          On the real ceerionenergy.com, this would allow a user to pick site type (home vs campus),
          select solar and storage size, and link an EV for PowerShare™. In this prototype, we leave
          the UI stubbed so the frontend team can attach a real form or CMS later.
        </p>
        <form className="config-form">
          <label>
            Site Type
            <select>
              <option>Home (H1)</option>
              <option>Campus / Estate (B3)</option>
            </select>
          </label>
          <label>
            Storage Size (kWh)
            <input type="number" min="10" step="5" defaultValue="20" />
          </label>
          <label>
            EV Integration
            <select>
              <option>Yes - V2H/V2B</option>
              <option>No</option>
            </select>
          </label>
          <button className="primary-btn" type="submit">
            Generate Estimate
          </button>
        </form>
      </Section>
    </>
  );
}
