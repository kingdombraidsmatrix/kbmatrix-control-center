import type { FilterConfig } from '@/components/filter';

export function useCustomersFilterConfig(): FilterConfig {
  return [
    {
      type: 'text',
      name: 'Search',
      columnKey: 'name',
    },
    {
      type: 'multi-select',
      name: 'Status',
      columnKey: 'status',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Suspended', value: 'SUSPENDED' },
        { label: 'In Review', value: 'IN_REVIEW' },
        { label: 'Scheduled for Deletion', value: 'SCHEDULED_FOR_DELETION' },
        { label: 'Deleted', value: 'DELETED' },
      ],
    },
  ];
}
