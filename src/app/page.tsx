import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FeaturedCarousel } from '@/components/property/FeaturedCarousel';
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';
import { getFeaturedProperties, properties } from '@/data/properties';

export default function Home() {
  const featuredProperties = getFeaturedProperties(3);
  // Use featured properties if available, otherwise use first 5 properties
  const carouselProperties = properties.filter(p => p.featured).length > 0
    ? properties.filter(p => p.featured).slice(0, 5)
    : properties.slice(0, 5);

  return (
    <>
      {/* Hero Carousel */}
      <FeaturedCarousel properties={carouselProperties} />

      {/* Explore Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f1dfc7] rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 animate-slideUp">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)] mb-3">Explore by vibe</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-4 font-serif">
                Spaces curated for real life and quick getaways
              </h2>
              <p className="text-lg text-[var(--muted)] max-w-2xl">
                Choose the pace: long-term rentals, flexible stays, or weekend resets with hotel-grade comfort.
              </p>
            </div>
            <Link href="/properties" className="hidden md:inline-flex items-center text-[var(--brand)] font-semibold">
              Browse all listings &rarr;
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Family Homes',
                subtitle: 'Yards, garages, and quiet streets.',
                href: '/properties?type=house',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
              },
              {
                title: 'City Apartments',
                subtitle: 'Walkable blocks with modern amenities.',
                href: '/properties?type=apartment',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
              },
              {
                title: 'Duplex Living',
                subtitle: 'Privacy + value with flexible layouts.',
                href: '/properties?type=duplex',
                image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
              },
              {
                title: 'Weekend Escapes',
                subtitle: 'Short stays with boutique touches.',
                href: '/properties',
                image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
              },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <div className="relative h-72 rounded-3xl overflow-hidden border border-[var(--line)] property-card">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3945]/80 via-[#0b3945]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/properties" className="text-[var(--brand)] font-semibold">
              Browse all listings &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-[#f5f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)] mb-3">Handpicked</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-2 font-serif">
                Featured rentals and hosted stays
              </h2>
              <p className="text-lg text-[var(--muted)]">
                A shortlist of the best-maintained homes with complete details and polished interiors.
              </p>
            </div>
            <Link href="/properties" className="hidden md:block">
              <Button variant="outline">View All Listings</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/properties">
              <Button variant="outline">View All Listings</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f1dfc7] rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-4 font-serif">
              Hosting the best rentals in Springfield
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              A trusted team, full transparency, and a tenant-first experience with flexible stay options.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'High-touch care',
                copy: 'Dedicated local team for tours, support, and maintenance.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .512-.19 1.023-.57 1.414l-4.24 4.242a2 2 0 01-2.828 0 2 2 0 010-2.828l4.243-4.243A1.99 1.99 0 0112 9.586V11zM16.243 4.757a2 2 0 012.828 0 2 2 0 010 2.828l-7.486 7.486a4 4 0 01-5.657-5.657l7.486-7.486z" />
                ),
              },
              {
                title: 'Fully detailed listings',
                copy: 'Transparent pricing, amenities, and move-in costs upfront.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
              },
              {
                title: 'Flexible timelines',
                copy: 'Options for long-term leases or shorter stays.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: 'Move-in ready',
                copy: 'Curated furnishings and clean finishes where available.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                ),
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-[var(--card)] rounded-2xl feature-card border border-[var(--line)]">
                <div className="w-14 h-14 bg-[#f1dfc7] rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[var(--brand-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-[var(--muted)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0b3945] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f1dfc7] rounded-full opacity-10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f1dfc7] rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0 animate-slideUp">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 font-serif">
                Ready to tour your next home?
              </h2>
              <p className="text-lg text-white/80 max-w-xl">
                We book tours quickly, share complete cost breakdowns, and help you move with confidence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button variant="secondary" size="lg" className="btn-scale">
                  View Listings
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0b3945] btn-scale">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSignup />

      {/* Testimonials Section */}
      <section className="py-16 bg-[#f5f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--foreground)] mb-4 font-serif">
              Guests and tenants love the experience
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Consistent care, clean move-ins, and listings that actually match the photos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)] feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#c67c3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--muted)] mb-6 italic">
                &ldquo;Moving into my new apartment was seamless. The team was professional, responsive,
                and made the whole process stress-free. Highly recommend!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#f1dfc7] rounded-full flex items-center justify-center">
                  <span className="text-[var(--brand-dark)] font-semibold">JD</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-[var(--foreground)]">Jennifer D.</p>
                  <p className="text-sm text-[var(--muted)]">Apartment Tenant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)] feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#c67c3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--muted)] mb-6 italic">
                &ldquo;Been renting my house from Russ Rentals for 3 years now. Maintenance issues
                are always handled quickly. Best landlord I&apos;ve ever had!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#f1dfc7] rounded-full flex items-center justify-center">
                  <span className="text-[var(--brand-dark)] font-semibold">MT</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-[var(--foreground)]">Michael T.</p>
                  <p className="text-sm text-[var(--muted)]">House Tenant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl border border-[var(--line)] feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#c67c3e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--muted)] mb-6 italic">
                &ldquo;The duplex we rent is perfect for our small family. Great location,
                fair price, and the application process was straightforward.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#f1dfc7] rounded-full flex items-center justify-center">
                  <span className="text-[var(--brand-dark)] font-semibold">SR</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-[var(--foreground)]">Sarah R.</p>
                  <p className="text-sm text-[var(--muted)]">Duplex Tenant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
