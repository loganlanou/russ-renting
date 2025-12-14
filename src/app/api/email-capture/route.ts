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
    const { email, firstName } = data;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Russ Rentals <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Russ Rentals!',
      html: `
        <h2>Welcome to Russ Rentals${firstName ? `, ${firstName}` : ''}!</h2>
        <p>Thank you for subscribing to our newsletter. You'll be the first to know about:</p>
        <ul>
          <li>New property listings</li>
          <li>Special promotions</li>
          <li>Rental tips and advice</li>
        </ul>
        <p>Start browsing our available properties today:</p>
        <p><a href="https://russrentals.com/properties" style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Properties</a></p>
        <p>Best regards,<br>The Russ Rentals Team</p>
        <p><small>123 Main Street, Springfield, IL 62701<br>(555) 123-4567</small></p>
        <p><small>You can unsubscribe at any time by clicking <a href="#">here</a>.</small></p>
      `,
    });

    // Notify admin of new subscriber
    await resend.emails.send({
      from: 'Russ Rentals <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'contact@russrentals.com',
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${firstName ? `<p><strong>Name:</strong> ${firstName}</p>` : ''}
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
