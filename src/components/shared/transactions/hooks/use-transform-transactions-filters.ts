import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type {
  TransactionFlow,
  TransactionStatus,
  TransactionType,
  TransactionsFilter,
} from '@/types/transactions.types.ts';

export function useTransformTransactionsFilters(filters: ColumnFiltersState) {
  return useMemo(() => {
    const mappedFilters: Partial<TransactionsFilter> = {};

    for (const filter of filters) {
      switch (filter.id) {
        case 'reference':
          mappedFilters.reference = filter.value as string;
          break;

        case 'transactionFlow':
          mappedFilters.transactionFlow = filter.value as TransactionFlow;
          break;

        case 'transactionType':
          mappedFilters.transactionType = filter.value as TransactionType;
          break;

        case 'transactionStatus':
          mappedFilters.transactionStatus = filter.value as TransactionStatus;
          break;
      }
    }

    return mappedFilters;
  }, [filters]);
}
