import { useState } from "react";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "residential",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your project";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send this to a backend
      console.log("Form submitted:", formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          projectType: "residential",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      <Hero
        eyebrow="Get in Touch"
        title="Contact CEERION Energy"
        subtitle="Tell us about your home, business, or campus project. Our team will respond within 24 hours to discuss your energy independence goals."
      />

      <Section title="Start Your Energy Independence Journey">
        {submitted ? (
          <div className="success-message">
            <h3>✓ Thank You!</h3>
            <p>
              Your message has been received. A CEERION Energy specialist will contact you within 24
              hours to discuss your project.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name *
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </label>

            <label>
              Email *
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>

            <label>
              Project Type
              <select
                value={formData.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
              >
                <option value="residential">Residential (H1 Home Essentials)</option>
                <option value="commercial">Commercial / Campus (B3 Microgrid)</option>
                <option value="fleet">Fleet / Multiple Vehicles</option>
                <option value="other">Other / General Inquiry</option>
              </select>
            </label>

            <label>
              Message *
              <textarea
                rows="6"
                placeholder="Tell us about your energy requirements, property size, current challenges, and goals for energy independence..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </label>

            <button className="primary-btn" type="submit">
              Send Message
            </button>
            <p className="form-note">
              * Required fields. We respect your privacy and will never share your information.
            </p>
          </form>
        )}
      </Section>

      <Section title="Other Ways to Reach Us">
        <div className="grid-3">
          <div className="card">
            <h4>📧 Email</h4>
            <p>
              <a href="mailto:info@ceerion.com">info@ceerion.com</a>
            </p>
            <p className="muted">General inquiries and support</p>
          </div>
          <div className="card">
            <h4>📞 Phone</h4>
            <p>
              <a href="tel:+18885551234">1-888-555-CEERION</a>
            </p>
            <p className="muted">Mon-Fri 8am-6pm PT</p>
          </div>
          <div className="card">
            <h4>💼 Sales</h4>
            <p>
              <a href="mailto:sales@ceerion.com">sales@ceerion.com</a>
            </p>
            <p className="muted">Commercial and residential projects</p>
          </div>
        </div>
      </Section>

      <Section title="Visit Our Experience Centers">
        <p>
          See CEERION Energy systems in person at our experience centers. Schedule a private
          demonstration and speak with energy specialists.
        </p>
        <div className="grid-2">
          <div className="card">
            <h4>🌴 Los Angeles, CA</h4>
            <p>123 Energy Way, Suite 100</p>
            <p>Los Angeles, CA 90001</p>
            <a href="https://maps.google.com" className="link-inline">
              Get Directions →
            </a>
          </div>
          <div className="card">
            <h4>🤠 Austin, TX</h4>
            <p>456 Solar Drive, Building B</p>
            <p>Austin, TX 78701</p>
            <a href="https://maps.google.com" className="link-inline">
              Get Directions →
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
