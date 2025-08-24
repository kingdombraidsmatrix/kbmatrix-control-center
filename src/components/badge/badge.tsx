import type { BadgeProps } from '@/components/badge';
import { Badge as ShadBadge } from '@/components/ui/badge.tsx';
import { useBadgeConfig } from '@/components/badge/useBadge.ts';

export function Badge(props: BadgeProps) {
  const { text, variant } = useBadgeConfig(props);

  return <ShadBadge variant={variant}>{text}</ShadBadge>;
}
