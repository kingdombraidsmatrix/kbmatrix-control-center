import { PageHeader } from '@/components/page-header';
import { TransactionsTable } from '@/components/shared/transactions/transactions-table.tsx';

export function TransactionsPage() {
  return (
    <div className="grid gap-4">
      <PageHeader subtitle="See all transactions for bookings, wallet funding, subscriptions, withdrawal, etc">
        Transactions
      </PageHeader>

      <TransactionsTable />
    </div>
  );
}
