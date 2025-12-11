export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatAddress(address: string, city: string, state: string, zipCode: string): string {
  return `${address}, ${city}, ${state} ${zipCode}`;
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getPropertyTypeLabel(type: 'house' | 'apartment' | 'duplex'): string {
  const labels = {
    house: 'House',
    apartment: 'Apartment',
    duplex: 'Duplex',
  };
  return labels[type];
}

export function getBathroomText(bathrooms: number): string {
  if (bathrooms === 1) return '1 Bath';
  if (bathrooms % 1 === 0) return `${bathrooms} Baths`;
  return `${bathrooms} Baths`;
}

export function getBedroomText(bedrooms: number): string {
  if (bedrooms === 0) return 'Studio';
  if (bedrooms === 1) return '1 Bed';
  return `${bedrooms} Beds`;
}
