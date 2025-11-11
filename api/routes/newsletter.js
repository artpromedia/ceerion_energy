import express from 'express';
import Joi from 'joi';
import { query, transaction } from '../config/database.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Validation schema for newsletter signup
const newsletterSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().max(100).allow(''),
  location: Joi.string().max(200).allow(''),
  interests: Joi.array().items(
    Joi.string().valid(
      'residential', 'commercial', 'ev', 'technology', 
      'incentives', 'company'
    )
  ).default([]),
  frequency: Joi.string().valid(
    'weekly', 'monthly', 'quarterly', 'announcements'
  ).default('weekly')
});

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = newsletterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details[0].message
      });
    }

    const { email, firstName, location, interests, frequency } = value;

    // Use transaction to ensure data consistency
    const result = await transaction(async (client) => {
      // Check if contact already exists
      const existingContact = await client.query(
        'SELECT id FROM contacts WHERE LOWER(email) = LOWER($1)',
        [email]
      );

      let contactId;
      
      if (existingContact.rows.length > 0) {
        // Update existing contact with newsletter info
        contactId = existingContact.rows[0].id;
        
        if (firstName || location) {
          await client.query(`
            UPDATE contacts SET 
              first_name = COALESCE(NULLIF($1, ''), first_name),
              location = COALESCE(NULLIF($2, ''), location),
              newsletter_subscribed = true,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
          `, [firstName, location, contactId]);
        } else {
          await client.query(`
            UPDATE contacts SET 
              newsletter_subscribed = true,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
          `, [contactId]);
        }
      } else {
        // Create new contact
        const contactResult = await client.query(`
          INSERT INTO contacts (email, first_name, location, newsletter_subscribed)
          VALUES ($1, $2, $3, true)
          RETURNING id
        `, [email, firstName || '', location || '']);
        
        contactId = contactResult.rows[0].id;
      }

      // Check if newsletter subscription already exists
      const existingSubscription = await client.query(
        'SELECT id, is_active FROM newsletter_subscriptions WHERE contact_id = $1',
        [contactId]
      );

      if (existingSubscription.rows.length > 0) {
        // Update existing subscription
        await client.query(`
          UPDATE newsletter_subscriptions SET
            interests = $1,
            frequency = $2,
            is_active = true,
            subscribed_at = CASE WHEN NOT is_active THEN CURRENT_TIMESTAMP ELSE subscribed_at END,
            unsubscribed_at = NULL
          WHERE contact_id = $3
        `, [interests, frequency, contactId]);
      } else {
        // Create new subscription
        await client.query(`
          INSERT INTO newsletter_subscriptions (contact_id, interests, frequency)
          VALUES ($1, $2, $3)
        `, [contactId, interests, frequency]);
      }

      return { contactId, email, firstName };
    });

    // Send welcome email (async, don't wait for completion)
    setImmediate(async () => {
      try {
        await sendEmail({
          to: email,
          subject: 'Welcome to CEERION Energy Newsletter',
          template: 'newsletter_welcome',
          data: {
            firstName: firstName || 'Friend',
            interests: interests,
            frequency: frequency,
            unsubscribeUrl: `${process.env.API_BASE_URL}/api/newsletter/unsubscribe/${result.contactId}`
          }
        });
      } catch (emailError) {
        console.error('Welcome email failed:', emailError);
      }
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: email,
        interests: interests,
        frequency: frequency
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        error: 'Already Subscribed',
        message: 'This email is already subscribed to our newsletter'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to subscribe to newsletter'
    });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email is required'
      });
    }

    // Find contact and deactivate subscription
    const result = await query(`
      UPDATE newsletter_subscriptions 
      SET is_active = false, unsubscribed_at = CURRENT_TIMESTAMP
      FROM contacts 
      WHERE newsletter_subscriptions.contact_id = contacts.id 
      AND LOWER(contacts.email) = LOWER($1)
      RETURNING newsletter_subscriptions.id
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No active subscription found for this email'
      });
    }

    // Update contact newsletter status
    await query(`
      UPDATE contacts 
      SET newsletter_subscribed = false, updated_at = CURRENT_TIMESTAMP
      WHERE LOWER(email) = LOWER($1)
    `, [email]);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to unsubscribe from newsletter'
    });
  }
});

// GET /api/newsletter/unsubscribe/:contactId - Unsubscribe via link
router.get('/unsubscribe/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;

    // Find and deactivate subscription
    const result = await query(`
      UPDATE newsletter_subscriptions 
      SET is_active = false, unsubscribed_at = CURRENT_TIMESTAMP
      WHERE contact_id = $1 AND is_active = true
      RETURNING id
    `, [contactId]);

    if (result.rows.length === 0) {
      return res.status(404).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Subscription Not Found</h2>
            <p>No active subscription found for this link.</p>
          </body>
        </html>
      `);
    }

    // Update contact newsletter status
    await query(`
      UPDATE contacts 
      SET newsletter_subscribed = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [contactId]);

    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Successfully Unsubscribed</h2>
          <p>You have been unsubscribed from the CEERION Energy newsletter.</p>
          <p>We're sorry to see you go! If you change your mind, you can always resubscribe on our website.</p>
          <br>
          <a href="${process.env.FRONTEND_URL}" style="color: #007cba; text-decoration: none;">
            Visit CEERION Energy →
          </a>
        </body>
      </html>
    `);

  } catch (error) {
    console.error('Newsletter unsubscribe via link error:', error);
    res.status(500).send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>❌ Error</h2>
          <p>An error occurred while processing your unsubscribe request.</p>
        </body>
      </html>
    `);
  }
});

// GET /api/newsletter/stats - Get newsletter statistics (admin endpoint)
router.get('/stats', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        COUNT(*) as total_subscribers,
        COUNT(CASE WHEN is_active THEN 1 END) as active_subscribers,
        COUNT(CASE WHEN NOT is_active THEN 1 END) as unsubscribed,
        COUNT(CASE WHEN frequency = 'weekly' AND is_active THEN 1 END) as weekly,
        COUNT(CASE WHEN frequency = 'monthly' AND is_active THEN 1 END) as monthly,
        COUNT(CASE WHEN frequency = 'quarterly' AND is_active THEN 1 END) as quarterly,
        COUNT(CASE WHEN frequency = 'announcements' AND is_active THEN 1 END) as announcements_only
      FROM newsletter_subscriptions
    `);

    const interestStats = await query(`
      SELECT 
        unnest(interests) as interest,
        COUNT(*) as count
      FROM newsletter_subscriptions 
      WHERE is_active = true AND interests IS NOT NULL AND array_length(interests, 1) > 0
      GROUP BY interest
      ORDER BY count DESC
    `);

    const recentSignups = await query(`
      SELECT DATE_TRUNC('day', subscribed_at) as date, COUNT(*) as signups
      FROM newsletter_subscriptions
      WHERE subscribed_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE_TRUNC('day', subscribed_at)
      ORDER BY date DESC
    `);

    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        interests: interestStats.rows,
        recent_signups: recentSignups.rows
      }
    });

  } catch (error) {
    console.error('Newsletter stats error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve newsletter statistics'
    });
  }
});

export default router;