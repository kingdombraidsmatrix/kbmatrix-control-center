import type { Media } from '@/types/common.types.ts';

export interface Stylist {
  id: number;
  name: string;
  tag: string;
  description: string;
  contact: Contact;
  cover: Media;
  logo: Media;
  deliveryTypes: Array<DeliveryType>;
  averageRating: AverageRating;
  createdAt: string;
}

export enum DeliveryType {
  SALON = 'SALON',
  MOBILE = 'MOBILE',
  HOME = 'HOME',
}

export interface Contact {
  instagram: string;
  tiktok: string;
  website: string;
  phoneNumber: string;
  email: string;
  address: Address;
}

export interface Address {
  id: number;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

export interface AverageRating {
  rating: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
}

export interface StylistsOverview {
  newStylists: number;
  activeStylists: number;
  inactiveStylists: number;
  allStylists: number;
}
