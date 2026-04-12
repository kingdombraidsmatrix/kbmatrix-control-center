import type { BroadcastPush } from '@/types/crm.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetCrmPushMessage(id: number) {
  return useHttpQueryService<BroadcastPush>({
    url: `/api/v1/crm/broadcast/push/${id}`,
    queryKey: ['crmPushMessage', id],
  });
}
