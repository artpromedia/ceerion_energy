import express from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { query, transaction } from '../config/database.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Validation schema for reservation
const reservationSchema = Joi.object({
  // Personal Information
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(50).required(),
  
  // Location
  location: Joi.string().min(1).max(200).required(),
  country: Joi.string().min(2).max(3).required(),
  propertyType: Joi.string().valid(
    'single-family', 'townhouse', 'condo', 'commercial', 
    'multi-family', 'farm', 'other'
  ).required(),
  
  // System Configuration
  productType: Joi.string().valid('h1', 'b3').required(),
  solarSize: Joi.number().integer().min(4).max(50).required(),
  batterySize: Joi.number().integer().min(10).max(100).required(),
  evIntegration: Joi.boolean().default(false),
  
  // Timeline & Preferences
  timeline: Joi.string().valid(
    'asap', '3-months', '3-6-months', '6-12-months', 'flexible'
  ).required(),
  budget: Joi.string().valid(
    'no-preference', 'budget-conscious', 'moderate', 'premium'
  ).default('no-preference'),
  
  // Additional Information
  currentEnergyBill: Joi.number().min(0).max(10000).allow('', null),
  specialRequirements: Joi.string().max(2000).allow(''),
  
  // Communication
  preferredContact: Joi.string().valid('email', 'phone', 'text', 'any').default('email'),
  newsletter: Joi.boolean().default(false),
  
  // Terms
  termsAccepted: Joi.boolean().valid(true).required()
});

// POST /api/reservations - Create new reservation
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = reservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details[0].message
      });
    }

    const reservationData = value;

    // Calculate estimated price
    const productQuery = await query(
      'SELECT base_price, solar_price_per_kw, battery_price_per_kwh FROM product_types WHERE code = $1',
      [reservationData.productType]
    );

    if (productQuery.rows.length === 0) {
      return res.status(400).json({
        error: 'Invalid Product',
        message: 'Product type not found'
      });
    }

    const product = productQuery.rows[0];
    const estimatedPrice = 
      parseFloat(product.base_price) + 
      (reservationData.solarSize * parseFloat(product.solar_price_per_kw)) +
      (reservationData.batterySize * parseFloat(product.battery_price_per_kwh));

    // Use transaction to ensure data consistency
    const result = await transaction(async (client) => {
      // Check if contact already exists
      const existingContact = await client.query(
        'SELECT id FROM contacts WHERE LOWER(email) = LOWER($1)',
        [reservationData.email]
      );

      let contactId;
      
      if (existingContact.rows.length > 0) {
        // Update existing contact
        contactId = existingContact.rows[0].id;
        await client.query(`
          UPDATE contacts SET 
            first_name = $1, last_name = $2, phone = $3, 
            location = $4, country_code = $5, property_type = $6,
            current_energy_bill = $7, preferred_contact_method = $8,
            newsletter_subscribed = $9, updated_at = CURRENT_TIMESTAMP
          WHERE id = $10
        `, [
          reservationData.firstName, reservationData.lastName, reservationData.phone,
          reservationData.location, reservationData.country, reservationData.propertyType,
          reservationData.currentEnergyBill || null, reservationData.preferredContact,
          reservationData.newsletter, contactId
        ]);
      } else {
        // Create new contact
        const contactResult = await client.query(`
          INSERT INTO contacts (
            first_name, last_name, email, phone, location, country_code,
            property_type, current_energy_bill, preferred_contact_method, newsletter_subscribed
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING id
        `, [
          reservationData.firstName, reservationData.lastName, reservationData.email,
          reservationData.phone, reservationData.location, reservationData.country,
          reservationData.propertyType, reservationData.currentEnergyBill || null,
          reservationData.preferredContact, reservationData.newsletter
        ]);
        
        contactId = contactResult.rows[0].id;
      }

      // Create reservation
      const reservationResult = await client.query(`
        INSERT INTO system_reservations (
          contact_id, product_type_code, solar_size_kw, battery_size_kwh,
          ev_integration, preferred_timeline, budget_range, special_requirements,
          estimated_price, currency_code
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id, created_at
      `, [
        contactId, reservationData.productType, reservationData.solarSize,
        reservationData.batterySize, reservationData.evIntegration,
        reservationData.timeline, reservationData.budget,
        reservationData.specialRequirements, estimatedPrice, 'USD'
      ]);

      // If newsletter subscription requested, create it
      if (reservationData.newsletter) {
        await client.query(`
          INSERT INTO newsletter_subscriptions (contact_id, interests, frequency)
          VALUES ($1, $2, $3)
          ON CONFLICT (contact_id) DO UPDATE SET
            is_active = true,
            interests = EXCLUDED.interests,
            frequency = EXCLUDED.frequency
        `, [contactId, ['residential', 'incentives'], 'weekly']);
      }

      return {
        reservationId: reservationResult.rows[0].id,
        contactId: contactId,
        createdAt: reservationResult.rows[0].created_at,
        estimatedPrice: estimatedPrice
      };
    });

    // Send confirmation emails (async, don't wait for completion)
    setImmediate(async () => {
      try {
        // Email to customer
        await sendEmail({
          to: reservationData.email,
          subject: 'CEERION Energy - Reservation Confirmation',
          template: 'reservation_confirmation',
          data: {
            name: `${reservationData.firstName} ${reservationData.lastName}`,
            productName: reservationData.productType === 'h1' ? 'H1 Home Essentials' : 'B3 Microgrid Campus',
            solarSize: reservationData.solarSize,
            batterySize: reservationData.batterySize,
            estimatedPrice: estimatedPrice,
            reservationId: result.reservationId
          }
        });

        // Email to sales team
        await sendEmail({
          to: process.env.SALES_EMAIL || 'sales@ceerionenergy.com',
          subject: `New System Reservation - ${reservationData.firstName} ${reservationData.lastName}`,
          template: 'new_reservation_notification',
          data: {
            ...reservationData,
            estimatedPrice: estimatedPrice,
            reservationId: result.reservationId,
            createdAt: result.createdAt
          }
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: {
        reservationId: result.reservationId,
        estimatedPrice: estimatedPrice,
        createdAt: result.createdAt
      }
    });

  } catch (error) {
    console.error('Reservation creation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create reservation'
    });
  }
});

// GET /api/reservations/:id - Get reservation details (for follow-up)
router.get('/:id', async (req, res) => {
  try {
    const reservationId = req.params.id;

    const result = await query(`
      SELECT r.*, c.first_name, c.last_name, c.email, c.phone, c.location,
             p.name as product_name
      FROM system_reservations r
      JOIN contacts c ON r.contact_id = c.id
      JOIN product_types p ON r.product_type_code = p.code
      WHERE r.id = $1
    `, [reservationId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve reservation'
    });
  }
});

// PUT /api/reservations/:id/status - Update reservation status (admin endpoint)
router.put('/:id/status', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const { status, notes } = req.body;

    const validStatuses = [
      'pending', 'contacted', 'site-assessment-scheduled', 
      'site-assessment-completed', 'proposal-sent', 'contract-signed',
      'installation-scheduled', 'installed', 'cancelled', 'on-hold'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid Status',
        message: 'Status must be one of: ' + validStatuses.join(', ')
      });
    }

    const result = await query(`
      UPDATE system_reservations 
      SET status = $1, internal_notes = COALESCE(internal_notes, '') || $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `, [status, notes ? `\\n${new Date().toISOString()}: ${notes}` : '', reservationId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      message: 'Reservation status updated',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update reservation status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update reservation status'
    });
  }
});

export default router;