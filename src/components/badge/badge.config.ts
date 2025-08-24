import type { BadgeConfig } from '@/components/badge/badge.type.ts';
import { UserStatus } from '@/types';

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
