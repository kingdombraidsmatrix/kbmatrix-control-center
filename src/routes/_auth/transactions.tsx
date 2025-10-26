import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/app/transactions/transactions-page.tsx';

export const Route = createFileRoute('/_auth/transactions')({
  component: TransactionsPage,
});
