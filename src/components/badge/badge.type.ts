import type { badgeVariants } from '@/components/ui/badge.tsx';
import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { UserStatus } from '@/types';
import type { BookingStatus } from '@/types/bookings.types.ts';
import {
  TransactionFlow,
  type TransactionStatus,
  TransactionType,
} from '@/types/transactions.types.ts';

export enum BadgeContext {
  BOOLEAN = 'BOOLEAN',
  USER_STATUS = 'USER_STATUS',
  BOOKING_STATUS = 'BOOKING',
  TRANSACTION_STATUS = 'TRANSACTION_STATUS',
  TRANSACTION_FLOW = 'TRANSACTION_FLOW',
  TRANSACTION_TYPE = 'TRANSACTION_TYPE',
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

export type BadgeProps =
  | BooleanBadge
  | UserStatusBadge
  | BookingStatusBadge
  | TransactionStatusBadge
  | TransactionFlowBadge
  | TransactionTypeBadge;

export interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant'];
  text: string;
  icon?: LucideIcon;
}
