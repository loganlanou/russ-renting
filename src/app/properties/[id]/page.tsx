import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { Button } from '@/components/ui/Button';
import { getPropertyById, properties } from '@/data/properties';
import {
  formatPrice,
  getPropertyTypeLabel,
  getBedroomText,
  getBathroomText,
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
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-slate-700">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/properties" className="text-slate-500 hover:text-slate-700">
              Properties
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 font-medium">{property.title}</span>
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
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Property Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Property Type</h3>
                  <p className="text-slate-800">{getPropertyTypeLabel(property.type)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Year Built</h3>
                  <p className="text-slate-800">{property.yearBuilt || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Square Footage</h3>
                  <p className="text-slate-800">{property.squareFeet.toLocaleString()} sqft</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Parking</h3>
                  <p className="text-slate-800">{property.parking}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Laundry</h3>
                  <p className="text-slate-800">{property.laundry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Pet Policy</h3>
                  <p className="text-slate-800">
                    {property.petFriendly ? 'Pets Allowed' : 'No Pets'}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Features & Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
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

            {/* Location */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Location</h2>
              <div className="flex items-start text-slate-600">
                <svg
                  className="w-6 h-6 text-slate-400 mr-3 mt-0.5 flex-shrink-0"
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
                  <p className="font-medium text-slate-800">{property.address}</p>
                  <p>
                    {property.city}, {property.state} {property.zipCode}
                  </p>
                </div>
              </div>
              {/* Map Placeholder */}
              <div className="mt-4 h-64 bg-slate-200 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Map view coming soon</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-3xl font-bold text-slate-800">
                    {formatPrice(property.price)}
                    <span className="text-lg font-normal text-slate-500">/month</span>
                  </p>
                </div>

                {/* Property Title */}
                <h1 className="text-2xl font-bold text-slate-800 mb-2">{property.title}</h1>

                {/* Address */}
                <p className="text-slate-500 mb-4">{property.address}</p>

                {/* Quick Info */}
                <div className="flex items-center justify-between border-t border-b py-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">
                      {property.bedrooms === 0 ? 'Studio' : property.bedrooms}
                    </p>
                    <p className="text-sm text-slate-500">
                      {property.bedrooms === 0 ? '' : 'Beds'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">{property.bathrooms}</p>
                    <p className="text-sm text-slate-500">Baths</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800">
                      {property.squareFeet.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">Sqft</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  {property.available ? (
                    <div className="flex items-center text-green-600">
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
                  <Link href={`/contact?property=${property.id}`} className="block">
                    <Button variant="primary" className="w-full">
                      Schedule a Viewing
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Ask a Question
                    </Button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-slate-800 mb-3">Contact Us</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-slate-400"
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
                        className="w-4 h-4 mr-2 text-slate-400"
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
