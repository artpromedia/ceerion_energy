import Section from "../components/Section.jsx";

export default function System() {
  return (
    <>
      <Section title="Integrated Energy, Storage, and Control">
        <p>
          CEERION Energy is not a loose collection of solar panels and a battery. It is an
          end-to-end solution where every component works in concert and is managed by the
          CEERION POWER MANAGER™ (CPM). This delivers visibility, control, and resilience at the
          circuit level.
        </p>
      </Section>

      <Section title="What the CPM Does">
        <ul className="bullet-list">
          <li>Replaces legacy breaker panels with a service-rated smart panel.</li>
          <li>Manages power flow between solar, storage, EV, home, and grid.</li>
          <li>Enables prioritized circuits and Storm Mode for outages.</li>
          <li>Supports local-first architecture so it works even without cloud.</li>
        </ul>
      </Section>

      <Section title="Designed for the Modern World">
        <p>
          With unpredictable weather, unstable grids, and growing EV adoption, homes and businesses
          need systems that can dynamically shift loads and keep essentials running. CEERION Energy
          was built precisely for that reality.
        </p>
      </Section>
    </>
  );
}
