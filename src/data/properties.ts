import { Property } from '@/types/property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Spacious Family Home',
    type: 'house',
    address: '123 Oak Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    price: 1850,
    bedrooms: 4,
    bathrooms: 2.5,
    squareFeet: 2200,
    description: 'Beautiful single-family home in a quiet neighborhood. This spacious property features an open floor plan, updated kitchen with stainless steel appliances, hardwood floors throughout the main level, and a large backyard perfect for families. The master suite includes a walk-in closet and ensuite bathroom. Located near excellent schools and parks.',
    features: [
      'Central Air Conditioning',
      'Hardwood Floors',
      'Updated Kitchen',
      'Large Backyard',
      'Two-Car Garage',
      'Basement Storage',
      'Near Schools',
      'Quiet Neighborhood'
    ],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    available: true,
    availableDate: '2024-02-01',
    petFriendly: true,
    parking: '2-Car Garage',
    laundry: 'In-Unit',
    yearBuilt: 2015
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    type: 'apartment',
    address: '456 Main Avenue, Unit 5B',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 950,
    description: 'Contemporary apartment in the heart of downtown. Enjoy city living with modern amenities including granite countertops, stainless steel appliances, and in-unit laundry. Building features include a fitness center, rooftop terrace, and secure entry. Walking distance to restaurants, shops, and public transportation.',
    features: [
      'Granite Countertops',
      'Stainless Steel Appliances',
      'In-Unit Laundry',
      'Fitness Center',
      'Rooftop Terrace',
      'Secure Entry',
      'Walking Distance to Transit',
      'Pet-Friendly Building'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    available: true,
    petFriendly: true,
    parking: 'Underground Parking Available',
    laundry: 'In-Unit',
    yearBuilt: 2020
  },
  {
    id: '3',
    title: 'Charming Duplex Unit',
    type: 'duplex',
    address: '789 Elm Street, Unit A',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62703',
    price: 1450,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1400,
    description: 'Well-maintained duplex unit offering the perfect blend of privacy and convenience. Features include a private entrance, updated bathrooms, eat-in kitchen, and private backyard space. This unit has been recently renovated with new flooring, fresh paint, and modern fixtures throughout.',
    features: [
      'Private Entrance',
      'Updated Bathrooms',
      'Eat-In Kitchen',
      'Private Backyard',
      'Recently Renovated',
      'New Flooring',
      'Dedicated Parking',
      'Storage Space'
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800'
    ],
    available: true,
    availableDate: '2024-01-15',
    petFriendly: false,
    parking: 'Driveway - 1 Space',
    laundry: 'In-Unit',
    yearBuilt: 1998
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment',
    type: 'apartment',
    address: '321 Park Boulevard, Unit 12',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
    price: 750,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    description: 'Efficient studio apartment perfect for young professionals or students. Features an open layout with a separate kitchen area, large windows providing excellent natural light, and modern finishes. Building amenities include laundry facilities, bike storage, and package lockers.',
    features: [
      'Large Windows',
      'Modern Finishes',
      'Separate Kitchen Area',
      'Building Laundry',
      'Bike Storage',
      'Package Lockers',
      'Near Public Transit',
      'Utilities Included'
    ],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800'
    ],
    available: true,
    petFriendly: false,
    parking: 'Street Parking',
    laundry: 'Shared',
    yearBuilt: 2018
  },
  {
    id: '5',
    title: 'Executive Townhouse',
    type: 'house',
    address: '555 Maple Drive',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    price: 2400,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1800,
    description: 'Elegant townhouse in prestigious community. Features include high ceilings, crown molding, chef\'s kitchen with premium appliances, and a private patio. HOA maintains exterior and common areas. Community amenities include a pool, clubhouse, and fitness center.',
    features: [
      'High Ceilings',
      'Crown Molding',
      'Chef\'s Kitchen',
      'Premium Appliances',
      'Private Patio',
      'Community Pool',
      'Fitness Center',
      'HOA Maintained'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800'
    ],
    available: false,
    petFriendly: true,
    parking: 'Attached Garage',
    laundry: 'In-Unit',
    yearBuilt: 2019
  },
  {
    id: '6',
    title: 'Garden Level Apartment',
    type: 'apartment',
    address: '888 River Road, Unit G1',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    price: 950,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 700,
    description: 'Quiet garden-level apartment with private patio access. Recently updated with new appliances, fresh paint, and luxury vinyl flooring. Perfect for those seeking a peaceful retreat with easy access to walking trails and parks.',
    features: [
      'Private Patio',
      'New Appliances',
      'Luxury Vinyl Flooring',
      'Near Walking Trails',
      'Peaceful Setting',
      'Updated Interior',
      'On-Site Management',
      'Responsive Maintenance'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800'
    ],
    available: true,
    availableDate: '2024-02-15',
    petFriendly: true,
    parking: 'Assigned Parking Space',
    laundry: 'Shared',
    yearBuilt: 2005
  }
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export function getAvailableProperties(): Property[] {
  return properties.filter(p => p.available);
}

export function getPropertiesByType(type: Property['type']): Property[] {
  return properties.filter(p => p.type === type);
}

export function getFeaturedProperties(count: number = 3): Property[] {
  return properties.filter(p => p.available).slice(0, count);
}
