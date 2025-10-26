import type { BadgeConfig } from '@/components/badge/badge.type.ts';
import { UserStatus } from '@/types';
import { BookingStatus } from '@/types/bookings.types';

export const BooleanBadgeConfig: Record<'true' | 'false', BadgeConfig> = {
  true: {
    variant: 'default',
    text: 'True',
  },
  false: {
    variant: 'secondary',
    text: 'False',
  },
};

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
