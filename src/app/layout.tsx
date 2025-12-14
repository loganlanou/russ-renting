import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
