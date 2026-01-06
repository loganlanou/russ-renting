'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FilterState {
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

interface PropertyFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export function PropertyFilter({ onFilterChange }: PropertyFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-2xl border border-[var(--line)] p-6 mb-8 shadow-[0_12px_40px_-30px_rgba(27,26,23,0.45)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Filter Listings</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Find your match</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Property Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full border border-[var(--line)] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] bg-white"
          >
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Min Price
          </label>
          <select
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full border border-[var(--line)] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] bg-white"
          >
            <option value="">No Min</option>
            <option value="500">$500</option>
            <option value="750">$750</option>
            <option value="1000">$1,000</option>
            <option value="1250">$1,250</option>
            <option value="1500">$1,500</option>
            <option value="2000">$2,000</option>
          </select>
        </div>

        {/* Max Price */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Max Price
          </label>
          <select
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full border border-[var(--line)] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] bg-white"
          >
            <option value="">No Max</option>
            <option value="1000">$1,000</option>
            <option value="1500">$1,500</option>
            <option value="2000">$2,000</option>
            <option value="2500">$2,500</option>
            <option value="3000">$3,000</option>
            <option value="3500">$3,500</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-[var(--muted)] mb-1">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full border border-[var(--line)] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)] bg-white"
          >
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Clear Filters
        </Button>
        <Button variant="primary" size="sm" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
