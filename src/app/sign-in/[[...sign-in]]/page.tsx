'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Check if Clerk is configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

// Conditionally import SignIn
let SignIn: React.ComponentType<{ appearance?: object }> | null = null;

if (isClerkConfigured) {
  try {
    const clerk = require('@clerk/nextjs');
    SignIn = clerk.SignIn;
  } catch {
    // Clerk not available
  }
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f5f1ea] py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-2 font-serif">Welcome Back</h1>
          <p className="text-[var(--muted)]">Sign in to access your tenant portal</p>
        </div>

        {isClerkConfigured && SignIn ? (
          <SignIn
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Authentication is not configured yet. To enable sign-in functionality, please add your Clerk API keys to <code className="bg-[#f5f1ea] px-2 py-1 rounded">.env.local</code>.
              </p>
            </div>
            <div className="space-y-4">
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
                Sign In (Coming Soon)
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-[var(--muted)]">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-[var(--brand)] hover:text-[var(--brand-dark)] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
