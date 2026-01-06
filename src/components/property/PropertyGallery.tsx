'use client';

import { useState } from 'react';
import { PropertyImage } from '@/types/property';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

const roomLabels: Record<PropertyImage['room'], string> = {
  exterior: 'Exterior',
  living: 'Living Room',
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  bathroom: 'Bathroom',
  dining: 'Dining Room',
  backyard: 'Backyard',
  garage: 'Garage',
  other: 'Other',
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterRoom, setFilterRoom] = useState<PropertyImage['room'] | 'all'>('all');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  const filteredImages = filterRoom === 'all'
    ? images
    : images.filter(img => img.room === filterRoom);

  const uniqueRooms = Array.from(new Set(images.map(img => img.room)));

  const currentImage = filteredImages[selectedImage] || images[0];

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  return (
    <>
      <div className="space-y-4">
        {/* Room Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setFilterRoom('all'); setSelectedImage(0); }}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              filterRoom === 'all'
                ? 'bg-[var(--brand)] text-white'
                : 'bg-[#f5f1ea] text-[var(--muted)] hover:bg-[#efe8dd]'
            }`}
          >
            All Photos ({images.length})
          </button>
          {uniqueRooms.map((room) => (
            <button
              key={room}
              onClick={() => { setFilterRoom(room); setSelectedImage(0); }}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filterRoom === room
                  ? 'bg-[var(--brand)] text-white'
                  : 'bg-[#f5f1ea] text-[var(--muted)] hover:bg-[#efe8dd]'
              }`}
            >
              {roomLabels[room]} ({images.filter(img => img.room === filterRoom).length})
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div
          className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden cursor-pointer group bg-[#efe8dd] border border-[var(--line)]"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={currentImage.url}
            alt={`${title} - ${currentImage.caption}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-colors" />

          {/* Caption Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-medium">{currentImage.caption}</p>
            <p className="text-white/70 text-xs">{roomLabels[currentImage.room]}</p>
          </div>

          {/* Click to enlarge hint */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white bg-black/50 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              Click to enlarge
            </span>
          </div>

          {/* Image counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {filteredImages.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {filteredImages.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filteredImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-24 h-20 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all bg-[#efe8dd] ${
                  selectedImage === index
                    ? 'border-[var(--accent-strong)] ring-2 ring-[var(--accent)]/30'
                    : 'border-transparent hover:border-[var(--line)]'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${title} - ${image.caption}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-[var(--accent)]/10" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors p-2 bg-black/30 rounded-full hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main image */}
          <div
            className="relative max-w-6xl max-h-[85vh] w-full h-full mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].url}
              alt={`${title} - ${filteredImages[selectedImage].caption}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/70 transition-colors p-2 bg-black/30 rounded-full hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Caption and counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white text-lg font-medium mb-1">
              {filteredImages[selectedImage].caption}
            </p>
            <p className="text-white/60 text-sm">
              {selectedImage + 1} / {filteredImages.length} • {roomLabels[filteredImages[selectedImage].room]}
            </p>
          </div>

          {/* Thumbnail strip in modal */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 max-w-3xl overflow-x-auto p-2">
            {filteredImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden transition-all bg-black/50 ${
                  selectedImage === index
                    ? 'ring-2 ring-[var(--accent-strong)] opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
