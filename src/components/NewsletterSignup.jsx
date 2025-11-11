import { useState } from "react";

export default function NewsletterSignup({ inline = false, theme = "dark" }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    interests: [],
    location: "",
    frequency: "weekly"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const interestOptions = [
    { id: "residential", label: "Home Energy Solutions" },
    { id: "commercial", label: "Commercial Systems" },
    { id: "ev", label: "EV Integration" },
    { id: "technology", label: "Clean Energy Technology" },
    { id: "incentives", label: "Incentives & Financing" },
    { id: "company", label: "Company News" }
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation:
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log("Newsletter signup:", formData);
      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          email: "",
          firstName: "",
          interests: [],
          location: "",
          frequency: "weekly"
        });
        setSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error("Newsletter signup error:", error);
      setError("There was an error signing up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const containerClass = `newsletter-signup ${inline ? 'newsletter-inline' : 'newsletter-standalone'} ${theme}`;

  if (submitted) {
    return (
      <div className={containerClass}>
        <div className="newsletter-success">
          <h3>🎉 Welcome to the CEERION Community!</h3>
          <p>
            Thank you for subscribing! You'll receive the latest updates on clean energy solutions, 
            product announcements, and exclusive insights from the CEERION Energy team.
          </p>
          <p className="success-note">
            Check your email for a confirmation message and to customize your preferences.
          </p>
        </div>
      </div>
    );
  }

  if (inline) {
    return (
      <div className={containerClass}>
        <div className="newsletter-inline-content">
          <div className="newsletter-text">
            <h4>Stay Connected</h4>
            <p>Get the latest updates on clean energy solutions and CEERION Energy news.</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-inline-form">
            <div className="email-input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit" 
                className="primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className="newsletter-header">
        <h3>🌟 Join the CEERION Energy Newsletter</h3>
        <p>
          Stay informed about the latest in clean energy technology, product updates, 
          incentive programs, and exclusive insights from industry experts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="form-row">
          <label>
            Email Address *
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Your first name"
              disabled={isSubmitting}
            />
          </label>
        </div>

        <label>
          Location (Optional)
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, State/Province, or Country"
            disabled={isSubmitting}
          />
          <small>Helps us send region-specific incentive information</small>
        </label>

        <div className="interests-section">
          <label>What interests you most? (Optional)</label>
          <div className="interests-grid">
            {interestOptions.map((option) => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(option.id)}
                  onChange={() => handleInterestChange(option.id)}
                  disabled={isSubmitting}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <label>
          Email Frequency
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            disabled={isSubmitting}
          >
            <option value="weekly">Weekly updates</option>
            <option value="monthly">Monthly digest</option>
            <option value="quarterly">Quarterly reports</option>
            <option value="announcements">Major announcements only</option>
          </select>
        </label>

        {error && <div className="error-message">{error}</div>}

        <div className="newsletter-benefits">
          <h4>What you'll get:</h4>
          <ul>
            <li>🔋 Latest clean energy technology insights</li>
            <li>💰 Updates on incentives and financing options</li>
            <li>⚡ CEERION Energy product announcements</li>
            <li>📊 Industry trends and market analysis</li>
            <li>🎯 Exclusive access to webinars and events</li>
          </ul>
        </div>

        <button
          type="submit"
          className="primary-btn newsletter-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
        </button>

        <p className="newsletter-privacy">
          <small>
            We respect your privacy and will never share your information. 
            You can unsubscribe at any time. By subscribing, you agree to receive 
            marketing communications from CEERION Energy.
          </small>
        </p>
      </form>
    </div>
  );
}