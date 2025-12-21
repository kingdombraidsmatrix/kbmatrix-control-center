import type { TransactionsFilter } from '@/types/transactions.types.ts';
import { useHttpMutationService } from '@/services/http';

export function useExportTransactions(filters: Partial<TransactionsFilter> = {}) {
  const { mutate } = useHttpMutationService<undefined, string>(
    {
      url: '/api/v1/export/transactions',
      method: 'POST',
    },
    {
      params: filters,
    },
  );

  return { exportTransactions: mutate };
}
