import type { badgeVariants } from '@/components/ui/badge.tsx';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { AdminStatus, StylistStatus, UserStatus } from '@/types';
import type { BookingStatus } from '@/types/bookings.types.ts';
import type {
  TransactionFlow,
  TransactionStatus,
  TransactionType,
} from '@/types/transactions.types.ts';
import type { SubscriptionStatus } from '@/types/plans.ts';
import type { CouponStatus, CouponUsageStatus } from '@/types/coupons.ts';
import type { BroadcastPushStatus } from '@/types/crm.ts';

export enum BadgeContext {
  BOOLEAN = 'BOOLEAN',
  USER_STATUS = 'USER_STATUS',
  BOOKING_STATUS = 'BOOKING',
  TRANSACTION_STATUS = 'TRANSACTION_STATUS',
  TRANSACTION_FLOW = 'TRANSACTION_FLOW',
  TRANSACTION_TYPE = 'TRANSACTION_TYPE',
  SUBSCRIPTION_STATUS = 'SUBSCRIPTION_STATUS',
  STYLIST_STATUS = 'STYLIST_STATUS',
  ADMIN_STATUS = 'ADMIN_STATUS',
  COUPON_STATUS = 'COUPON_STATUS',
  COUPON_USAGE_STATUS = 'COUPON_USAGE_STATUS',
  BROADCAST_PUSH_STATUS = 'BROADCAST_PUSH_STATUS',
}

export interface BooleanBadge {
  context: BadgeContext.BOOLEAN;
  value: boolean;
  valueLabel?: [string, string];
}

interface UserStatusBadge {
  context: BadgeContext.USER_STATUS;
  value: UserStatus;
}

interface BookingStatusBadge {
  context: BadgeContext.BOOKING_STATUS;
  value: BookingStatus;
}

interface TransactionStatusBadge {
  context: BadgeContext.TRANSACTION_STATUS;
  value: TransactionStatus;
}

interface TransactionFlowBadge {
  context: BadgeContext.TRANSACTION_FLOW;
  value: TransactionFlow;
}

interface TransactionTypeBadge {
  context: BadgeContext.TRANSACTION_TYPE;
  value: TransactionType;
}

interface SubscriptionStatusBadge {
  context: BadgeContext.SUBSCRIPTION_STATUS;
  value: SubscriptionStatus;
}

interface StylistStatusBadge {
  context: BadgeContext.STYLIST_STATUS;
  value: StylistStatus;
}

interface AdminStatusBadge {
  context: BadgeContext.ADMIN_STATUS;
  value: AdminStatus;
}

interface CouponStatusBadge {
  context: BadgeContext.COUPON_STATUS;
  value: CouponStatus;
}

interface CouponUsageStatusBadge {
  context: BadgeContext.COUPON_USAGE_STATUS;
  value: CouponUsageStatus;
}

interface BroadcastPushStatusBadge {
  context: BadgeContext.BROADCAST_PUSH_STATUS;
  value: BroadcastPushStatus;
}

export type BadgeProps =
  | BooleanBadge
  | UserStatusBadge
  | BookingStatusBadge
  | TransactionStatusBadge
  | TransactionFlowBadge
  | TransactionTypeBadge
  | SubscriptionStatusBadge
  | StylistStatusBadge
  | AdminStatusBadge
  | CouponStatusBadge
  | CouponUsageStatusBadge
  | BroadcastPushStatusBadge;

export interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  text: string;
  icon?: LucideIcon;
}
