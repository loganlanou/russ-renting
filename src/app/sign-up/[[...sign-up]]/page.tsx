'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Check if Clerk is configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

// Conditionally import SignUp
let SignUp: React.ComponentType<{ appearance?: object }> | null = null;

if (isClerkConfigured) {
  try {
    const clerk = require('@clerk/nextjs');
    SignUp = clerk.SignUp;
  } catch {
    // Clerk not available
  }
}

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f5f1ea] py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-2 font-serif">Create an Account</h1>
          <p className="text-[var(--muted)]">Join Russ Rentals to manage your rental experience</p>
        </div>

        {isClerkConfigured && SignUp ? (
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg border border-[var(--line)] rounded-3xl",
                headerTitle: "text-[var(--foreground)]",
                headerSubtitle: "text-[var(--muted)]",
                formButtonPrimary: "bg-[var(--brand)] hover:bg-[var(--brand-dark)]",
                formFieldInput: "border-[var(--line)] focus:border-[var(--brand)] focus:ring-[var(--brand)]",
                footerActionLink: "text-[var(--brand)] hover:text-[var(--brand-dark)]",
              }
            }}
          />
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-[var(--line)] p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Authentication is not configured yet. To enable sign-up functionality, please add your Clerk API keys to <code className="bg-[#f5f1ea] px-2 py-1 rounded">.env.local</code>.
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                disabled
                className="w-full px-4 py-3 rounded-full border border-[var(--line)] bg-[#f5f1ea] text-[var(--muted)] cursor-not-allowed"
              />
              <input
                type="email"
                placeholder="Email address"
                disabled
                className="w-full px-4 py-3 rounded-full border border-[var(--line)] bg-[#f5f1ea] text-[var(--muted)] cursor-not-allowed"
              />
              <input
                type="password"
                placeholder="Password"
                disabled
                className="w-full px-4 py-3 rounded-full border border-[var(--line)] bg-[#f5f1ea] text-[var(--muted)] cursor-not-allowed"
              />
              <Button variant="primary" className="w-full" disabled>
                Create Account (Coming Soon)
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-[var(--muted)]">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-[var(--brand)] hover:text-[var(--brand-dark)] font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
