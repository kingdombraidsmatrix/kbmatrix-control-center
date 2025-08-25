import { PageHeader } from '@/components/page-header';
import { CustomersOverview } from '@/app/customers/components/customers-overview.tsx';
import { CustomersTable } from '@/app/customers/components/customers-table.tsx';

export function CustomersPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="Manage customers booking hair services across the platform">
        Customers
      </PageHeader>

      <CustomersOverview />

      <CustomersTable />
    </div>
  );
}
