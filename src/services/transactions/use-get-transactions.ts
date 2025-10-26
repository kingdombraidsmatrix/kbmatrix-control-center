import type { Page } from '@/types';
import type { Transaction, TransactionsFilter } from '@/types/transactions.types.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetTransactions(params: Partial<TransactionsFilter> = {}) {
  return useHttpQueryService<Page<Transaction>>({
    url: '/api/v1/payment/transactions',
    queryKey: ['transactions', params],
    params,
  });
}
