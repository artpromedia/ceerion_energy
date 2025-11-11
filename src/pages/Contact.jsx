import Section from "../components/Section.jsx";

export default function Contact() {
  return (
    <Section title="Contact CEERION Energy">
      <p>Tell us about your home, business, or campus project.</p>
      <form className="contact-form">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <label>
          Project Type
          <select>
            <option>Residential (H1)</option>
            <option>Commercial / Campus (B3)</option>
            <option>Fleet / EV</option>
          </select>
        </label>
        <label>
          Message
          <textarea rows="4" placeholder="Describe your energy requirements"></textarea>
        </label>
        <button className="primary-btn" type="submit">Submit</button>
      </form>
    </Section>
  );
}
