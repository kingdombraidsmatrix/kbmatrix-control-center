import type { WalletBalance } from '@/types/transactions.types.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetBalanceProps {
  userId?: number;
  stylistId?: number;
}
export function useGetBalance(params: UseGetBalanceProps) {
  return useHttpQueryService<WalletBalance>({
    url: '/api/v1/wallet/balance',
    queryKey: ['balance', params],
    params,
  });
}
