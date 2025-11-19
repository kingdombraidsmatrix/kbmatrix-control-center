import type { Stylist } from '@/types';
import { TransactionsTable } from '@/components/shared/transactions/transactions-table.tsx';

interface StylistTransactionsTabProps {
  stylist: Stylist;
}
export function StylistTransactionsTab({ stylist }: StylistTransactionsTabProps) {
  return <TransactionsTable filters={{ stylistId: stylist.id }} />;
}
