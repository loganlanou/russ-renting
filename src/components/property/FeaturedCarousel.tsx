'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface FeaturedCarouselProps {
  properties: Property[];
}

export function FeaturedCarousel({ properties }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % properties.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, properties.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, properties.length]);

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const currentProperty = properties[currentIndex];

  return (
    <section className="relative h-[640px] md:h-[720px] overflow-hidden">
      {/* Background Images */}
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={property.images[0].url}
            alt={property.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-12 w-72 h-72 bg-[#e7c9a5] rounded-full opacity-20 blur-3xl animate-drift" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#f1dfc7] rounded-full opacity-20 blur-3xl animate-drift" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#f1dfc7] rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold uppercase tracking-widest">Featured stay</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight font-serif">
            {currentProperty.title}
          </h1>

          <p className="text-lg text-white/80 mb-2">
            {currentProperty.address}, {currentProperty.city}
          </p>

          <div className="flex items-center gap-6 mb-6">
            <span className="text-3xl font-semibold text-[#f1dfc7]">
              {formatPrice(currentProperty.price)}<span className="text-lg text-white/70">/month</span>
            </span>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {currentProperty.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                {currentProperty.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {currentProperty.squareFeet.toLocaleString()} sqft
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/properties/${currentProperty.id}`}>
              <Button variant="secondary" size="lg" className="btn-scale">
                View Property
              </Button>
            </Link>
            <Link href={`/contact?property=${currentProperty.id}&action=viewing`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0b3945] btn-scale">
                Schedule Viewing
              </Button>
            </Link>
          </div>

          <div className="mt-10 bg-white/95 border border-white/40 rounded-3xl p-5 shadow-[0_20px_60px_-30px_rgba(15,76,92,0.6)] max-w-xl">
            <p className="text-sm font-semibold text-[var(--brand-dark)] uppercase tracking-widest mb-3">
              Find your next place
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <label className="flex flex-col gap-2">
                <span className="text-[var(--muted)]">Location</span>
                <input
                  type="text"
                  placeholder="Neighborhood or city"
                  className="rounded-full border border-[var(--line)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[var(--muted)]">Move-in</span>
                <input
                  type="date"
                  className="rounded-full border border-[var(--line)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[var(--muted)]">Budget</span>
                <select className="rounded-full border border-[var(--line)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none">
                  <option>Up to $1,200</option>
                  <option>Up to $1,600</option>
                  <option>Up to $2,000</option>
                  <option>Up to $2,500</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[var(--muted)]">Beds</span>
                <select className="rounded-full border border-[var(--line)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none">
                  <option>Any</option>
                  <option>Studio+</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-[var(--muted)]">Showing long-term rentals and hosted stays.</p>
              <Button variant="primary" size="sm">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous property"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next property"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#f1dfc7] w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to property ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
