import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Only initialize Resend if API key is present (for build time)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 503 }
      );
    }

    const data = await request.json();
    const { name, email, phone, propertyInterest, inquiryType, message, preferredDate, preferredTime } = data;

    // Build email content
    let emailHtml = `
      <h2>New Inquiry from Russ Rentals Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${inquiryType ? `<p><strong>Inquiry Type:</strong> ${inquiryType}</p>` : ''}
      ${propertyInterest ? `<p><strong>Property Interest:</strong> ${propertyInterest}</p>` : ''}
      ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
      ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email notification
    await resend.emails.send({
      from: 'Russ Rentals <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@russrentals.com',
      subject: `New Inquiry: ${inquiryType || 'General'} - ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Russ Rentals <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Russ Rentals',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        ${inquiryType === 'Schedule Viewing' ? `<p>We'll confirm your viewing request for ${preferredDate} at ${preferredTime} shortly.</p>` : ''}
        <p>Best regards,<br>The Russ Rentals Team</p>
        <p><small>123 Main Street, Springfield, IL 62701<br>(555) 123-4567</small></p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
