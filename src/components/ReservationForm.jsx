import { useState } from "react";
import Price from "./Price.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";

export default function ReservationForm({ onClose, initialProduct = "h1" }) {
  const { formatPrice } = useCurrency();

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Location Information
    location: "",
    country: "",
    propertyType: "single-family",
    
    // System Preferences
    productType: initialProduct,
    solarSize: initialProduct === "h1" ? 8 : 25,
    batterySize: initialProduct === "h1" ? 20 : 50,
    evIntegration: true,
    
    // Timeline & Budget
    timeline: "3-6-months",
    budget: "no-preference",
    
    // Additional Information
    currentEnergyBill: "",
    specialRequirements: "",
    
    // Communication Preferences
    preferredContact: "email",
    newsletter: true,
    
    // Terms
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, send to backend:
      // const response = await fetch('/api/reservations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      console.log("Reservation submitted:", formData);
      setSubmitted(true);
      
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "There was an error submitting your reservation. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }

    // Auto-adjust solar/battery sizes when product type changes
    if (field === "productType") {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        solarSize: value === "h1" ? 8 : 25,
        batterySize: value === "h1" ? 20 : 50
      }));
    }
  };

  const getEstimatedPrice = () => {
    const basePrice = formData.productType === "h1" ? 3500 : 9500;
    const solarPrice = formData.productType === "h1" ? 2500 : 2200;
    const batteryPrice = formData.productType === "h1" ? 800 : 700;
    
    return basePrice + (formData.solarSize * solarPrice) + (formData.batterySize * batteryPrice);
  };

  if (submitted) {
    return (
      <div className="reservation-success">
        <div className="success-content">
          <h2>🎉 Reservation Confirmed!</h2>
          <p>
            Thank you, {formData.firstName}! Your CEERION Energy system reservation has been received.
          </p>
          <div className="reservation-summary">
            <h3>Your Reservation Details:</h3>
            <ul>
              <li><strong>System:</strong> {formData.productType === "h1" ? "H1 Home Essentials" : "B3 Microgrid Campus"}</li>
              <li><strong>Solar:</strong> {formData.solarSize} kW</li>
              <li><strong>Battery:</strong> {formData.batterySize} kWh</li>
              <li><strong>Estimated Price:</strong> <Price amount={getEstimatedPrice()} />*</li>
              <li><strong>Timeline:</strong> {formData.timeline.replace("-", " ")}</li>
            </ul>
            <p className="reservation-note">
              <small>*Before incentives. Final pricing subject to site assessment.</small>
            </p>
          </div>
          <p>
            A CEERION Energy specialist will contact you within 48 hours to schedule your site assessment 
            and discuss financing options.
          </p>
          <div className="success-actions">
            <button onClick={onClose} className="primary-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-form-overlay">
      <div className="reservation-form-container">
        <div className="reservation-form-header">
          <h2>Reserve Your CEERION Energy System</h2>
          <p>Secure your spot in our installation queue with a refundable deposit</p>
          <button onClick={onClose} className="close-btn" aria-label="Close form">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <label>
                First Name *
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </label>
              <label>
                Last Name *
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </label>
            </div>
            <div className="form-row">
              <label>
                Email Address *
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </label>
              <label>
                Phone Number *
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </label>
            </div>
          </div>

          {/* Location Information */}
          <div className="form-section">
            <h3>Location Information</h3>
            <div className="form-row">
              <label>
                Location (Zip Code / Postal Code / City) *
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="90210, M5V 3L9, or London"
                  className={errors.location ? "error" : ""}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </label>
              <label>
                Country *
                <select
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className={errors.country ? "error" : ""}
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="other">Other</option>
                </select>
                {errors.country && <span className="error-message">{errors.country}</span>}
              </label>
            </div>
            <label>
              Property Type
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange("propertyType", e.target.value)}
              >
                <option value="single-family">Single Family Home</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condominium</option>
                <option value="commercial">Commercial Building</option>
                <option value="multi-family">Multi-Family Property</option>
                <option value="farm">Farm/Agricultural</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          {/* System Configuration */}
          <div className="form-section">
            <h3>System Configuration</h3>
            <label>
              Product Type
              <select
                value={formData.productType}
                onChange={(e) => handleChange("productType", e.target.value)}
              >
                <option value="h1">H1 Home Essentials - Residential</option>
                <option value="b3">B3 Microgrid Campus - Commercial</option>
              </select>
            </label>
            
            <div className="form-row">
              <label>
                Solar Capacity: {formData.solarSize} kW
                <input
                  type="range"
                  min={formData.productType === "h1" ? "4" : "15"}
                  max={formData.productType === "h1" ? "12" : "50"}
                  step="1"
                  value={formData.solarSize}
                  onChange={(e) => handleChange("solarSize", parseInt(e.target.value))}
                  className="slider"
                />
              </label>
              <label>
                Battery Storage: {formData.batterySize} kWh
                <input
                  type="range"
                  min={formData.productType === "h1" ? "10" : "30"}
                  max={formData.productType === "h1" ? "40" : "100"}
                  step="5"
                  value={formData.batterySize}
                  onChange={(e) => handleChange("batterySize", parseInt(e.target.value))}
                  className="slider"
                />
              </label>
            </div>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.evIntegration}
                onChange={(e) => handleChange("evIntegration", e.target.checked)}
              />
              <div>
                <strong>Include EV Integration (V2H)</strong>
                <p>Vehicle-to-Home capability for extended backup power</p>
              </div>
            </label>
          </div>

          {/* Timeline & Budget */}
          <div className="form-section">
            <h3>Timeline & Budget</h3>
            <div className="form-row">
              <label>
                Preferred Timeline
                <select
                  value={formData.timeline}
                  onChange={(e) => handleChange("timeline", e.target.value)}
                >
                  <option value="asap">As soon as possible</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="flexible">Flexible timeline</option>
                </select>
              </label>
              <label>
                Budget Range
                <select
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                >
                  <option value="no-preference">No preference</option>
                  <option value="budget-conscious">Budget conscious</option>
                  <option value="moderate">Moderate investment</option>
                  <option value="premium">Premium features desired</option>
                </select>
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>Additional Information</h3>
            <label>
              Current Monthly Energy Bill ($)
              <input
                type="number"
                min="0"
                max="5000"
                value={formData.currentEnergyBill}
                onChange={(e) => handleChange("currentEnergyBill", e.target.value)}
                placeholder="200"
              />
            </label>
            <label>
              Special Requirements or Questions
              <textarea
                rows="3"
                value={formData.specialRequirements}
                onChange={(e) => handleChange("specialRequirements", e.target.value)}
                placeholder="Tell us about any special requirements, existing solar, backup needs, etc..."
              ></textarea>
            </label>
          </div>

          {/* Communication Preferences */}
          <div className="form-section">
            <h3>Communication Preferences</h3>
            <label>
              Preferred Contact Method
              <select
                value={formData.preferredContact}
                onChange={(e) => handleChange("preferredContact", e.target.value)}
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="text">Text Message</option>
                <option value="any">Any method</option>
              </select>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => handleChange("newsletter", e.target.checked)}
              />
              <div>
                <strong>Subscribe to Newsletter</strong>
                <p>Receive updates on CEERION Energy products and clean energy news</p>
              </div>
            </label>
          </div>

          {/* Estimated Price Display */}
          <div className="form-section price-summary">
            <h3>Estimated System Price</h3>
            <div className="price-breakdown">
              <div className="price-item">
                <span>System Configuration:</span>
                <span>{formData.productType === "h1" ? "H1 Home Essentials" : "B3 Microgrid Campus"}</span>
              </div>
              <div className="price-item">
                <span>Solar + Battery + CPM:</span>
                <span>{formData.solarSize}kW + {formData.batterySize}kWh</span>
              </div>
              <div className="price-item total">
                <span>Estimated Total:</span>
                <span><Price amount={getEstimatedPrice()} />*</span>
              </div>
              <p className="price-note">
                *Before incentives. Final pricing subject to site assessment and regional factors.
              </p>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="form-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => handleChange("termsAccepted", e.target.checked)}
                className={errors.termsAccepted ? "error" : ""}
              />
              <div>
                <strong>I accept the Terms and Conditions *</strong>
                <p>By submitting this form, I agree to receive communications from CEERION Energy</p>
              </div>
            </label>
            {errors.termsAccepted && <span className="error-message">{errors.termsAccepted}</span>}
            
            {errors.submit && (
              <div className="error-message submit-error">{errors.submit}</div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="ghost-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Reservation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}