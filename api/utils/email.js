import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
};

// Email templates
const templates = {
  reservation_confirmation: (data) => ({
    subject: 'CEERION Energy - Reservation Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #1a1a1a; margin: 0;">🎉 Reservation Confirmed!</h1>
        </div>
        
        <p>Dear ${data.name},</p>
        
        <p>Thank you for reserving your CEERION Energy system! We're excited to help you achieve energy independence.</p>
        
        <div style="background: #e8eaed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1a1a1a; margin-top: 0;">Your Reservation Details</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>System:</strong> ${data.productName}</li>
            <li><strong>Solar Capacity:</strong> ${data.solarSize} kW</li>
            <li><strong>Battery Storage:</strong> ${data.batterySize} kWh</li>
            <li><strong>Estimated Price:</strong> $${data.estimatedPrice.toLocaleString()}*</li>
            <li><strong>Reservation ID:</strong> ${data.reservationId}</li>
          </ul>
          <p style="font-size: 0.9em; color: #5f6368; margin-bottom: 0;">
            *Price before incentives. Final pricing subject to site assessment.
          </p>
        </div>
        
        <h3>What's Next?</h3>
        <ol>
          <li><strong>Site Assessment:</strong> Our team will contact you within 48 hours to schedule a detailed site assessment.</li>
          <li><strong>Custom Design:</strong> We'll create a personalized system design for your property.</li>
          <li><strong>Proposal:</strong> You'll receive a detailed proposal with final pricing and financing options.</li>
          <li><strong>Installation:</strong> Upon approval, we'll schedule professional installation.</li>
        </ol>
        
        <p>Questions? Reply to this email or call us at <a href="tel:+18885551234">1-888-555-CEERION</a>.</p>
        
        <p>Best regards,<br>
        The CEERION Energy Team</p>
        
        <div style="border-top: 1px solid #dadce0; padding-top: 20px; margin-top: 30px; font-size: 0.9em; color: #5f6368;">
          <p>CEERION Energy - Own Your Power</p>
        </div>
      </div>
    `
  }),

  new_reservation_notification: (data) => ({
    subject: `New System Reservation - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a;">🔔 New System Reservation</h1>
        
        <div style="background: #e8eaed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Customer Information</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>Location:</strong> ${data.location}</li>
            <li><strong>Country:</strong> ${data.country}</li>
            <li><strong>Property Type:</strong> ${data.propertyType}</li>
          </ul>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">System Configuration</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Product:</strong> ${data.productType === 'h1' ? 'H1 Home Essentials' : 'B3 Microgrid Campus'}</li>
            <li><strong>Solar:</strong> ${data.solarSize} kW</li>
            <li><strong>Battery:</strong> ${data.batterySize} kWh</li>
            <li><strong>EV Integration:</strong> ${data.evIntegration ? 'Yes' : 'No'}</li>
            <li><strong>Timeline:</strong> ${data.timeline.replace('-', ' ')}</li>
            <li><strong>Budget Range:</strong> ${data.budget.replace('-', ' ')}</li>
            <li><strong>Estimated Price:</strong> $${data.estimatedPrice.toLocaleString()}</li>
          </ul>
        </div>
        
        ${data.specialRequirements ? `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Special Requirements</h3>
            <p>${data.specialRequirements}</p>
          </div>
        ` : ''}
        
        <p><strong>Reservation ID:</strong> ${data.reservationId}</p>
        <p><strong>Submitted:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
        
        <p>Please follow up within 48 hours.</p>
      </div>
    `
  }),

  newsletter_welcome: (data) => ({
    subject: 'Welcome to CEERION Energy Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #1a1a1a; margin: 0;">🌟 Welcome to CEERION Energy!</h1>
        </div>
        
        <p>Hi ${data.firstName},</p>
        
        <p>Thank you for joining the CEERION Energy newsletter! You're now part of a community dedicated to clean energy independence.</p>
        
        <h3>What You'll Receive:</h3>
        <ul>
          <li>🔋 Latest clean energy technology insights</li>
          <li>💰 Updates on incentives and financing options</li>
          <li>⚡ CEERION Energy product announcements</li>
          <li>📊 Industry trends and market analysis</li>
          <li>🎯 Exclusive access to webinars and events</li>
        </ul>
        
        <p>We'll send you updates <strong>${data.frequency}</strong> based on your preferences.</p>
        
        ${data.interests.length > 0 ? `
          <p>We'll focus on topics you're interested in:</p>
          <ul>
            ${data.interests.map(interest => `<li>${interest.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>`).join('')}
          </ul>
        ` : ''}
        
        <p>Stay powered up!</p>
        
        <p>Best regards,<br>
        The CEERION Energy Team</p>
        
        <div style="border-top: 1px solid #dadce0; padding-top: 20px; margin-top: 30px; font-size: 0.9em; color: #5f6368;">
          <p><a href="${data.unsubscribeUrl}" style="color: #5f6368;">Unsubscribe</a> | CEERION Energy</p>
        </div>
      </div>
    `
  }),

  contact_confirmation: (data) => ({
    subject: 'CEERION Energy - We received your message',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #1a1a1a; margin: 0;">📧 Message Received</h1>
        </div>
        
        <p>Hi ${data.name},</p>
        
        <p>Thank you for contacting CEERION Energy! We've received your message and will respond within 24 hours.</p>
        
        <div style="background: #e8eaed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Your Message</h3>
          <p><strong>Project Type:</strong> ${data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1)}</p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="font-size: 0.9em; color: #5f6368; margin-bottom: 0;">
            Reference ID: ${data.submissionId}
          </p>
        </div>
        
        <p>A CEERION Energy specialist will review your inquiry and get back to you soon. In the meantime, feel free to explore our <a href="${process.env.FRONTEND_URL}/products">product pages</a> or <a href="${process.env.FRONTEND_URL}/configurator">system configurator</a>.</p>
        
        <p>Best regards,<br>
        The CEERION Energy Team</p>
        
        <div style="border-top: 1px solid #dadce0; padding-top: 20px; margin-top: 30px; font-size: 0.9em; color: #5f6368;">
          <p>CEERION Energy - Own Your Power</p>
        </div>
      </div>
    `
  }),

  new_contact_notification: (data) => ({
    subject: `New Contact Form Submission - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a1a;">📋 New Contact Form Submission</h1>
        
        <div style="background: #e8eaed; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Contact Information</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ''}
            ${data.location ? `<li><strong>Location:</strong> ${data.location}</li>` : ''}
            <li><strong>Project Type:</strong> ${data.projectType.charAt(0).toUpperCase() + data.projectType.slice(1)}</li>
          </ul>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Message</h2>
          <div style="background: white; padding: 15px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        
        <p><strong>Submission ID:</strong> ${data.submissionId}</p>
        <p><strong>Submitted:</strong> ${new Date(data.createdAt).toLocaleString()}</p>
        
        <p>Please respond within 24 hours.</p>
      </div>
    `
  })
};

// Send email function
export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('Email not configured - SMTP credentials missing');
      return { success: false, error: 'Email not configured' };
    }

    const transporter = createTransporter();
    
    // Get template
    const emailTemplate = templates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    const { subject: templateSubject, html } = emailTemplate(data);
    
    const mailOptions = {
      from: `"CEERION Energy" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject || templateSubject,
      html: html
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      to: to,
      subject: subject || templateSubject,
      messageId: result.messageId
    });
    
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn('⚠️ Email not configured - SMTP credentials missing');
      return false;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;

  } catch (error) {
    console.error('❌ Email configuration test failed:', error.message);
    return false;
  }
};

export default { sendEmail, testEmailConfig };