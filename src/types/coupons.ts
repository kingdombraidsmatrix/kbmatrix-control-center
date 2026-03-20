import type { Country } from '@/types/geo.ts';
import type { DateString } from '@/types/common.types.ts';
import type { User } from '@/types/user.types.ts';
import type { Booking } from '@/types/bookings.types.ts';
import type { Service, ServiceCategory } from '@/types/service.types.ts';
import type { Stylist } from '@/types/stylist.types.ts';

export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum CouponDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export enum CouponUsageStatus {
  RESERVED = 'RESERVED',
  APPLIED = 'APPLIED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export interface CouponTrimmed {
  id: number;
  code: string;
  name: string;
  description: string;
  discountType: CouponDiscountType;
  discountValue: number;
  minBookingAmount: number;
  discountAmountCap: number;
  validFrom: DateString;
  validUntil: DateString;
  totalUsageLimit: number;
  usagePerCustomerLimit: number;
  usageCount: number;
  status: CouponStatus;
  systemGenerated: boolean;
  country: Country;
  createdAt: DateString;
}

export interface Coupon extends CouponTrimmed {
  services: Array<Service>;
  serviceCategories: Array<ServiceCategory>;
  stylists: Array<Stylist>;
  users: Array<User>;
}

export interface CouponUsage {
  id: number;
  coupon: CouponTrimmed;
  user: User;
  booking?: Booking;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  usedAt: DateString;
  status: CouponUsageStatus;
  createdAt: DateString;
}
