import type { FilterOption } from '@/components/multi-select';

export type FilterType = 'multi-select' | 'single-select' | 'text' | 'date-range';

interface BaseFilter {
  type: FilterType;
  name: string;
}

export interface FilterSelect extends BaseFilter {
  type: 'multi-select' | 'single-select';
  columnKey: string;
  options: Array<FilterOption>;
}

export interface FilterText extends BaseFilter {
  columnKey: string;
  type: 'text';
}

export interface FilterDateRange extends BaseFilter {
  type: 'date-range';
  startColumnKey: string;
  endColumnKey: string;
}

export type FilterConfig = Array<FilterSelect | FilterText | FilterDateRange>;
