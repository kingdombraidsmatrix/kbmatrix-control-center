import type { Page } from '@/types';
import type { CouponUsage, CouponUsageStatus } from '@/types/coupons.ts';
import { useHttpQueryService } from '@/services/http';

export interface CouponUsagesFilter {
  couponId?: number;
  status?: CouponUsageStatus;
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetCouponUsagesService(params: CouponUsagesFilter) {
  return useHttpQueryService<Page<CouponUsage>>({
    url: '/api/v1/coupon/usage/all',
    queryKey: ['coupon-usage', params],
    params,
  });
}
