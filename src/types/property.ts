export interface Property {
  id: string;
  title: string;
  type: 'house' | 'apartment' | 'duplex';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  deposit: number;
  applicationFee: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  features: string[];
  images: PropertyImage[];
  available: boolean;
  availableDate?: string;
  petFriendly: boolean;
  petDeposit?: number;
  petRent?: number;
  parking: string;
  laundry: string;
  yearBuilt?: number;
  utilities?: string[];
  leaseTerms?: string[];
}

export interface PropertyImage {
  url: string;
  caption: string;
  room: 'exterior' | 'living' | 'kitchen' | 'bedroom' | 'bathroom' | 'dining' | 'backyard' | 'garage' | 'other';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest?: string;
  message: string;
}
