import type { Page } from '@/types';
import type { Coupon } from '@/types/coupons.ts';
import { useHttpQueryService } from '@/services/http';

export interface UseGetCouponsServiceParams {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetCouponsService(params: UseGetCouponsServiceParams = {}) {
  return useHttpQueryService<Page<Coupon>>({
    url: '/api/v1/coupon',
    queryKey: ['coupons', params],
    params,
  });
}
