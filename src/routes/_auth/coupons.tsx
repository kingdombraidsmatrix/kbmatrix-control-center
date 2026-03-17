import { createFileRoute } from '@tanstack/react-router'
import { CouponsPage } from '@/app/coupons/coupons-page.tsx';

export const Route = createFileRoute('/_auth/coupons')({
  component: CouponsPage,
})
