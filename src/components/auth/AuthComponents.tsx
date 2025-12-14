'use client';

import { ReactNode } from 'react';

// Check if Clerk is configured
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Conditional imports - only use Clerk if configured
let SignedIn: React.ComponentType<{ children: ReactNode }>;
let SignedOut: React.ComponentType<{ children: ReactNode }>;
let UserButton: React.ComponentType<{ afterSignOutUrl?: string; appearance?: object }>;
let SignInButton: React.ComponentType<{ mode?: string; children: ReactNode }>;
let SignUpButton: React.ComponentType<{ mode?: string; children: ReactNode }>;

if (isClerkConfigured) {
  // Dynamic import of Clerk components
  const clerk = require('@clerk/nextjs');
  SignedIn = clerk.SignedIn;
  SignedOut = clerk.SignedOut;
  UserButton = clerk.UserButton;
  SignInButton = clerk.SignInButton;
  SignUpButton = clerk.SignUpButton;
} else {
  // Fallback components when Clerk is not configured
  SignedIn = ({ children }: { children: ReactNode }) => null;
  SignedOut = ({ children }: { children: ReactNode }) => <>{children}</>;
  UserButton = () => null;
  SignInButton = ({ children }: { children: ReactNode }) => <>{children}</>;
  SignUpButton = ({ children }: { children: ReactNode }) => <>{children}</>;
}

export { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, isClerkConfigured };
