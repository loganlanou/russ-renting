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
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to access your tenant portal</p>
        </div>

        {isClerkConfigured && SignIn ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg border border-slate-200",
                headerTitle: "text-slate-800",
                headerSubtitle: "text-slate-600",
                formButtonPrimary: "bg-slate-800 hover:bg-slate-700",
                formFieldInput: "border-slate-300 focus:border-amber-500 focus:ring-amber-500",
                footerActionLink: "text-amber-600 hover:text-amber-700",
              }
            }}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-slate-600 mb-4">
                Authentication is not configured yet. To enable sign-in functionality, please add your Clerk API keys to <code className="bg-slate-100 px-2 py-1 rounded">.env.local</code>.
              </p>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-400 cursor-not-allowed"
              />
              <input
                type="password"
                placeholder="Password"
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-400 cursor-not-allowed"
              />
              <Button variant="primary" className="w-full" disabled>
                Sign In (Coming Soon)
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-amber-600 hover:text-amber-700 font-medium">
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
