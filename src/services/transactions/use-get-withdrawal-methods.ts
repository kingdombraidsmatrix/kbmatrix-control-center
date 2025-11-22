import type { PaymentMethod } from '@/types/transactions.types.ts';
import type { Page } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface UseGetPaymentMethodsParams {
  userId: number;
  stylistId: number;
  sort?: string;
}
export function useGetWithdrawalMethods(params: Partial<UseGetPaymentMethodsParams> = {}) {
  return useHttpQueryService<
    Page<PaymentMethod>,
    Partial<UseGetPaymentMethodsParams>,
    Array<PaymentMethod>
  >({
    url: '/api/v1/payment-method/withdrawal',
    queryKey: ['withdrawal-methods', params],
    params: { ...params, sort: 'createdAt,desc' },
    select: (data) => data.content,
  });
}
