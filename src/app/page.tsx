import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FeaturedCarousel } from '@/components/property/FeaturedCarousel';
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

      {/* Property Types Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Property Types
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you need a cozy apartment, a spacious house, or a versatile duplex,
              we have options to fit your lifestyle and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Houses */}
            <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg property-card">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                alt="Houses for rent"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Houses</h3>
                <p className="text-slate-200 mb-4">Spacious single-family homes with yards and garages.</p>
                <Link href="/properties?type=house" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                  View Houses &rarr;
                </Link>
              </div>
            </div>

            {/* Apartments */}
            <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg property-card">
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
                alt="Apartments for rent"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Apartments</h3>
                <p className="text-slate-200 mb-4">Modern units with convenient amenities and locations.</p>
                <Link href="/properties?type=apartment" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                  View Apartments &rarr;
                </Link>
              </div>
            </div>

            {/* Duplexes */}
            <div className="group relative h-80 rounded-xl overflow-hidden shadow-lg property-card">
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
                alt="Duplexes for rent"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Duplexes</h3>
                <p className="text-slate-200 mb-4">Perfect blend of privacy and affordability.</p>
                <Link href="/properties?type=duplex" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                  View Duplexes &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                Featured Properties
              </h2>
              <p className="text-lg text-slate-600">
                Explore our handpicked selection of available rentals.
              </p>
            </div>
            <Link href="/properties" className="hidden md:block">
              <Button variant="outline">View All Properties</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/properties">
              <Button variant="outline">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full opacity-50 blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose <span className="text-gradient">Russ Rentals</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We are committed to providing exceptional service and quality properties
              to make your rental experience seamless.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quality Properties */}
            <div className="text-center p-6 bg-white rounded-xl feature-card shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Quality Properties</h3>
              <p className="text-slate-600">
                Well-maintained properties that meet high standards for comfort and safety.
              </p>
            </div>

            {/* Responsive Service */}
            <div className="text-center p-6 bg-white rounded-xl feature-card shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Responsive Service</h3>
              <p className="text-slate-600">
                Quick response to maintenance requests and tenant needs, 24/7 support available.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="text-center p-6 bg-white rounded-xl feature-card shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Transparent Pricing</h3>
              <p className="text-slate-600">
                No hidden fees or surprise charges. Clear terms and straightforward leasing.
              </p>
            </div>

            {/* Easy Application */}
            <div className="text-center p-6 bg-white rounded-xl feature-card shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Easy Application</h3>
              <p className="text-slate-600">
                Simple online application process with quick approval turnaround times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-400 rounded-full opacity-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0 animate-slideUp">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Find Your <span className="text-gradient-amber">New Home</span>?
              </h2>
              <p className="text-lg text-slate-300 max-w-xl">
                Contact us today to schedule a viewing or learn more about our available properties.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button variant="secondary" size="lg" className="btn-scale">
                  View Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-800 btn-scale">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Our Tenants Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from our satisfied residents about their experience with Russ Rentals.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic">
                &ldquo;Moving into my new apartment was seamless. The team was professional, responsive,
                and made the whole process stress-free. Highly recommend!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">JD</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-800">Jennifer D.</p>
                  <p className="text-sm text-slate-500">Apartment Tenant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic">
                &ldquo;Been renting my house from Russ Rentals for 3 years now. Maintenance issues
                are always handled quickly. Best landlord I&apos;ve ever had!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">MT</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-800">Michael T.</p>
                  <p className="text-sm text-slate-500">House Tenant</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md feature-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic">
                &ldquo;The duplex we rent is perfect for our small family. Great location,
                fair price, and the application process was straightforward.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-semibold">SR</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-slate-800">Sarah R.</p>
                  <p className="text-sm text-slate-500">Duplex Tenant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
