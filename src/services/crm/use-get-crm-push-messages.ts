import type { Page } from '@/types';
import type { BroadcastPushListItem } from '@/types/crm.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetCrmPushMessagesParams {
  page: number;
  size: number;
  sort: string;
}
export function useGetCrmPushMessages(params: Partial<UseGetCrmPushMessagesParams> = {}) {
  return useHttpQueryService<Page<BroadcastPushListItem>>({
    url: '/api/v1/crm/broadcast/push',
    queryKey: ['crmPushMessages', params],
    params: { sort: 'createdAt,desc', ...params },
  });
}
