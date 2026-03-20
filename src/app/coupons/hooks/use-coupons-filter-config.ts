import type { FilterConfig } from '@/components/filter';

export function useCouponsFilterConfig(): FilterConfig {
  return [
    {
      type: 'text',
      name: 'Search',
      columnKey: 'name',
    },
  ];
}
