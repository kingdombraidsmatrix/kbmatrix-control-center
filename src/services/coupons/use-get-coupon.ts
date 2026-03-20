import type { Coupon } from '@/types/coupons.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetCoupon(couponId: number) {
  return useHttpQueryService<Coupon>({
    url: `/api/v1/coupon/${couponId}`,
    queryKey: ['coupon', couponId],
  });
}
