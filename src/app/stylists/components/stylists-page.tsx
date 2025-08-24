import { PageHeader } from '@/components/page-header'
import { StylistsOverview } from '@/app/stylists/components/stylists-overview.tsx';
import { StylistsTable } from '@/app/stylists/components/stylists-table.tsx';

export function StylistsPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="Review and approve stylists, manage applications and monitor performance">
        Stylists
      </PageHeader>

      <StylistsOverview />

      <StylistsTable />
    </div>
  )
}
