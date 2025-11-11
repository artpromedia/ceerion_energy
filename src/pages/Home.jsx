import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Now Accepting Reservations · Shipping Q2 2026"
        title="Welcome to CEERION Energy"
        subtitle="An integrated ecosystem designed for resilience, intelligence, and complete control. Move beyond simple solar panels and batteries. Step into a home or business powered by a smarter grid—built by you."
        actions={
          <>
            <a className="primary-btn" href="#reserve">Secure Your Place</a>
            <Link className="ghost-btn" to="/system">See How It Works</Link>
          </>
        }
      />

      <Section id="own" title="Own Your Power. Intelligently.">
        <p>
          CEERION Energy combines solar generation, advanced battery storage, and our
          service-rated CEERION POWER MANAGER™ (CPM) to deliver uncompromising reliability and
          economic value. The CPM gives you real-time, circuit-level control so you can protect
          essentials, optimize for lower tariffs, and keep running even when the grid can't.
        </p>
        <div className="grid-3">
          <div className="card">
            <h3>CEERION POWER MANAGER™ (CPM)</h3>
            <p>
              The brain of your energy system. Replaces outdated breaker boxes and orchestrates
              solar, storage, EV, and grid in one control plane.
            </p>
          </div>
          <div className="card">
            <h3>EV-Native Architecture</h3>
            <p>
              Enable Vehicle-to-Home (V2H) and Vehicle-to-Building (V2B) so your CEERION EV (or
              other compatible EV) becomes a mobile battery that extends backup runtime.
            </p>
          </div>
          <div className="card">
            <h3>Uncompromising Resilience</h3>
            <p>
              Automatic islanding, Storm Mode preparation, and prioritized circuits to keep critical
              systems online—even without the cloud.
            </p>
          </div>
        </div>
      </Section>

      <Section id="integrated" title="A Seamlessly Integrated System">
        <div className="grid-4">
          <div className="card">
            <h4>Generation</h4>
            <p>High-efficiency solar captures clean energy from the sun.</p>
          </div>
          <div className="card">
            <h4>Storage</h4>
            <p>Modular lithium battery packs store energy for when you need it most.</p>
          </div>
          <div className="card">
            <h4>The Brain (CPM)</h4>
            <p>Orchestrates power flow between solar, battery, EV, home, and grid.</p>
          </div>
          <div className="card">
            <h4>Mobile Asset</h4>
            <p>CEERION EV integrates as a dispatchable power source.</p>
          </div>
        </div>
      </Section>

      <Section id="products" title="Residential & Commercial Lines">
        <p>
          On the dedicated CEERION Energy site, customers can view detailed specifications for both
          home and campus-scale systems—from the H1 Home Essentials to the B3 Microgrid Campus—and
          use a configurator to design the ideal system. We model both here.
        </p>
        <div className="grid-2">
          <div className="card">
            <h3>H1 Home Essentials</h3>
            <p>
              A complete residential bundle that combines solar, storage, and CPM to protect crucial
              household circuits, reduce energy bills, and enable EV-based backup.
            </p>
            <Link to="/products" className="link-inline">View details →</Link>
          </div>
          <div className="card">
            <h3>B3 Microgrid Campus</h3>
            <p>
              A campus/commercial-scale system designed for clinics, schools, estates, and business
              parks requiring orchestrated, dispatchable, and resilient power.
            </p>
            <Link to="/products" className="link-inline">View details →</Link>
          </div>
        </div>
      </Section>

      <Section id="powershare" title="A Glimpse Into the Future: CEERION PowerShare™" kicker="Coming Soon">
        <p>
          PowerShare™ is a peer-to-peer mobile energy marketplace that connects CEERION EV owners
          with CPM-equipped sites. Hosts can request a "Power Drop" during outages or remote events
          and get clean power delivered. EV drivers can turn their vehicle into a revenue-generating
          asset.
        </p>
        <Link to="/powershare" className="ghost-btn">Learn more</Link>
      </Section>

      <Section id="reserve" title="Now Accepting Reservations" kicker="Shipping Q2 2026">
        <p>
          Secure your place in line to deploy CEERION Energy—residential or commercial—and get early
          access to the configurator experience.
        </p>
        <a className="primary-btn" href="mailto:info@ceerion.com">Contact Sales</a>
      </Section>
    </>
  );
}
