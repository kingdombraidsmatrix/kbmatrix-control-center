import { useParams } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { CouponUsageTable } from './components/coupon-usage-table.tsx';
import { Breadcrumb } from '@/components/breadcrumb';
import { PageHeader } from '@/components/page-header';
import { useGetCoupon } from '@/services/coupons';
import { CouponDetails } from '@/app/coupon-overview/components/coupon-details.tsx';
import { CouponDetailsUsers } from '@/app/coupon-overview/components/coupon-details-users.tsx';

export function CouponOverviewPage() {
  const { couponId } = useParams({ from: '/_auth/coupons/$couponId' });
  const { data, isLoading, error } = useGetCoupon(Number(couponId));

  const title = useMemo(() => (data ? `Coupon #${data.code}` : 'Coupon'), [data]);

  return (
    <div className="grid gap-4">
      <Breadcrumb items={[{ title: 'Coupons', url: '/coupons' }, { title: 'Overview' }]} />

      <PageHeader subtitle="Coupon Details">{title}</PageHeader>

      {isLoading ? (
        <div className="flex gap-2">
          <Loader2 />
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex gap-2">
          <p>No data</p>
        </div>
      ) : (
        data && (
          <>
            <CouponDetails coupon={data} />
            <CouponDetailsUsers users={data.users} />
            <CouponUsageTable couponId={Number(couponId)} />
          </>
        )
      )}
    </div>
  );
}
