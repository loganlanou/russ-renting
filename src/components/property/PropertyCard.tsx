import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { formatPrice, getPropertyTypeLabel, getBedroomText, getBathroomText } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--line)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_25px_60px_-30px_rgba(27,26,23,0.45)]">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={property.images[0].url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Photo count indicator */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.images.length} photos
          </div>
          {/* Property Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-[var(--brand-dark)] px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
              {getPropertyTypeLabel(property.type)}
            </span>
          </div>
          {/* Availability Badge */}
          {!property.available && (
            <div className="absolute top-4 right-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Leased
              </span>
            </div>
          )}
          {property.available && property.availableDate && (
            <div className="absolute top-4 right-4">
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Available
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <div className="flex justify-between items-start mb-2">
            <p className="text-2xl font-semibold text-[var(--foreground)]">
              {formatPrice(property.price)}
              <span className="text-base font-normal text-[var(--muted)]">/month</span>
            </p>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--brand)] transition-colors">
            {property.title}
          </h3>

          {/* Address */}
          <p className="text-[var(--muted)] text-sm mb-4 flex items-center">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.address}, {property.city}, {property.state}
          </p>

          {/* Features */}
          <div className="flex items-center justify-between text-sm text-[var(--muted)] border-t border-[var(--line)] pt-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-[var(--accent-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0m0-2a2 2 0 012-2h6l2 2h6a2 2 0 012 2v0" />
              </svg>
              {getBedroomText(property.bedrooms)}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-[var(--accent-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {getBathroomText(property.bathrooms)}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-[var(--accent-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.squareFeet.toLocaleString()} sqft
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
