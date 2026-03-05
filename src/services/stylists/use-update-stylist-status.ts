import type { Stylist, UpdateStylistStatusRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateStylistStatus(stylistId: number) {
  return useHttpMutationService<UpdateStylistStatusRequest, Stylist>({
    url: `/api/v1/stylist/${stylistId}/status`,
    method: 'PUT',
  });
}
