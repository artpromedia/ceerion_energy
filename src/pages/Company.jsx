import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

export default function Company() {
  return (
    <>
      <Hero
        eyebrow="Powering Tomorrow"
        title="About CEERION Energy"
        subtitle="Building an energy ecosystem where your energy is truly yours—intelligent, resilient, and under your control."
      />

      <Section title="Our Mission">
        <p>
          CEERION Energy exists to democratize energy independence. We believe every home and
          business should have the tools to generate, store, and intelligently manage their own
          power—reducing reliance on aging infrastructure while contributing to a cleaner grid.
        </p>
        <p>
          By integrating solar generation, advanced battery storage, and our revolutionary CEERION
          POWER MANAGER™, we're creating an ecosystem that transforms how people interact with
          energy. No more passive consumption—just active control, resilience, and economic value.
        </p>
      </Section>

      <Section title="Our Vision: The Integrated Energy Future">
        <div className="grid-3">
          <div className="card">
            <h3>🔋 Energy Independence</h3>
            <p>
              Every customer gains real-time visibility and control over their power, breaking free
              from grid dependency and unpredictable utility costs.
            </p>
          </div>
          <div className="card">
            <h3>🌍 Sustainability</h3>
            <p>
              Clean solar generation combined with efficient storage reduces carbon footprints and
              accelerates the transition to renewable energy.
            </p>
          </div>
          <div className="card">
            <h3>🚗 Mobility Integration</h3>
            <p>
              CEERION EVs become mobile energy assets through Vehicle-to-Home and PowerShare™,
              creating a seamless mobility-energy platform.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Leadership & Innovation">
        <p>
          CEERION Energy is led by a team of visionaries from automotive, energy, and technology
          sectors who share a common belief: the future of energy is distributed, intelligent,
          and customer-owned.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>Engineering Excellence</h4>
            <p>
              Our engineering team has decades of combined experience in power electronics, battery
              systems, automotive integration, and smart grid technology. The CEERION POWER MANAGER™
              represents years of R&D focused on safety, reliability, and seamless user experience.
            </p>
          </div>
          <div className="card">
            <h4>Customer-First Design</h4>
            <p>
              Every product decision starts with the question: "How does this serve our customer?"
              From installation to daily operation to emergency resilience, we design for real-world
              scenarios and real people.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Sustainability Commitment">
        <p>
          At CEERION, sustainability isn't a marketing term—it's our foundation. Every system we
          deploy reduces fossil fuel dependency, enables renewable energy adoption, and contributes
          to grid stability during peak demand.
        </p>
        <ul className="bullet-list">
          <li>100% of our residential systems use clean solar generation</li>
          <li>Battery systems are designed for 15+ year lifecycles with recycling programs</li>
          <li>Our CPM reduces energy waste through intelligent load management</li>
          <li>PowerShare™ enables community-level energy sharing, reducing overall infrastructure needs</li>
          <li>Manufacturing partners meet strict environmental and labor standards</li>
        </ul>
      </Section>

      <Section title="Careers at CEERION Energy">
        <p>
          Join us in building the future of energy. We're looking for engineers, designers,
          installers, and operators who are passionate about clean energy, resilient systems,
          and empowering customers.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>Open Roles</h4>
            <ul className="bullet-list">
              <li>Power Electronics Engineer</li>
              <li>Field Installation Specialist</li>
              <li>Software Engineer - Energy Management</li>
              <li>Product Designer</li>
              <li>Customer Success Manager</li>
            </ul>
          </div>
          <div className="card">
            <h4>Why CEERION?</h4>
            <ul className="bullet-list">
              <li>Work on cutting-edge energy and mobility technology</li>
              <li>Competitive compensation and equity</li>
              <li>Comprehensive health and wellness benefits</li>
              <li>Collaborative, mission-driven culture</li>
              <li>Remote-friendly with hubs in major cities</li>
            </ul>
          </div>
        </div>
        <a className="primary-btn" href="mailto:careers@ceerionenergy.com">
          Apply Now
        </a>
      </Section>

      <Section title="Frequently Asked Questions">
        <div className="faq">
          <div className="faq-item">
            <h4>How is CEERION Energy different from just buying solar panels?</h4>
            <p>
              Traditional solar is one-way generation. CEERION Energy is a complete ecosystem:
              generation + storage + intelligent management. The CPM orchestrates everything,
              enabling backup power, load shifting, EV integration, and even peer-to-peer energy
              sharing through PowerShare™.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can I use CEERION Energy if I don't have an EV?</h4>
            <p>
              Absolutely. EV integration is optional. The H1 and B3 systems work perfectly without
              an EV. However, if you add one later, the CPM is already EV-native and ready for
              Vehicle-to-Home or PowerShare™.
            </p>
          </div>
          <div className="faq-item">
            <h4>What happens during an extended grid outage?</h4>
            <p>
              Your CPM automatically islands your home or facility, running on stored battery power
              and solar (if available). You can enable Storm Mode to prioritize critical circuits,
              and if you have a CEERION EV, you can extend runtime significantly with V2H.
            </p>
          </div>
          <div className="faq-item">
            <h4>How long does installation take?</h4>
            <p>
              Typical residential installations (H1) are completed in 2-3 days. Commercial/campus
              systems (B3) vary based on size, typically 1-2 weeks. Our certified installers handle
              permitting, electrical work, and system commissioning.
            </p>
          </div>
          <div className="faq-item">
            <h4>Is financing available?</h4>
            <p>
              Yes. We offer flexible financing options for both residential and commercial customers,
              including zero-down leases, PPA agreements, and traditional loans. Federal and state
              incentives can significantly reduce total cost.
            </p>
          </div>
          <div className="faq-item">
            <h4>When will CEERION Energy be available?</h4>
            <p>
              We're accepting reservations now with first deliveries beginning Q2 2026. Early
              reservation holders will have priority access to the configurator and installation
              scheduling.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Press & Media">
        <p>
          For press inquiries, media kits, high-resolution images, or interview requests, please
          contact our communications team.
        </p>
        <a className="ghost-btn" href="mailto:press@ceerionenergy.com">
          Media Contact
        </a>
      </Section>
    </>
  );
}
