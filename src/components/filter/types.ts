import type { ComponentType } from 'react';

export type FilterType = 'multi-select' | 'single-select' | 'text';

interface FilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}

interface BaseFilter {
  type: FilterType;
  columnKey: string;
  name: string;
}

export interface FilterSelect extends BaseFilter {
  type: 'multi-select' | 'single-select';
  options: Array<FilterOption>;
}

export interface FilterText extends BaseFilter {
  type: 'text';
}

export type FilterConfig = Array<FilterSelect | FilterText>;
