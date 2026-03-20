import { useMemo } from 'react';
import type { CouponUsagesFilter } from '@/services/coupons';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { CouponUsageStatus } from '@/types/coupons.ts';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformCouponUsagesFilter(filters: ColumnFiltersState) {
  const debouncedFilter = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<CouponUsagesFilter> = {};

    for (const filter of debouncedFilter) {
      switch (filter.id) {
        case 'status':
          mappedFilters.status = filter.value as CouponUsageStatus;
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilter]);
}
