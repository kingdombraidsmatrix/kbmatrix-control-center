import { useMemo } from 'react';
import type { BadgeConfig, BadgeProps, BooleanBadge } from '@/components/badge/badge.type.ts';
import { BadgeContext } from '@/components/badge/badge.type.ts';
import {
  AdminStatusBadgeConfig,
  BookingStatusBadgeConfig,
  BooleanBadgeConfig,
  StylistStatusBadgeConfig,
  SubscriptionStatusBadgeConfig,
  TransactionFlowBadgeConfig,
  TransactionStatusBadgeConfig,
  TransactionTypeBadgeConfig,
  UserStatusBadgeConfig,
} from '@/components/badge/badge.config.ts';

export function useBadgeConfig(props: BadgeProps): BadgeConfig {
  return useMemo(() => {
    const map = {
      [BadgeContext.BOOLEAN]: BooleanBadgeConfig((props as BooleanBadge).valueLabel),
      [BadgeContext.USER_STATUS]: UserStatusBadgeConfig,
      [BadgeContext.BOOKING_STATUS]: BookingStatusBadgeConfig,
      [BadgeContext.TRANSACTION_TYPE]: TransactionTypeBadgeConfig,
      [BadgeContext.TRANSACTION_STATUS]: TransactionStatusBadgeConfig,
      [BadgeContext.TRANSACTION_FLOW]: TransactionFlowBadgeConfig,
      [BadgeContext.SUBSCRIPTION_STATUS]: SubscriptionStatusBadgeConfig,
      [BadgeContext.STYLIST_STATUS]: StylistStatusBadgeConfig,
      [BadgeContext.ADMIN_STATUS]: AdminStatusBadgeConfig,
    };

    const value =
      props.context === BadgeContext.BOOLEAN ? (props.value ? 'true' : 'false') : props.value;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map[props.context][value] ?? { text: props.value, variant: 'secondary' }
    );
  }, [props]);
}
