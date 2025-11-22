import { PageHeader } from '@/components/page-header';
import { BookingsTable } from '@/components/shared/bookings/bookings-table.tsx';

export function BookingsPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="See all bookings">Bookings</PageHeader>

      <BookingsTable />
    </div>
  );
}
