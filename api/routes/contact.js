import express from 'express';
import Joi from 'joi';
import { query, transaction } from '../config/database.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Validation schema for contact form
const contactSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  email: Joi.string().email().required(),
  projectType: Joi.string().valid(
    'residential', 'commercial', 'fleet', 'other'
  ).required(),
  message: Joi.string().min(10).max(2000).required(),
  location: Joi.string().max(200).allow(''),
  phone: Joi.string().max(50).allow('')
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.details[0].message
      });
    }

    const { name, email, projectType, message, location, phone } = value;
    
    // Parse name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Use transaction to ensure data consistency
    const result = await transaction(async (client) => {
      // Check if contact already exists
      const existingContact = await client.query(
        'SELECT id FROM contacts WHERE LOWER(email) = LOWER($1)',
        [email]
      );

      let contactId;
      
      if (existingContact.rows.length > 0) {
        // Update existing contact with new info
        contactId = existingContact.rows[0].id;
        await client.query(`
          UPDATE contacts SET 
            first_name = COALESCE(NULLIF($1, ''), first_name),
            last_name = COALESCE(NULLIF($2, ''), last_name),
            phone = COALESCE(NULLIF($3, ''), phone),
            location = COALESCE(NULLIF($4, ''), location),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $5
        `, [firstName, lastName, phone, location, contactId]);
      } else {
        // Create new contact
        const contactResult = await client.query(`
          INSERT INTO contacts (first_name, last_name, email, phone, location)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        `, [firstName, lastName, email, phone || null, location || null]);
        
        contactId = contactResult.rows[0].id;
      }

      // Create contact submission
      const submissionResult = await client.query(`
        INSERT INTO contact_submissions (contact_id, project_type, message)
        VALUES ($1, $2, $3)
        RETURNING id, created_at
      `, [contactId, projectType, message]);

      return {
        submissionId: submissionResult.rows[0].id,
        contactId: contactId,
        createdAt: submissionResult.rows[0].created_at
      };
    });

    // Send confirmation and notification emails (async)
    setImmediate(async () => {
      try {
        // Email to customer
        await sendEmail({
          to: email,
          subject: 'CEERION Energy - We received your message',
          template: 'contact_confirmation',
          data: {
            name: firstName,
            projectType: projectType,
            message: message,
            submissionId: result.submissionId
          }
        });

        // Email to support team
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'info@ceerionenergy.com',
          subject: `New Contact Form Submission - ${name}`,
          template: 'new_contact_notification',
          data: {
            name: name,
            email: email,
            phone: phone,
            location: location,
            projectType: projectType,
            message: message,
            submissionId: result.submissionId,
            createdAt: result.createdAt
          }
        });
      } catch (emailError) {
        console.error('Contact form email sending failed:', emailError);
      }
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        submissionId: result.submissionId,
        createdAt: result.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to submit contact form'
    });
  }
});

// GET /api/contact/submissions - Get all contact submissions (admin endpoint)
router.get('/submissions', async (req, res) => {
  try {
    const { status, projectType, limit = 50, offset = 0 } = req.query;

    let queryText = `
      SELECT 
        cs.id, cs.project_type, cs.message, cs.status, cs.created_at,
        c.first_name, c.last_name, c.email, c.phone, c.location, c.country_code
      FROM contact_submissions cs
      JOIN contacts c ON cs.contact_id = c.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      queryText += ` AND cs.status = $${paramCount}`;
      params.push(status);
    }

    if (projectType) {
      paramCount++;
      queryText += ` AND cs.project_type = $${paramCount}`;
      params.push(projectType);
    }

    queryText += ` ORDER BY cs.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, params);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM contact_submissions cs 
      WHERE 1=1
    `;
    
    const countParams = [];
    let countParamCount = 0;

    if (status) {
      countParamCount++;
      countQuery += ` AND cs.status = $${countParamCount}`;
      countParams.push(status);
    }

    if (projectType) {
      countParamCount++;
      countQuery += ` AND cs.project_type = $${countParamCount}`;
      countParams.push(projectType);
    }

    const countResult = await query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: {
        submissions: result.rows,
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: (parseInt(offset) + parseInt(limit)) < totalCount
        }
      }
    });

  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve contact submissions'
    });
  }
});

// PUT /api/contact/submissions/:id/status - Update submission status
router.put('/submissions/:id/status', async (req, res) => {
  try {
    const submissionId = req.params.id;
    const { status, notes } = req.body;

    const validStatuses = ['new', 'in-progress', 'responded', 'closed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid Status',
        message: 'Status must be one of: ' + validStatuses.join(', ')
      });
    }

    const result = await query(`
      UPDATE contact_submissions 
      SET status = $1, 
          responded_at = CASE WHEN $1 = 'responded' THEN CURRENT_TIMESTAMP ELSE responded_at END
      WHERE id = $2
      RETURNING *
    `, [status, submissionId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission status updated',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update submission status error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update submission status'
    });
  }
});

// GET /api/contact/stats - Get contact form statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        COUNT(*) as total_submissions,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new_submissions,
        COUNT(CASE WHEN status = 'in-progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded,
        COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed,
        COUNT(CASE WHEN project_type = 'residential' THEN 1 END) as residential,
        COUNT(CASE WHEN project_type = 'commercial' THEN 1 END) as commercial,
        COUNT(CASE WHEN project_type = 'fleet' THEN 1 END) as fleet,
        COUNT(CASE WHEN project_type = 'other' THEN 1 END) as other
      FROM contact_submissions
    `);

    const recentSubmissions = await query(`
      SELECT DATE_TRUNC('day', created_at) as date, COUNT(*) as submissions
      FROM contact_submissions
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date DESC
    `);

    res.json({
      success: true,
      data: {
        overview: stats.rows[0],
        recent_submissions: recentSubmissions.rows
      }
    });

  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve contact statistics'
    });
  }
});

export default router;