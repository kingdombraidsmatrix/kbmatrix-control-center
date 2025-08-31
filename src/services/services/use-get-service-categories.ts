import type { Page } from '@/types/common.types.ts';
import type { ServiceCategory } from '@/types/service.types.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetCustomersServiceParams {
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetServiceCategories(params: UseGetCustomersServiceParams) {
  return useHttpQueryService<Page<ServiceCategory>>({
    url: '/api/v1/service/category',
    queryKey: ['service', 'categories', params],
    params,
  });
}
