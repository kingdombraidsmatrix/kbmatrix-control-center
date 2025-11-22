import type { BadgeConfig } from '@/components/badge/badge.type.ts';
import { UserStatus } from '@/types';
import { BookingStatus } from '@/types/bookings.types';
import { TransactionFlow, TransactionStatus, TransactionType } from '@/types/transactions.types.ts';
import { SubscriptionStatus } from '@/types/plans.ts';

export const BooleanBadgeConfig = (
  valueLabel?: [string, string],
): Record<'true' | 'false', BadgeConfig> => ({
  true: {
    variant: 'default',
    text: valueLabel?.[0] || 'True',
  },
  false: {
    variant: 'secondary',
    text: valueLabel?.[1] || 'False',
  },
});

export const UserStatusBadgeConfig: Record<UserStatus, BadgeConfig> = {
  [UserStatus.DELETED]: {
    variant: 'destructive',
    text: 'Deleted',
  },
  [UserStatus.IN_REVIEW]: {
    variant: 'warning',
    text: 'In Review',
  },
  [UserStatus.SCHEDULED_FOR_DELETION]: {
    variant: 'destructive',
    text: 'Scheduled for Deletion',
  },
  [UserStatus.SUSPENDED]: {
    variant: 'secondary',
    text: 'Suspended',
  },
  [UserStatus.ACTIVE]: {
    variant: 'success',
    text: 'Active',
  },
};

export const BookingStatusBadgeConfig: Record<BookingStatus, BadgeConfig> = {
  [BookingStatus.INITIALIZED]: {
    variant: 'outline',
    text: 'Initialized',
  },
  [BookingStatus.PENDING]: {
    variant: 'secondary',
    text: 'Pending',
  },
  [BookingStatus.ACCEPTED]: {
    variant: 'default',
    text: 'Accepted',
  },
  [BookingStatus.IN_PROGRESS]: {
    variant: 'warning',
    text: 'In Progress',
  },
  [BookingStatus.REJECTED]: {
    variant: 'destructive',
    text: 'Rejected',
  },
  [BookingStatus.RESCHEDULED]: {
    variant: 'secondary',
    text: 'Rescheduled',
  },
  [BookingStatus.CANCELED]: {
    variant: 'destructive',
    text: 'Canceled',
  },
  [BookingStatus.COMPLETED]: {
    variant: 'success',
    text: 'Completed',
  },
  [BookingStatus.FAILED]: {
    variant: 'destructive',
    text: 'Failed',
  },
  [BookingStatus.NO_SHOW_REQUESTED]: {
    variant: 'warning',
    text: 'No-Show Request',
  },
  [BookingStatus.NO_SHOW_CONFIRMED]: {
    variant: 'success',
    text: 'No-Show Confirmed',
  },
  [BookingStatus.NO_SHOW_REJECTED]: {
    variant: 'destructive',
    text: 'No-Show Rejected',
  },
};

export const TransactionStatusBadgeConfig: Record<TransactionStatus, BadgeConfig> = {
  [TransactionStatus.PENDING]: {
    variant: 'secondary',
    text: 'Pending',
  },
  [TransactionStatus.SUCCESS]: {
    variant: 'success',
    text: 'Success',
  },
  [TransactionStatus.FAILED]: {
    variant: 'destructive',
    text: 'Failed',
  },
};

export const TransactionFlowBadgeConfig: Record<TransactionFlow, BadgeConfig> = {
  [TransactionFlow.CREDIT]: {
    variant: 'success',
    text: 'Credit',
  },
  [TransactionFlow.DEBIT]: {
    variant: 'destructive',
    text: 'Debit',
  },
};

export const TransactionTypeBadgeConfig: Record<TransactionType, BadgeConfig> = {
  [TransactionType.WALLET_FUNDING]: {
    variant: 'success',
    text: 'Wallet Funding',
  },
  [TransactionType.UNKNOWN]: {
    variant: 'secondary',
    text: 'Unknown',
  },
  [TransactionType.BOOKING_PAYMENT]: {
    variant: 'warning',
    text: 'Booking Payment',
  },
  [TransactionType.BOOKING_REMITTANCE]: {
    variant: 'success',
    text: 'Booking Remittance',
  },
  [TransactionType.SUBSCRIPTION_PAYMENT]: {
    variant: 'success',
    text: 'Subscription Payment',
  },
  [TransactionType.WITHDRAWAL]: {
    variant: 'secondary',
    text: 'Subscription Payment',
  },
};

export const SubscriptionStatusBadgeConfig: Record<SubscriptionStatus, BadgeConfig> = {
  [SubscriptionStatus.ACTIVE]: {
    variant: 'success',
    text: 'Active',
  },
  [SubscriptionStatus.CANCELLED]: {
    variant: 'destructive',
    text: 'Cancelled',
  },
  [SubscriptionStatus.OVERDUE]: {
    variant: 'warning',
    text: 'Overdue',
  },
  [SubscriptionStatus.TRIAL]: {
    variant: 'default',
    text: 'Trial',
  },
  [SubscriptionStatus.CANCELLED_PENDING]: {
    variant: 'outline',
    text: 'Cancelling',
  },
};
