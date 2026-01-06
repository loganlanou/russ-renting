'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

// Check if Clerk is configured (client-side check)
const isClerkConfigured = typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

// Conditionally import Clerk components
let SignedIn: React.ComponentType<{ children: React.ReactNode }> | null = null;
let SignedOut: React.ComponentType<{ children: React.ReactNode }> | null = null;
let UserButton: React.ComponentType<{ afterSignOutUrl?: string; appearance?: object }> | null = null;

if (isClerkConfigured) {
  try {
    const clerk = require('@clerk/nextjs');
    SignedIn = clerk.SignedIn;
    SignedOut = clerk.SignedOut;
    UserButton = clerk.UserButton;
  } catch {
    // Clerk not available
  }
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Render auth section based on Clerk availability
  const renderAuthSection = () => {
    if (isClerkConfigured && SignedIn && SignedOut && UserButton) {
      return (
        <div className="flex items-center space-x-4 ml-4 border-l border-[var(--line)] pl-4">
          <SignedOut>
            <Link href="/sign-in" className="text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors">
              Tenant Portal
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </SignedIn>
        </div>
      );
    }

    // Fallback when Clerk is not configured
    return (
        <div className="flex items-center space-x-4 ml-4 border-l border-[var(--line)] pl-4">
        <Link href="/sign-in" className="text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors">
          Sign In
        </Link>
        <Link href="/sign-up">
          <Button variant="primary" size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  const renderMobileAuthSection = () => {
    if (isClerkConfigured && SignedIn && SignedOut && UserButton) {
      return (
        <div className="border-t border-[var(--line)] pt-4 space-y-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="block text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="block text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tenant Portal
            </Link>
            <div className="flex items-center space-x-2">
              <UserButton afterSignOutUrl="/" />
              <span className="text-[var(--muted)]">My Account</span>
            </div>
          </SignedIn>
        </div>
      );
    }

    // Fallback when Clerk is not configured
    return (
      <div className="border-t border-[var(--line)] pt-4 space-y-4">
        <Link
          href="/sign-in"
          className="block text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign In
        </Link>
        <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="primary" className="w-full">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <header className="bg-[#f5f1ea]/90 backdrop-blur-xl border-b border-[var(--line)] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[var(--brand)] rounded-2xl flex items-center justify-center shadow-[0_10px_25px_-12px_rgba(15,76,92,0.7)]">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-[var(--foreground)] tracking-tight font-serif">
                Russ Rentals
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors nav-link"
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Section */}
            {renderAuthSection()}

            <Link href="/contact">
              <Button variant="secondary">Schedule a Tour</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--muted)] hover:text-[var(--foreground)] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[var(--muted)] hover:text-[var(--foreground)] font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {renderMobileAuthSection()}

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Schedule a Tour
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
