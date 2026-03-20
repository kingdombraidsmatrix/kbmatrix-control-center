import type { Page } from '@/types/common.types.ts';
import type { Stylist, StylistsFilter } from '@/types';
import { useHttpMutationService, useHttpQueryService } from '@/services/http';

interface UseGetStylistsServiceParams extends StylistsFilter {
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

export function useGetStylistsWithMutationService() {
  return useHttpMutationService<StylistsFilter, Page<Stylist>>({
    url: '/api/v1/stylist',
    method: 'GET',
  });
}
