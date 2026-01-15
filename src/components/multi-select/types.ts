import type { ComponentType } from 'react';

export interface FilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}
