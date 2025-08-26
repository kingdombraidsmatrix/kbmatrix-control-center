import { CustomersOverview } from '@/app/customers/components/customers-overview.tsx';
import { StylistsOverview } from '@/app/stylists/components/stylists-overview.tsx';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <CustomersOverview />
      <StylistsOverview />
    </div>
  );
}
