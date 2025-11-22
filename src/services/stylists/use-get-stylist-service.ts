import type { Stylist } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetStylistService(id: string) {
  return useHttpQueryService<Stylist>({
    url: `/api/v1/stylist/${id}`,
    queryKey: ['stylist', id],
  });
}
