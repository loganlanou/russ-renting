'use client';

import { useState } from 'react';
import { Button } from './Button';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call - replace with actual newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('success');
    setEmail('');
    setFirstName('');

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f5f1ea] rounded-3xl p-8 md:p-12 border border-[var(--line)]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[var(--line)]">
              <svg className="w-8 h-8 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-4 font-serif">
              Get fresh listings first
            </h2>
            <p className="text-lg text-[var(--muted)] mb-8">
              Weekly updates on new rentals, flexible stays, and curated local tips for your move.
            </p>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700">
                Thanks for subscribing! We&apos;ll keep you updated on new properties.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full border border-[var(--line)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none transition-colors bg-white"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-full border border-[var(--line)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none transition-colors bg-white"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  className="whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}

            <p className="text-sm text-[var(--muted)] mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
