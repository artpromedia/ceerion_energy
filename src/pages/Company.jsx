import Section from "../components/Section.jsx";

export default function Company() {
  return (
    <>
      <Section title="About CEERION Energy">
        <p>
          CEERION is building an energy ecosystem where your energy is truly yours—intelligent,
          resilient, and under your control. From vehicles to Energy & IoT, the company is
          integrating mobility and stationary power into one platform.
        </p>
      </Section>
      <Section title="Resources & Support">
        <ul className="bullet-list">
          <li>About</li>
          <li>Careers</li>
          <li>Investors</li>
          <li>Sustainability</li>
          <li>Press Kit</li>
          <li>FAQ</li>
        </ul>
      </Section>
    </>
  );
}
