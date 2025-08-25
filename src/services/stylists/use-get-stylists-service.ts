import type { Page } from '@/types/common.types.ts';
import type { Stylist } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface UseGetStylistsServiceParams {
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetStylistsService(params: UseGetStylistsServiceParams) {
  return useHttpQueryService<Page<Stylist>>({
    url: '/api/v1/stylist',
    queryKey: ['stylists', params],
    params,
  });
}
