-- CEERION Energy Database Schema
-- PostgreSQL Database for Reservations, Newsletter, and Contact Management

-- Create database (run this first)
-- CREATE DATABASE ceerion_energy;
-- \c ceerion_energy;

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Countries table for reference
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3) NOT NULL UNIQUE, -- ISO 3166-1 alpha-2 or alpha-3
    name VARCHAR(100) NOT NULL,
    currency_code VARCHAR(3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert common countries
INSERT INTO countries (code, name, currency_code) VALUES
('US', 'United States', 'USD'),
('CA', 'Canada', 'CAD'),
('UK', 'United Kingdom', 'GBP'),
('AU', 'Australia', 'AUD'),
('DE', 'Germany', 'EUR'),
('FR', 'France', 'EUR'),
('JP', 'Japan', 'JPY'),
('OTHER', 'Other', 'USD');

-- Product types for reference
CREATE TABLE product_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    solar_price_per_kw DECIMAL(10, 2) NOT NULL,
    battery_price_per_kwh DECIMAL(10, 2) NOT NULL,
    min_solar_kw INTEGER NOT NULL,
    max_solar_kw INTEGER NOT NULL,
    min_battery_kwh INTEGER NOT NULL,
    max_battery_kwh INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert product types
INSERT INTO product_types (code, name, description, base_price, solar_price_per_kw, battery_price_per_kwh, min_solar_kw, max_solar_kw, min_battery_kwh, max_battery_kwh) VALUES
('h1', 'H1 Home Essentials', 'Complete residential energy independence system', 3500.00, 2500.00, 800.00, 4, 12, 10, 40),
('b3', 'B3 Microgrid Campus', 'Scalable commercial/campus energy platform', 9500.00, 2200.00, 700.00, 15, 50, 30, 100);

-- Contact information table (base table for all contacts)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location TEXT, -- Zip code, postal code, or city
    country_code VARCHAR(3) REFERENCES countries(code),
    property_type VARCHAR(50),
    current_energy_bill DECIMAL(10, 2),
    preferred_contact_method VARCHAR(20) DEFAULT 'email',
    newsletter_subscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    CONSTRAINT valid_contact_method CHECK (preferred_contact_method IN ('email', 'phone', 'text', 'any'))
);

-- Create unique index on email (case insensitive)
CREATE UNIQUE INDEX idx_contacts_email ON contacts (LOWER(email));
CREATE INDEX idx_contacts_country ON contacts (country_code);
CREATE INDEX idx_contacts_created_at ON contacts (created_at);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    interests TEXT[], -- Array of interest categories
    frequency VARCHAR(20) DEFAULT 'weekly',
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT valid_frequency CHECK (frequency IN ('weekly', 'monthly', 'quarterly', 'announcements'))
);

CREATE INDEX idx_newsletter_contact ON newsletter_subscriptions (contact_id);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions (is_active);

-- System reservations table
CREATE TABLE system_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    product_type_code VARCHAR(10) REFERENCES product_types(code),
    
    -- System configuration
    solar_size_kw INTEGER NOT NULL,
    battery_size_kwh INTEGER NOT NULL,
    ev_integration BOOLEAN DEFAULT false,
    
    -- Timeline and preferences
    preferred_timeline VARCHAR(20),
    budget_range VARCHAR(20),
    special_requirements TEXT,
    
    -- Pricing (calculated at time of reservation)
    estimated_price DECIMAL(12, 2) NOT NULL,
    currency_code VARCHAR(3) DEFAULT 'USD',
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending',
    deposit_amount DECIMAL(10, 2),
    deposit_paid BOOLEAN DEFAULT false,
    deposit_paid_at TIMESTAMP WITH TIME ZONE,
    
    -- Assignment and notes
    assigned_specialist_id VARCHAR(50), -- Reference to staff/specialist system
    internal_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_timeline CHECK (preferred_timeline IN ('asap', '3-months', '3-6-months', '6-12-months', 'flexible')),
    CONSTRAINT valid_budget CHECK (budget_range IN ('no-preference', 'budget-conscious', 'moderate', 'premium')),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'contacted', 'site-assessment-scheduled', 'site-assessment-completed', 'proposal-sent', 'contract-signed', 'installation-scheduled', 'installed', 'cancelled', 'on-hold'))
);

CREATE INDEX idx_reservations_contact ON system_reservations (contact_id);
CREATE INDEX idx_reservations_product ON system_reservations (product_type_code);
CREATE INDEX idx_reservations_status ON system_reservations (status);
CREATE INDEX idx_reservations_created ON system_reservations (created_at);

-- General contact form submissions (for non-reservation inquiries)
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    project_type VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    responded_at TIMESTAMP WITH TIME ZONE,
    assigned_to VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_project_type CHECK (project_type IN ('residential', 'commercial', 'fleet', 'other')),
    CONSTRAINT valid_submission_status CHECK (status IN ('new', 'in-progress', 'responded', 'closed'))
);

CREATE INDEX idx_contact_submissions_contact ON contact_submissions (contact_id);
CREATE INDEX idx_contact_submissions_status ON contact_submissions (status);
CREATE INDEX idx_contact_submissions_created ON contact_submissions (created_at);

-- Trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to relevant tables
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON system_reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Views for common queries

-- Active newsletter subscribers with contact info
CREATE VIEW v_active_newsletter_subscribers AS
SELECT 
    c.id,
    c.first_name,
    c.last_name,
    c.email,
    c.location,
    c.country_code,
    co.name as country_name,
    ns.interests,
    ns.frequency,
    ns.subscribed_at
FROM contacts c
JOIN newsletter_subscriptions ns ON c.id = ns.contact_id
LEFT JOIN countries co ON c.country_code = co.code
WHERE ns.is_active = true;

-- Reservations with contact and product details
CREATE VIEW v_reservation_details AS
SELECT 
    r.id as reservation_id,
    r.status,
    r.created_at as reservation_date,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    c.location,
    c.country_code,
    co.name as country_name,
    p.name as product_name,
    r.solar_size_kw,
    r.battery_size_kwh,
    r.ev_integration,
    r.preferred_timeline,
    r.estimated_price,
    r.currency_code,
    r.deposit_paid
FROM system_reservations r
JOIN contacts c ON r.contact_id = c.id
JOIN product_types p ON r.product_type_code = p.code
LEFT JOIN countries co ON c.country_code = co.code;

-- Contact submissions with contact details
CREATE VIEW v_contact_inquiries AS
SELECT 
    cs.id as submission_id,
    cs.status,
    cs.project_type,
    cs.message,
    cs.created_at as inquiry_date,
    c.first_name,
    c.last_name,
    c.email,
    c.phone,
    c.location,
    c.country_code,
    co.name as country_name
FROM contact_submissions cs
JOIN contacts c ON cs.contact_id = c.id
LEFT JOIN countries co ON c.country_code = co.code;

-- Sample data for testing (optional)
-- Uncomment to insert sample data

/*
-- Sample contact
INSERT INTO contacts (first_name, last_name, email, phone, location, country_code, property_type, current_energy_bill)
VALUES ('John', 'Smith', 'john.smith@example.com', '+1-555-123-4567', '90210', 'US', 'single-family', 250.00);

-- Get the contact ID for sample reservation
-- INSERT INTO system_reservations (contact_id, product_type_code, solar_size_kw, battery_size_kwh, ev_integration, preferred_timeline, budget_range, estimated_price)
-- VALUES ((SELECT id FROM contacts WHERE email = 'john.smith@example.com'), 'h1', 8, 20, true, '3-6-months', 'moderate', 26500.00);

-- Sample newsletter subscription
-- INSERT INTO newsletter_subscriptions (contact_id, interests, frequency)
-- VALUES ((SELECT id FROM contacts WHERE email = 'john.smith@example.com'), ARRAY['residential', 'ev', 'incentives'], 'weekly');
*/

-- Grant permissions (adjust as needed for your application user)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO ceerion_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ceerion_app_user;