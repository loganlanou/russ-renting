import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Check if Clerk is properly configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

// Conditionally import ClerkProvider to avoid bundling server actions in static export
let ClerkProvider: React.ComponentType<{ children: React.ReactNode }> | null = null;
if (isClerkConfigured) {
  try {
    const clerk = require('@clerk/nextjs');
    ClerkProvider = clerk.ClerkProvider;
  } catch {
    // Clerk not available
  }
}

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Russ Rentals | Quality Houses, Apartments & Duplexes",
  description: "Find your perfect rental home with Russ Rentals. We offer quality houses, apartments, and duplexes with exceptional service and transparent pricing in Springfield, IL.",
  keywords: "rental properties, houses for rent, apartments for rent, duplexes, Springfield IL rentals, property management",
  openGraph: {
    title: "Russ Rentals | Quality Houses, Apartments & Duplexes",
    description: "Find your perfect rental home with Russ Rentals. Quality properties with exceptional service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );

  if (isClerkConfigured && ClerkProvider) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
