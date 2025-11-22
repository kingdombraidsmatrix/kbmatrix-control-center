import { PageHeader } from '@/components/page-header';
import { StylistsOverview } from '@/app/stylists/components/stylists-overview.tsx';
import { StylistsTable } from '@/app/stylists/components/stylists-table.tsx';
import { Breadcrumb } from '@/components/breadcrumb';

export function StylistsPage() {
  return (
    <div className="grid gap-4">
      <Breadcrumb items={[{ title: 'Stylists' }]} />
      <PageHeader subtitle="Review and approve stylists, manage applications and monitor performance">
        Stylists
      </PageHeader>

      <StylistsOverview />

      <StylistsTable />
    </div>
  );
}
