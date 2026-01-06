import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

// Check if Clerk is properly configured
const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_');

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

  // Only wrap with ClerkProvider if Clerk is properly configured
  if (isClerkConfigured) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
