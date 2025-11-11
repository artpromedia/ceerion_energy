import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";

export default function PowerShare() {
  return (
    <>
      <Hero
        eyebrow="Coming Soon · The Future of Energy Sharing"
        title="CEERION PowerShare™ Marketplace"
        subtitle="A peer-to-peer mobile energy marketplace connecting CEERION EV owners with CPM-equipped sites. Request power during outages, or turn your EV into a revenue-generating asset."
      />

      <Section title="What is PowerShare™?">
        <p>
          PowerShare™ transforms the energy economy by making power portable, shareable, and
          monetizable. Hosts with CEERION Energy systems can request a "Power Drop" during extended
          outages, remote events, or emergencies. EV drivers fulfill requests and get paid—all
          orchestrated safely through the CPM and app.
        </p>
        <div className="grid-2">
          <div className="card">
            <h3>For Hosts</h3>
            <p>
              Request on-demand mobile energy delivered to your CPM-equipped site when you need it
              most—during storms, grid failures, or remote operations where traditional power isn't
              available.
            </p>
          </div>
          <div className="card">
            <h3>For EV Drivers</h3>
            <p>
              Turn your CEERION EV (or compatible bidirectional EV) into a revenue-generating asset.
              Accept Power Drop requests in your area and earn money while helping your community.
            </p>
          </div>
        </div>
      </Section>

      <Section title="How PowerShare™ Works">
        <div className="system-diagram">
          <div className="diagram-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Host Requests Power Drop</h4>
              <p>
                A CPM-equipped home or business experiences an extended outage or needs supplemental
                power. The host opens the CEERION app and requests a Power Drop, specifying energy
                needed (kWh) and timeframe.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Nearby Drivers Notified</h4>
              <p>
                CEERION EV drivers within range receive the request in their app. They see the
                location, energy amount, estimated earnings, and round-trip distance. Drivers set
                their own "reserve range" that's always protected.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Driver Accepts & Delivers</h4>
              <p>
                A driver accepts the request and drives to the host location. Upon arrival, the EV
                connects to the CPM via a certified V2H adapter. The CPM manages the safe energy
                transfer.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Safe Energy Transfer</h4>
              <p>
                The CPM orchestrates bidirectional charging from the EV to the host's battery or
                directly to home loads. Energy transfer is monitored in real-time. Driver's reserve
                range is never compromised.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Payment & Reputation</h4>
              <p>
                Upon completion, payment is processed instantly through the app. Both host and driver
                rate the experience. High-rated drivers get priority access to future requests.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Benefits for Hosts">
        <div className="grid-3">
          <div className="card">
            <h4>🔋 Emergency Backup</h4>
            <p>
              When grid outages exceed your battery capacity, request a Power Drop to extend runtime
              for critical systems—medical devices, refrigeration, communications.
            </p>
          </div>
          <div className="card">
            <h4>🏕️ Remote Power</h4>
            <p>
              Hosting an outdoor event, construction site, or remote location without grid access?
              PowerShare™ delivers clean, quiet power without diesel generators.
            </p>
          </div>
          <div className="card">
            <h4>💡 Peak Shaving</h4>
            <p>
              Commercial hosts can use PowerShare™ to reduce demand charges during peak periods,
              supplementing on-site storage with mobile energy at competitive rates.
            </p>
          </div>
          <div className="card">
            <h4>🌍 Community Resilience</h4>
            <p>
              During widespread outages, PowerShare™ creates a distributed energy network where
              neighbors help neighbors, schools stay open, and clinics remain operational.
            </p>
          </div>
          <div className="card">
            <h4>📊 Transparent Pricing</h4>
            <p>
              See upfront costs for Power Drops. Pricing is dynamic based on supply/demand, distance,
              and energy amount—but always transparent before you request.
            </p>
          </div>
          <div className="card">
            <h4>🛡️ Safety First</h4>
            <p>
              All energy transfers are managed by the CPM with built-in safety interlocks. Drivers
              are vetted and rated. Insurance coverage included for all transactions.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Benefits for EV Drivers">
        <div className="grid-3">
          <div className="card">
            <h4>💰 Monetize Your EV</h4>
            <p>
              Earn money from your vehicle when it's parked. Average Power Drop earnings: $50-200
              depending on energy delivered and distance traveled.
            </p>
          </div>
          <div className="card">
            <h4>🎯 You Control Availability</h4>
            <p>
              Set your own schedule, service radius, minimum payment, and reserve range. Accept
              only the requests that work for you. No obligations.
            </p>
          </div>
          <div className="card">
            <h4>🔒 Protected Reserve</h4>
            <p>
              Your "driver reserve" is always protected. PowerShare™ will never discharge your
              battery below your configured minimum—you always have range to get home.
            </p>
          </div>
          <div className="card">
            <h4>⚡ Fast Charging Access</h4>
            <p>
              PowerShare™ drivers get preferred access to CEERION DC fast charging networks at
              reduced rates—a perk for being part of the community energy ecosystem.
            </p>
          </div>
          <div className="card">
            <h4>🏆 Build Reputation</h4>
            <p>
              High-rated drivers get priority notifications for premium requests. Build a 5-star
              reputation and unlock higher earnings and exclusive opportunities.
            </p>
          </div>
          <div className="card">
            <h4>🤝 Help Your Community</h4>
            <p>
              Provide critical energy during emergencies while earning. Many drivers report deep
              satisfaction from helping neighbors during outages and disasters.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Pricing Model">
        <p>
          PowerShare™ pricing is transparent and market-driven. Hosts see estimated costs before
          requesting, and drivers see estimated earnings before accepting.
        </p>
        <div className="specs-table">
          <div className="spec-row">
            <div className="spec-label">Base Energy Rate</div>
            <div className="spec-value">$0.30-0.50 per kWh delivered (varies by region and demand)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Distance Fee</div>
            <div className="spec-value">$0.50 per mile round-trip</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Service Fee</div>
            <div className="spec-value">15% (covers insurance, platform, and support)</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Surge Pricing</div>
            <div className="spec-value">During high-demand events (storms, heat waves), rates increase up to 3x</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Driver Payout</div>
            <div className="spec-value">85% of total transaction value after fees</div>
          </div>
          <div className="spec-row">
            <div className="spec-label">Payment Processing</div>
            <div className="spec-value">Instant via app (ACH, debit card, or CEERION credits)</div>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
          <strong>Example:</strong> 20 kWh Power Drop, 10 miles away, standard demand →
          Host pays ~$45 total | Driver earns ~$38
        </p>
      </Section>

      <Section title="Safety & Insurance">
        <p>
          Safety is paramount. Every PowerShare™ transaction is protected by multiple layers of
          safeguards and comprehensive insurance coverage.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>Driver Verification</h4>
            <ul className="bullet-list">
              <li>Background checks for all drivers</li>
              <li>Valid driver's license and insurance required</li>
              <li>EV must pass bi-annual safety inspection</li>
              <li>CEERION-certified V2H adapter required</li>
            </ul>
          </div>
          <div className="card">
            <h4>Technical Safeguards</h4>
            <ul className="bullet-list">
              <li>CPM manages all energy transfers with safety interlocks</li>
              <li>Automatic disconnect if faults detected</li>
              <li>Real-time monitoring and emergency shutdown</li>
              <li>Certified adapters with built-in protection</li>
            </ul>
          </div>
          <div className="card">
            <h4>Insurance Coverage</h4>
            <ul className="bullet-list">
              <li>$1M liability per transaction included</li>
              <li>Equipment damage coverage for host and driver</li>
              <li>EV battery warranty protection maintained</li>
              <li>Property damage coverage up to $500K</li>
            </ul>
          </div>
          <div className="card">
            <h4>Dispute Resolution</h4>
            <ul className="bullet-list">
              <li>24/7 support for active transactions</li>
              <li>In-app issue reporting and mediation</li>
              <li>Refund guarantee for failed deliveries</li>
              <li>Driver compensation for host cancellations</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Compatible Vehicles">
        <p>
          PowerShare™ is designed for CEERION EVs but supports any vehicle with bidirectional
          charging capability and a certified adapter.
        </p>
        <div className="grid-3">
          <div className="card">
            <h4>CEERION EVs</h4>
            <p>
              Native PowerShare™ integration. Automatic enrollment for CEERION EV owners with CPM
              systems. No additional hardware required.
            </p>
          </div>
          <div className="card">
            <h4>Compatible EVs</h4>
            <p>
              Ford F-150 Lightning, Rivian R1T/R1S, Hyundai IONIQ 5/6, Kia EV6/EV9, and others with
              bidirectional capability. CEERION V2H adapter required.
            </p>
          </div>
          <div className="card">
            <h4>Coming Soon</h4>
            <p>
              Tesla vehicles (pending official V2H support), GM Ultium platform vehicles, and
              additional manufacturers rolling out bidirectional charging.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Launch Timeline">
        <div className="system-diagram">
          <div className="diagram-step">
            <div className="step-number">Q2</div>
            <div className="step-content">
              <h4>2026: Beta Launch</h4>
              <p>
                PowerShare™ Beta opens in select California markets. Invitation-only for CEERION
                Energy customers and EV owners. Testing real-world demand and operations.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">Q4</div>
            <div className="step-content">
              <h4>2026: Public Launch</h4>
              <p>
                Full public launch in California, Texas, and Florida. Open enrollment for all
                CEERION Energy hosts and compatible EV drivers.
              </p>
            </div>
          </div>
          <div className="diagram-step">
            <div className="step-number">Q2</div>
            <div className="step-content">
              <h4>2027: National Expansion</h4>
              <p>
                PowerShare™ expands to all 50 states. Enterprise partnerships for commercial fleet
                integration. International pilot programs begin.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Join the PowerShare™ Waitlist">
        <p>
          PowerShare™ represents the future of distributed energy—where power is portable,
          communities are resilient, and every EV becomes an asset. Reserve your CEERION Energy
          system and get early access when PowerShare™ launches.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="primary-btn">
            Configure Your System
          </Link>
          <Link to="/contact" className="ghost-btn">
            Contact Sales
          </Link>
        </div>
      </Section>
    </>
  );
}
