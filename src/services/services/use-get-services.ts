import type { Page, Service } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface UseGetServicesParams {
  stylistId?: number;
  published?: boolean;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export function useGetServices(params: UseGetServicesParams = {}) {
  return useHttpQueryService<Page<Service>>({
    url: '/api/v1/service',
    queryKey: ['services', params],
    params,
  });
}
