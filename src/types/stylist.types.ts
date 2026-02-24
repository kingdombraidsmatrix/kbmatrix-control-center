import type { Media } from '@/types/common.types.ts';

export enum StylistOverviewTab {
  DETAILS = 'details',
  SETTINGS = 'settings',
  BOOKINGS = 'bookings',
  TRANSACTIONS = 'transactions',
}

export enum StylistStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  IN_REVIEW = 'IN_REVIEW',
  SUSPENDED = 'SUSPENDED',
}

export interface Stylist {
  id: number;
  name: string;
  tag: string;
  description: string;
  contact: Contact;
  countryCode: string;
  cover?: Media;
  logo?: Media;
  deliveryTypes: Array<DeliveryType>;
  averageRating: AverageRating;
  status: StylistStatus;
  createdAt: string;
}

export interface StylistsFilter {
  search?: string;
  status?: StylistStatus;
}

export enum DeliveryType {
  SALON = 'SALON',
  MOBILE = 'MOBILE',
  HOME = 'HOME',
}

export interface Contact {
  instagram?: string;
  tiktok?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  address?: Address;
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
  inReviewStylists: number;
}
