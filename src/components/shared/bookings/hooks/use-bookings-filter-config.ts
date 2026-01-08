import type { FilterConfig } from '@/components/filter';

export function useBookingsFilterConfig(): FilterConfig {
  return [
    {
      type: 'multi-select',
      name: 'Status',
      columnKey: 'status',
      options: [
        { label: 'Initialized', value: 'INITIALIZED' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Accepted', value: 'ACCEPTED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Rescheduled', value: 'RESCHEDULED' },
        { label: 'Canceled', value: 'CANCELED' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Failed', value: 'FAILED' },
        { label: 'No-Show Requested', value: 'NO_SHOW_REQUESTED' },
        { label: 'No-Show Confirmed', value: 'NO_SHOW_CONFIRMED' },
        { label: 'No-Show Rejected', value: 'NO_SHOW_REJECTED' },
      ],
    },
  ];
}
