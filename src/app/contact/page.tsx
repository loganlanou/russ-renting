'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { properties } from '@/data/properties';

function ContactForm() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setFormData(prev => ({
          ...prev,
          propertyInterest: property.title,
          message: `I am interested in scheduling a viewing for ${property.title} at ${property.address}.`,
        }));
      }
    }
  }, [propertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
        <p className="text-slate-600 mb-6">
          We have received your message and will get back to you within 24 hours.
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
              message: '',
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Property Interest */}
        <div>
          <label htmlFor="propertyInterest" className="block text-sm font-medium text-slate-700 mb-1">
            Property of Interest
          </label>
          <select
            id="propertyInterest"
            name="propertyInterest"
            value={formData.propertyInterest}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
          >
            <option value="">Select a property (optional)</option>
            {properties.map(property => (
              <option key={property.id} value={property.title}>
                {property.title} - {property.address}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-slate-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
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
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-sm text-slate-500 text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[300px]">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-slate-200">
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8">
                Our team is here to help you find your perfect rental home. Reach out to us through any of the following methods.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Phone</h3>
                    <p className="text-slate-600">(555) 123-4567</p>
                    <p className="text-sm text-slate-500">Mon-Fri 9am-6pm, Sat 10am-4pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">info@russrentals.com</p>
                    <p className="text-sm text-slate-500">We respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Office</h3>
                    <p className="text-slate-600">123 Business Ave</p>
                    <p className="text-slate-600">Springfield, IL 62701</p>
                  </div>
                </div>

                {/* Emergency */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Emergency Line</h3>
                    <p className="text-slate-600">(555) 123-4568</p>
                    <p className="text-sm text-slate-500">24/7 for current tenants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                <Suspense fallback={<div className="py-12 text-center text-slate-500">Loading form...</div>}>
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
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Visit Our Office</h2>
            <p className="text-slate-600">
              Stop by during business hours to speak with our team in person.
            </p>
          </div>
          <div className="h-96 bg-slate-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-slate-500">Interactive map coming soon</p>
              <p className="text-slate-400 text-sm mt-2">123 Business Ave, Springfield, IL 62701</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-600">
              Quick answers to common questions about renting with us.
            </p>
          </div>
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-slate-800 mb-2">
                What is the application process?
              </h3>
              <p className="text-slate-600">
                Our application process is simple. Fill out an online application, provide proof of income, and consent to a background check. We typically process applications within 24-48 hours.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-slate-800 mb-2">
                What is the security deposit requirement?
              </h3>
              <p className="text-slate-600">
                Security deposits are typically equal to one month&apos;s rent. The exact amount will be specified in your lease agreement. Deposits are fully refundable upon move-out, minus any damages beyond normal wear and tear.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-slate-800 mb-2">
                Do you allow pets?
              </h3>
              <p className="text-slate-600">
                Pet policies vary by property. Many of our properties are pet-friendly with a pet deposit and monthly pet rent. Please check individual property listings or contact us for specific pet policies.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-slate-800 mb-2">
                How do I submit a maintenance request?
              </h3>
              <p className="text-slate-600">
                Current tenants can submit maintenance requests through our online portal, by phone, or by email. For emergencies, please use our 24/7 emergency line. We aim to respond to non-emergency requests within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
