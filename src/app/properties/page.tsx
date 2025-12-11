'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilter } from '@/components/property/PropertyFilter';
import { properties } from '@/data/properties';
import { Property } from '@/types/property';

interface FilterState {
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || '';

  const [filters, setFilters] = useState<FilterState>({
    type: initialType,
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  useEffect(() => {
    if (initialType) {
      setFilters(prev => ({ ...prev, type: initialType }));
    }
  }, [initialType]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property: Property) => {
      // Filter by type
      if (filters.type && property.type !== filters.type) {
        return false;
      }

      // Filter by min price
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }

      // Filter by max price
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }

      // Filter by bedrooms
      if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Filter */}
      <PropertyFilter onFilterChange={handleFilterChange} />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600">
          Showing <span className="font-semibold">{filteredProperties.length}</span>{' '}
          {filteredProperties.length === 1 ? 'property' : 'properties'}
        </p>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No properties found</h3>
          <p className="text-slate-600">
            Try adjusting your filters to see more properties.
          </p>
        </div>
      )}
    </>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Available Properties
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Browse our selection of quality rental properties. Use the filters below to find the perfect home for your needs.
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading properties...</div>}>
            <PropertiesContent />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Contact us and let us know your requirements. We may have properties becoming available soon that match your needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
