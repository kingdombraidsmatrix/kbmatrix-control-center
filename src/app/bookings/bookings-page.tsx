import { PageHeader } from '@/components/page-header';
import { BookingsTable } from '@/app/bookings/components/bookings-table.tsx';

export function BookingsPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="See all bookings">Bookings</PageHeader>

      <BookingsTable />
    </div>
  );
}
