import type { Country } from '@/types/geo.ts';
import type { DateString } from '@/types/common.types.ts';

export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum CouponDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export interface Coupon {
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
  status: CouponStatus;
  systemGenerated: boolean;
  country: Country;
  createdAt: DateString;
}
