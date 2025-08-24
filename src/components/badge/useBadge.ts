import { useMemo } from 'react';
import type { BadgeConfig, BadgeProps } from '@/components/badge/badge.type.ts';
import { BadgeContext } from '@/components/badge/badge.type.ts';
import { BooleanBadgeConfig, UserStatusBadgeConfig } from '@/components/badge/badge.config.ts';

export function useBadgeConfig(props: BadgeProps): BadgeConfig {
  return useMemo(() => {
    const map = {
      [BadgeContext.BOOLEAN]: BooleanBadgeConfig,
      [BadgeContext.USER_STATUS]: UserStatusBadgeConfig,
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
