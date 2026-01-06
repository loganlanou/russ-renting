import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Check if Clerk is configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

export default async function DashboardPage() {
  let userName = 'Tenant';

  // Only try to get the user if Clerk is configured
  if (isClerkConfigured) {
    try {
      const { currentUser } = await import('@clerk/nextjs/server');
      const user = await currentUser();
      if (user?.firstName) {
        userName = user.firstName;
      }
    } catch {
      // Clerk not available or not authenticated
    }
  }

  return (
    <div className="min-h-[80vh] bg-[#f5f1ea] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-2 font-serif">
            Welcome, {userName}!
          </h1>
          <p className="text-[var(--muted)]">Manage your rental experience from your tenant portal</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pay Rent Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Pay Rent</h3>
            <p className="text-[var(--muted)] mb-4">Make a payment or set up automatic payments for your rent.</p>
            <Button variant="primary" size="sm">Make Payment</Button>
          </div>

          {/* Maintenance Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Maintenance Requests</h3>
            <p className="text-[var(--muted)] mb-4">Submit and track maintenance requests for your property.</p>
            <Button variant="primary" size="sm">Submit Request</Button>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Documents</h3>
            <p className="text-[var(--muted)] mb-4">Access your lease agreement and other important documents.</p>
            <Button variant="primary" size="sm">View Documents</Button>
          </div>

          {/* Payment History Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Payment History</h3>
            <p className="text-[var(--muted)] mb-4">View your payment history and download receipts.</p>
            <Button variant="primary" size="sm">View History</Button>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Contact Us</h3>
            <p className="text-[var(--muted)] mb-4">Get in touch with our property management team.</p>
            <Link href="/contact">
              <Button variant="primary" size="sm">Send Message</Button>
            </Link>
          </div>

          {/* Browse Properties Card */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--line)] feature-card">
            <div className="w-12 h-12 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Browse Properties</h3>
            <p className="text-[var(--muted)] mb-4">Looking to move? Browse our available properties.</p>
            <Link href="/properties">
              <Button variant="primary" size="sm">View Properties</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
