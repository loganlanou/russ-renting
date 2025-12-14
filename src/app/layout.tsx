import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProviderWrapper } from "@/components/providers/ClerkProviderWrapper";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmailCapturePopup } from "@/components/layout/EmailCapturePopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <ClerkProviderWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <EmailCapturePopup />
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
