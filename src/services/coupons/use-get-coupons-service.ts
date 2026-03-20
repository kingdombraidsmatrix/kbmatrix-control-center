import type { Page } from '@/types';
import type { CouponTrimmed } from '@/types/coupons.ts';
import { useHttpQueryService } from '@/services/http';

export interface UseGetCouponsServiceParams {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetCouponsService(params: UseGetCouponsServiceParams = {}) {
  return useHttpQueryService<Page<CouponTrimmed>>({
    url: '/api/v1/coupon',
    queryKey: ['coupons', params],
    params,
  });
}
