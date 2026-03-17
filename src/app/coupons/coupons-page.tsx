import { PageHeader } from '@/components/page-header';
import { CouponsTable } from '@/app/coupons/components/coupons-table.tsx';

export function CouponsPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="See all coupons">Coupons</PageHeader>

      <CouponsTable />
    </div>
  );
}
