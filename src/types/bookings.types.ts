import type { User } from '@/types/user.types.ts';
import type { Currency } from '@/types/geo.ts';
import type { DateString, Review } from '@/types/common.types.ts';
import type { Service } from '@/types/service.types.ts';

export enum BookingStatus {
  INITIALIZED = 'INITIALIZED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
  RESCHEDULED = 'RESCHEDULED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  NO_SHOW_REQUESTED = 'NO_SHOW_REQUESTED',
  NO_SHOW_CONFIRMED = 'NO_SHOW_CONFIRMED',
  NO_SHOW_REJECTED = 'NO_SHOW_REJECTED',
}

export interface Booking {
  id: number;
  bookingNumber: string;
  startTime: DateString;
  endTime: DateString;
  totalDuration: number;
  subtotal: number;
  discount: number;
  total: number;
  status: BookingStatus;
  confirmedAt: DateString;
  updatedAt: DateString;
  user: User;
  currency: Currency;
  userReview: Review;
  stylistReview: Review;
  items: Array<BookingItem>;
  createdAt: DateString;
}

export interface BookingItem {
  id: number;
  subtotal: number;
  discount: number;
  total: number;
  currency: Currency;
  service: Service;
  addon: boolean;
  createdAt: DateString;
}

export interface BookingsFilter {
  userId?: number;
  stylistId?: number;
  serviceId?: number;
  from?: Date;
  to?: Date;
  statuses?: Array<BookingStatus>;
  page?: number;
  size?: number;
  sort?: string;
}
