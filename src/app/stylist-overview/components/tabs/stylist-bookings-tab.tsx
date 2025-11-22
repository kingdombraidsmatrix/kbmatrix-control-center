import type { Stylist } from '@/types';
import { BookingsTable } from '@/components/shared/bookings/bookings-table.tsx';

interface StylistBookingsTabProps {
  stylist: Stylist;
}
export function StylistBookingsTab({ stylist }: StylistBookingsTabProps) {
  return <BookingsTable filters={{ stylistId: stylist.id }} />;
}
