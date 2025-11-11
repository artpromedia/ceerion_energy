import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";

export default function System() {
  return (
    <>
      <Hero
        eyebrow="The Complete Ecosystem"
        title="Integrated Energy, Storage, and Control"
        subtitle="CEERION Energy is not a loose collection of solar panels and a battery. It's an end-to-end solution where every component works in concert, managed by the revolutionary CEERION POWER MANAGER™."
      />

      <Section title="The Four Pillars of CEERION Energy">
        <div className="grid-4">
          <div className="card">
            <h3>☀️ Solar Generation</h3>
            <p>
              High-efficiency photovoltaic panels capture clean energy from the sun. Available in
              rooftop and carport configurations with smart MPPT optimization.
            </p>
          </div>
          <div className="card">
            <h3>🔋 Battery Storage</h3>
            <p>
              Modular lithium iron phosphate (LiFePO₄) battery packs store energy for day/night
              shifting, backup power, and grid arbitrage. Scalable from 10kWh to 100kWh+.
            </p>
          </div>
          <div className="card">
            <h3>🧠 CEERION POWER MANAGER™</h3>
            <p>
              The brain of your system. Replaces legacy breaker panels with a service-rated smart
              panel that orchestrates power flow and enables circuit-level control.
            </p>
          </div>
          <div className="card">
            <h3>🚗 EV Integration</h3>
            <p>
              Vehicle-to-Home (V2H) and Vehicle-to-Building (V2B) turns your CEERION EV (or
              compatible EV) into a mobile battery for extended backup runtime.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What Makes the CPM Revolutionary?">
        <p>
          Traditional electrical panels are dumb boxes—they distribute power but have no intelligence.
          The CEERION POWER MANAGER™ changes everything.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>Circuit-Level Intelligence</h4>
            <p>
              Every circuit in your home or building is monitored and controlled individually. You
              decide which circuits are essential (refrigerator, medical equipment, communications)
              and which can be shed during outages to extend battery life.
            </p>
          </div>
          <div className="card">
            <h4>Real-Time Orchestration</h4>
            <p>
              The CPM continuously balances five power sources: solar, battery, grid, EV, and loads.
              It optimizes for cost, resilience, and carbon reduction based on your preferences and
              real-time grid conditions.
            </p>
          </div>
          <div className="card">
            <h4>Automatic Islanding</h4>
            <p>
              When grid power fails, the CPM detects the outage in milliseconds and seamlessly
              transitions to battery/solar power. Your lights never flicker. Your systems never
              go down.
            </p>
          </div>
          <div className="card">
            <h4>Storm Mode Preparation</h4>
            <p>
              Ahead of severe weather, activate Storm Mode to charge batteries to 100%, prioritize
              critical circuits, and prepare for extended islanding. You're always in control.
            </p>
          </div>
          <div className="card">
            <h4>Local-First Architecture</h4>
            <p>
              The CPM operates autonomously without cloud connectivity. Your system works even if
              internet or cellular networks go down. Cloud features (monitoring, remote control)
              are optional conveniences, not dependencies.
            </p>
          </div>
          <div className="card">
            <h4>Time-of-Use Optimization</h4>
            <p>
              If your utility has time-of-use rates, the CPM automatically shifts battery
              charging/discharging to minimize costs. Charge when rates are low, discharge when
              they're high, and never think about it.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Technical Specifications">
        <div className="specs-table">
          <div className="spec-row">
            <div className="spec-label">Service Rating</div>
            <div className="spec-value">200A, 400A (upgradable)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Voltage</div>
            <div className="spec-value">120V/240V split-phase (North America), 230V single-phase (Europe)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Controllable Circuits</div>
            <div className="spec-value">Up to 32 independently managed circuits</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Battery Compatibility</div>
            <div className="spec-value">CEERION Energy Storage (10-100kWh modular)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Solar Compatibility</div>
            <div className="spec-value">DC-coupled via integrated MPPT (up to 15kW residential, 50kW commercial)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">EV Charging</div>
            <div className="spec-value">Integrated L2 charger (up to 11.5kW), V2H/V2B bidirectional</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Backup Transition</div>
            <div className="spec-value">&lt;20ms (seamless, no flicker)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Connectivity</div>
            <div className="spec-value">Wi-Fi, Ethernet, LTE (optional), Local control via touchscreen</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Certifications</div>
            <div className="spec-value">UL 1741, UL 9540, IEEE 1547, NEC 2023 compliant</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Warranty</div>
            <div className="spec-value">10 years standard, 15 years extended available</div>
          </div>
        </div>
      </Section>

      <Section title="How It All Works Together">
        <div className="system-diagram">
          <div className="diagram-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Solar Generates Power</h4>
              <p>
                During daylight, solar panels generate DC electricity. The CPM's integrated MPPT
                controllers optimize panel output and convert DC to AC.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Battery Stores Excess</h4>
              <p>
                When solar production exceeds home consumption, the CPM routes excess energy to
                charge the battery storage system for later use.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Grid Provides Backup</h4>
              <p>
                When solar and battery are depleted (rare), the CPM seamlessly draws from grid
                power. You can set preferences to minimize grid dependence.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>EV Acts as Mobile Storage</h4>
              <p>
                With V2H enabled, your CEERION EV can discharge back to the home during outages,
                extending backup runtime by days. The CPM manages this automatically.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>You Stay in Control</h4>
              <p>
                Monitor everything from the CPM touchscreen or mobile app. Set priorities, enable
                Storm Mode, view real-time energy flows, and adjust preferences anytime.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Real-World Scenarios">
        <div className="grid-2">
          <div className="card">
            <h4>🌤️ Normal Day</h4>
            <p>
              Solar generates power during the day, covering home loads and charging the battery.
              Evening and night draw from battery first, then grid if needed. Your bill stays minimal.
            </p>
          </div>
          <div className="card">
            <h4>⚡ Grid Outage</h4>
            <p>
              Grid goes down. CPM instantly islands your home, running on battery + solar. Essential
              circuits stay powered. Non-essentials are shed. EV can extend runtime if needed.
            </p>
          </div>
          <div className="card">
            <h4>🌪️ Storm Approaching</h4>
            <p>
              You activate Storm Mode. CPM charges battery to 100%, charges your EV, and prepares for
              extended islanding. When the storm hits, you're ready for days of backup power.
            </p>
          </div>
          <div className="card">
            <h4>💰 Peak Rate Period</h4>
            <p>
              Your utility charges 3x during peak hours (4-9pm). CPM automatically discharges battery
              during this window, avoiding expensive grid power. You save money without lifting a finger.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Installation & Setup">
        <p>
          Professional installation is performed by CEERION-certified electricians. The process
          includes full permitting, electrical work, system commissioning, and customer training.
        </p>
        <div className="grid-3">
          <div className="card">
            <h4>Site Assessment</h4>
            <p>
              Our team evaluates your property, electrical service, solar potential, and energy
              needs. We design a custom system sized precisely for your requirements.
            </p>
          </div>
          <div className="card">
            <h4>Installation</h4>
            <p>
              Certified installers mount solar panels, install battery modules, replace your main
              panel with the CPM, and integrate everything. Typical residential: 2-3 days.
            </p>
          </div>
          <div className="card">
            <h4>Commissioning</h4>
            <p>
              We test every circuit, verify backup transitions, train you on the system, and ensure
              everything is perfect. You're never left with unanswered questions.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Ready to Experience True Energy Independence?">
        <p>
          Configure your ideal CEERION Energy system and see estimated costs, savings, and backup
          runtime for your specific needs.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="primary-btn">
            View Products
          </Link>
          <Link to="/contact" className="ghost-btn">
            Schedule Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
