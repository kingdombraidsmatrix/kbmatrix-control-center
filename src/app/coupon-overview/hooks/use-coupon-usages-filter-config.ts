import type { FilterConfig } from '@/components/filter';
import { CouponUsageStatus } from '@/types/coupons.ts';

export function useCouponUsagesFilterConfig(): FilterConfig {
  return [
    {
      type: 'single-select',
      columnKey: 'status',
      name: 'Status',
      options: [
        { label: 'Applied', value: CouponUsageStatus.APPLIED },
        { label: 'Cancelled', value: CouponUsageStatus.CANCELLED },
        { label: 'Refunded', value: CouponUsageStatus.REFUNDED },
        { label: 'Reserved', value: CouponUsageStatus.RESERVED },
      ],
    },
  ];
}
