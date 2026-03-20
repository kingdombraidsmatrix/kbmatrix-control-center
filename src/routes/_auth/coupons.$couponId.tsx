import { createFileRoute } from '@tanstack/react-router';
import { CouponOverviewPage } from '@/app/coupon-overview/coupon-overview-page.tsx';

export const Route = createFileRoute('/_auth/coupons/$couponId')({
  component: CouponOverviewPage,
});
