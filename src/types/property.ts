export interface Property {
  id: string;
  title: string;
  type: 'house' | 'apartment' | 'duplex';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  features: string[];
  images: string[];
  available: boolean;
  availableDate?: string;
  petFriendly: boolean;
  parking: string;
  laundry: string;
  yearBuilt?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest?: string;
  message: string;
}
