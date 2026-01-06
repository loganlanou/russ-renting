'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { properties } from '@/data/properties';
import { formatPrice } from '@/lib/utils';

function ContactForm() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property');
  const action = searchParams.get('action');

  const selectedProperty = propertyId ? properties.find(p => p.id === propertyId) : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    inquiryType: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProperty) {
      let messageText = '';
      let inquiryType = 'general';

      if (action === 'viewing') {
        messageText = `I would like to schedule a viewing for ${selectedProperty.title} at ${selectedProperty.address}. Please let me know your available times.`;
        inquiryType = 'viewing';
      } else if (action === 'apply') {
        messageText = `I am interested in applying for ${selectedProperty.title} at ${selectedProperty.address}. Please send me the application information.`;
        inquiryType = 'application';
      } else {
        messageText = `I have a question about ${selectedProperty.title} at ${selectedProperty.address}.`;
        inquiryType = 'general';
      }

      setFormData(prev => ({
        ...prev,
        propertyInterest: selectedProperty.title,
        message: messageText,
        inquiryType: inquiryType,
      }));
    }
  }, [selectedProperty, action]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build email body
    const inquiryTypeLabel = formData.inquiryType === 'viewing' ? 'Schedule Viewing' :
                             formData.inquiryType === 'application' ? 'Apply for Property' :
                             'General Inquiry';

    let emailBody = `Name: ${formData.name}\n`;
    emailBody += `Email: ${formData.email}\n`;
    emailBody += `Phone: ${formData.phone}\n`;
    emailBody += `Inquiry Type: ${inquiryTypeLabel}\n`;
    if (formData.propertyInterest) {
      emailBody += `Property Interest: ${formData.propertyInterest}\n`;
    }
    if (formData.preferredDate) {
      emailBody += `Preferred Date: ${formData.preferredDate}\n`;
    }
    if (formData.preferredTime) {
      emailBody += `Preferred Time: ${formData.preferredTime}\n`;
    }
    emailBody += `\nMessage:\n${formData.message}`;

    const subject = encodeURIComponent(`${inquiryTypeLabel} - ${formData.name}`);
    const body = encodeURIComponent(emailBody);

    // Open mailto link
    window.location.href = `mailto:info@russrentals.com?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2 font-serif">
          {formData.inquiryType === 'viewing' ? 'Viewing Request Received!' :
           formData.inquiryType === 'application' ? 'Application Request Received!' :
           'Thank You!'}
        </h3>
        <p className="text-[var(--muted)] mb-6">
          {formData.inquiryType === 'viewing'
            ? 'We will contact you within 24 hours to confirm your viewing appointment.'
            : formData.inquiryType === 'application'
            ? 'We will send you the application materials within 24 hours.'
            : 'We have received your message and will get back to you within 24 hours.'}
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              propertyInterest: '',
              preferredDate: '',
              preferredTime: '',
              message: '',
              inquiryType: 'general',
            });
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selected Property Card */}
      {selectedProperty && (
        <div className="bg-[#f5f1ea] border border-[var(--line)] rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={selectedProperty.images[0].url}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--foreground)] truncate">{selectedProperty.title}</h3>
              <p className="text-sm text-[var(--muted)] truncate">{selectedProperty.address}</p>
              <p className="text-[var(--accent-strong)] font-semibold">{formatPrice(selectedProperty.price)}/month</p>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Type */}
      <div>
        <label className="block text-sm font-medium text-[var(--muted)] mb-2">
          What can we help you with?
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, inquiryType: 'viewing' }))}
            className={`p-3 border rounded-lg text-center transition-colors ${
              formData.inquiryType === 'viewing'
                ? 'border-[var(--brand)] bg-white text-[var(--brand)]'
                : 'border-[var(--line)] hover:border-[var(--brand)]'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Schedule Viewing</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, inquiryType: 'application' }))}
            className={`p-3 border rounded-lg text-center transition-colors ${
              formData.inquiryType === 'application'
                ? 'border-[var(--brand)] bg-white text-[var(--brand)]'
                : 'border-[var(--line)] hover:border-[var(--brand)]'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Apply Now</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, inquiryType: 'general' }))}
            className={`p-3 border rounded-lg text-center transition-colors ${
              formData.inquiryType === 'general'
                ? 'border-[var(--brand)] bg-white text-[var(--brand)]'
                : 'border-[var(--line)] hover:border-[var(--brand)]'
            }`}
          >
            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Ask Question</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Property Interest */}
        <div>
          <label htmlFor="propertyInterest" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Property of Interest
          </label>
          <select
            id="propertyInterest"
            name="propertyInterest"
            value={formData.propertyInterest}
            onChange={handleChange}
            className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
          >
            <option value="">Select a property (optional)</option>
            {properties.map(property => (
              <option key={property.id} value={property.title}>
                {property.title} - {formatPrice(property.price)}/mo
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Viewing Schedule Fields */}
      {formData.inquiryType === 'viewing' && (
        <div className="grid md:grid-cols-2 gap-6 p-4 bg-[#f5f1ea] rounded-2xl border border-[var(--line)]">
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-[var(--muted)] mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-[var(--muted)] mb-1">
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full border border-[var(--line)] rounded-full px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors"
            >
              <option value="">Select a time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--muted)] mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-[var(--line)] rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] transition-colors resize-none"
          placeholder="Tell us how we can help you..."
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' :
         formData.inquiryType === 'viewing' ? 'Request Viewing' :
         formData.inquiryType === 'application' ? 'Request Application' :
         'Send Message'}
      </Button>

      <p className="text-sm text-[var(--muted)] text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 font-serif">
              Contact Us
            </h1>
            <p className="text-lg text-white/80">
              Have questions? We would love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 font-serif">Get in Touch</h2>
              <p className="text-[var(--muted)] mb-8">
                Our team is here to help you find your perfect rental home. Reach out to us through any of the following methods.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 border border-[var(--line)]">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Phone</h3>
                    <p className="text-[var(--muted)]">(555) 123-4567</p>
                    <p className="text-sm text-[var(--muted)]">Mon-Fri 9am-6pm, Sat 10am-4pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 border border-[var(--line)]">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Email</h3>
                    <p className="text-[var(--muted)]">info@russrentals.com</p>
                    <p className="text-sm text-[var(--muted)]">We respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 border border-[var(--line)]">
                    <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Office</h3>
                    <p className="text-[var(--muted)]">123 Business Ave</p>
                    <p className="text-[var(--muted)]">Springfield, IL 62701</p>
                  </div>
                </div>

                {/* Emergency */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Emergency Line</h3>
                    <p className="text-[var(--muted)]">(555) 123-4568</p>
                    <p className="text-sm text-[var(--muted)]">24/7 for current tenants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-[var(--line)] p-8">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 font-serif">Send Us a Message</h2>
                <Suspense fallback={<div className="py-12 text-center text-[var(--muted)]">Loading form...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2 font-serif">Visit Our Office</h2>
            <p className="text-[var(--muted)]">
              Stop by during business hours to speak with our team in person.
            </p>
          </div>
          <div className="h-96 bg-[#efe8dd] rounded-3xl flex items-center justify-center border border-[var(--line)]">
            <div className="text-center">
              <svg className="w-16 h-16 text-[var(--muted)] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-[var(--muted)]">Interactive map coming soon</p>
              <p className="text-[var(--muted)] text-sm mt-2">123 Business Ave, Springfield, IL 62701</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f5f1ea]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2 font-serif">Frequently Asked Questions</h2>
            <p className="text-[var(--muted)]">
              Quick answers to common questions about renting with us.
            </p>
          </div>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                What is the application process?
              </h3>
              <p className="text-[var(--muted)]">
                Our application process is simple. Fill out an online application, provide proof of income, and consent to a background check. We typically process applications within 24-48 hours.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                What is the security deposit requirement?
              </h3>
              <p className="text-[var(--muted)]">
                Security deposits are typically equal to one month&apos;s rent. The exact amount will be specified in your lease agreement. Deposits are fully refundable upon move-out, minus any damages beyond normal wear and tear.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Do you allow pets?
              </h3>
              <p className="text-[var(--muted)]">
                Pet policies vary by property. Many of our properties are pet-friendly with a pet deposit and monthly pet rent. Please check individual property listings or contact us for specific pet policies.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">
                How do I submit a maintenance request?
              </h3>
              <p className="text-[var(--muted)]">
                Current tenants can submit maintenance requests through our online portal, by phone, or by email. For emergencies, please use our 24/7 emergency line. We aim to respond to non-emergency requests within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
