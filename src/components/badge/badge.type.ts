import type { badgeVariants } from '@/components/ui/badge.tsx';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { UserStatus } from '@/types';
import type { BookingStatus } from '@/types/bookings.types.ts';

export enum BadgeContext {
  BOOLEAN = 'BOOLEAN',
  USER_STATUS = 'USER_STATUS',
  BOOKING_STATUS = 'BOOKING',
}

interface BooleanBadge {
  context: BadgeContext.BOOLEAN;
  value: boolean;
}

interface UserStatusBadge {
  context: BadgeContext.USER_STATUS;
  value: UserStatus;
}

interface BookingStatusBadge {
  context: BadgeContext.BOOKING_STATUS;
  value: BookingStatus;
}

export type BadgeProps = BooleanBadge | UserStatusBadge | BookingStatusBadge;

export interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  text: string;
  icon?: LucideIcon;
}
