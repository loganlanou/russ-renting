import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | Russ Rentals',
  description: 'Learn about Russ Rentals, our mission, values, and commitment to providing quality rental properties with exceptional service.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920"
          alt="About Russ Rentals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 font-serif">
              About Russ Rentals
            </h1>
            <p className="text-lg text-white/80">
              Your trusted partner in finding the perfect rental home since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-6 font-serif">Our Story</h2>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Russ Rentals was founded with a simple mission: to provide quality rental properties with honest, transparent service. What started as a small family business has grown into one of the most trusted property management companies in Springfield.
              </p>
              <p className="text-[var(--muted)] mb-4 leading-relaxed">
                Over the years, we have maintained our commitment to treating every tenant like family. We believe that a home is more than just four walls - it is where memories are made, families grow, and lives are built.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                Today, we manage a diverse portfolio of houses, apartments, and duplexes, each carefully maintained to provide comfortable, safe living spaces for our residents.
              </p>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden border border-[var(--line)] shadow-[0_20px_60px_-30px_rgba(27,26,23,0.45)]">
              <Image
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800"
                alt="Modern rental property"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-[#f5f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-4 font-serif">Our Mission & Values</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              We are guided by principles that put our tenants first and ensure the highest standards of service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Integrity */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)]">
              <div className="w-14 h-14 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[var(--brand-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Integrity</h3>
              <p className="text-[var(--muted)]">
                We conduct our business with honesty and transparency. No hidden fees, no surprises - just straightforward, ethical service.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)]">
              <div className="w-14 h-14 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[var(--brand-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Quality</h3>
              <p className="text-[var(--muted)]">
                We maintain all our properties to the highest standards, ensuring safe, comfortable, and well-maintained living spaces.
              </p>
            </div>

            {/* Service */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)]">
              <div className="w-14 h-14 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[var(--brand-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Service</h3>
              <p className="text-[var(--muted)]">
                Our dedicated team provides responsive, professional service. We are here when you need us, with 24/7 emergency support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-4 font-serif">Meet Our Team</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Our experienced team is dedicated to making your rental experience exceptional.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border border-[var(--line)]">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                  alt="Russ Thompson"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Russ Thompson</h3>
              <p className="text-[var(--accent-strong)] font-medium mb-2">Owner & Founder</p>
              <p className="text-[var(--muted)] text-sm">
                With over 15 years in property management, Russ founded the company with a vision of tenant-first service.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border border-[var(--line)]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                  alt="Sarah Mitchell"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Sarah Mitchell</h3>
              <p className="text-[var(--accent-strong)] font-medium mb-2">Property Manager</p>
              <p className="text-[var(--muted)] text-sm">
                Sarah oversees our property portfolio, ensuring every unit meets our high standards of quality.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border border-[var(--line)]">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                  alt="Mike Davis"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Mike Davis</h3>
              <p className="text-[var(--accent-strong)] font-medium mb-2">Maintenance Director</p>
              <p className="text-[var(--muted)] text-sm">
                Mike leads our maintenance team, ensuring quick response times and quality repairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0b3945]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-[#f1dfc7] mb-2">15+</p>
              <p className="text-white/70">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-[#f1dfc7] mb-2">200+</p>
              <p className="text-white/70">Properties Managed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-[#f1dfc7] mb-2">500+</p>
              <p className="text-white/70">Happy Tenants</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-semibold text-[#f1dfc7] mb-2">98%</p>
              <p className="text-white/70">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f5f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-4 font-serif">
            Ready to find your next home?
          </h2>
          <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Explore our available listings or connect with the team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button variant="primary" size="lg">
                View Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
