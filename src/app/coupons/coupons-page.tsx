import { PageHeader } from '@/components/page-header';
import { CouponsTable } from '@/app/coupons/components/coupons-table.tsx';
import { Breadcrumb } from '@/components/breadcrumb';

export function CouponsPage() {
  return (
    <div className="grid gap-4">
      <Breadcrumb items={[{ title: 'Coupons' }]} />

      <PageHeader subtitle="See all coupons">Coupons</PageHeader>

      <CouponsTable />
    </div>
  );
}
