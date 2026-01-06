import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { Button } from '@/components/ui/Button';
import { getPropertyById, properties } from '@/data/properties';
import {
  formatPrice,
  getPropertyTypeLabel,
} from '@/lib/utils';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: 'Property Not Found | Russ Rentals',
    };
  }

  return {
    title: `${property.title} | Russ Rentals`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Home
            </Link>
            <span className="text-[var(--muted)] opacity-60">/</span>
            <Link href="/properties" className="text-[var(--muted)] hover:text-[var(--foreground)]">
              Properties
            </Link>
            <span className="text-[var(--muted)] opacity-60">/</span>
            <span className="text-[var(--foreground)] font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Details */}
            <div className="mt-8 bg-white rounded-2xl border border-[var(--line)] p-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 font-serif">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Property Type</h3>
                  <p className="text-[var(--foreground)]">{getPropertyTypeLabel(property.type)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Year Built</h3>
                  <p className="text-[var(--foreground)]">{property.yearBuilt || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Square Footage</h3>
                  <p className="text-[var(--foreground)]">{property.squareFeet.toLocaleString()} sqft</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Parking</h3>
                  <p className="text-[var(--foreground)]">{property.parking}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Laundry</h3>
                  <p className="text-[var(--foreground)]">{property.laundry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Pet Policy</h3>
                  <p className="text-[var(--foreground)]">
                    {property.petFriendly ? (
                      <span className="text-emerald-600">
                        Pets Allowed
                        {property.petDeposit && ` ($${property.petDeposit} deposit`}
                        {property.petRent && `, $${property.petRent}/mo pet rent)`}
                        {!property.petDeposit && !property.petRent && ''}
                      </span>
                    ) : (
                      <span className="text-red-600">No Pets</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 bg-white rounded-2xl border border-[var(--line)] p-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4 font-serif">Description</h2>
              <p className="text-[var(--muted)] leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8 bg-white rounded-2xl border border-[var(--line)] p-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4 font-serif">Features & Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-[var(--muted)]">
                    <svg
                      className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Utilities & Lease Terms */}
            {(property.utilities || property.leaseTerms) && (
              <div className="mt-8 bg-white rounded-2xl border border-[var(--line)] p-6">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4 font-serif">Utilities & Lease Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {property.utilities && property.utilities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)] mb-3">Utilities</h3>
                      <ul className="space-y-2">
                        {property.utilities.map((utility, index) => (
                          <li key={index} className="flex items-center text-[var(--muted)]">
                            <svg
                              className="w-4 h-4 text-[var(--accent-strong)] mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            {utility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {property.leaseTerms && property.leaseTerms.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)] mb-3">Lease Terms</h3>
                      <ul className="space-y-2">
                        {property.leaseTerms.map((term, index) => (
                          <li key={index} className="flex items-center text-[var(--muted)]">
                            <svg
                              className="w-4 h-4 text-[var(--brand)] mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {term}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="mt-8 bg-white rounded-2xl border border-[var(--line)] p-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4 font-serif">Location</h2>
              <div className="flex items-start text-[var(--muted)]">
                <svg
                  className="w-6 h-6 text-[var(--muted)] mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-[var(--foreground)]">{property.address}</p>
                  <p>
                    {property.city}, {property.state} {property.zipCode}
                  </p>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="mt-4 h-64 bg-[#efe8dd] rounded-2xl flex items-center justify-center border border-[var(--line)]">
                <p className="text-[var(--muted)]">Map view coming soon</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-[var(--line)] p-6">
                {/* Price */}
                <div className="mb-4">
                  <p className="text-3xl font-semibold text-[var(--foreground)]">
                    {formatPrice(property.price)}
                    <span className="text-lg font-normal text-[var(--muted)]">/month</span>
                  </p>
                </div>

                {/* Property Title */}
                <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-2 font-serif">{property.title}</h1>

                {/* Address */}
                <p className="text-[var(--muted)] mb-4">{property.address}</p>

                {/* Quick Info */}
                <div className="flex items-center justify-between border-t border-b border-[var(--line)] py-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-[var(--foreground)]">
                      {property.bedrooms === 0 ? 'Studio' : property.bedrooms}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {property.bedrooms === 0 ? '' : 'Beds'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-[var(--foreground)]">{property.bathrooms}</p>
                    <p className="text-sm text-[var(--muted)]">Baths</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-[var(--foreground)]">
                      {property.squareFeet.toLocaleString()}
                    </p>
                    <p className="text-sm text-[var(--muted)]">Sqft</p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="mb-4 p-4 bg-[#f5f1ea] rounded-2xl border border-[var(--line)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-3">Move-In Costs</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Monthly Rent</span>
                      <span className="font-medium text-[var(--foreground)]">{formatPrice(property.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Security Deposit</span>
                      <span className="font-medium text-[var(--foreground)]">{formatPrice(property.deposit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Application Fee</span>
                      <span className="font-medium text-[var(--foreground)]">${property.applicationFee}</span>
                    </div>
                    {property.petFriendly && property.petDeposit && (
                      <div className="flex justify-between">
                        <span className="text-[var(--muted)]">Pet Deposit</span>
                        <span className="font-medium text-[var(--foreground)]">${property.petDeposit}</span>
                      </div>
                    )}
                    {property.petFriendly && property.petRent && (
                      <div className="flex justify-between">
                        <span className="text-[var(--muted)]">Monthly Pet Rent</span>
                        <span className="font-medium text-[var(--foreground)]">${property.petRent}/mo</span>
                      </div>
                    )}
                    <div className="border-t border-[var(--line)] pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[var(--foreground)]">Est. Move-In Total</span>
                        <span className="text-[var(--accent-strong)]">
                          {formatPrice(property.price + property.deposit + property.applicationFee)}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        First month + deposit + application fee
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  {property.available ? (
                    <div className="flex items-center text-emerald-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">
                        Available{' '}
                        {property.availableDate
                          ? new Date(property.availableDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Now'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Currently Leased</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href={`/contact?property=${property.id}&action=viewing`} className="block">
                    <Button variant="primary" className="w-full">
                      Schedule a Viewing
                    </Button>
                  </Link>
                  <Link href={`/contact?property=${property.id}&action=apply`} className="block">
                    <Button variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href={`/contact?property=${property.id}`} className="block">
                    <Button variant="outline" className="w-full">
                      Ask a Question
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-[var(--line)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-3">Contact Us</h3>
                  <div className="space-y-2 text-sm text-[var(--muted)]">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-[var(--muted)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      (555) 123-4567
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-[var(--muted)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      info@russrentals.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
