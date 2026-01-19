import type { FilterConfig } from '@/components/filter';

export function useCustomersFilterConfig(): FilterConfig {
  return [
    {
      type: 'text',
      name: 'Search',
      columnKey: 'name',
    },
    {
      type: 'single-select',
      name: 'Status',
      columnKey: 'status',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Disabled', value: 'DISABLED' },
        { label: 'In Review', value: 'IN_REVIEW' },
        { label: 'Suspended', value: 'SUSPENDED' },
      ],
    },
  ];
}
