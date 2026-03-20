import type { CrmPushRequest } from '@/types/crm.ts';
import { useHttpMutationService } from '@/services/http';

export function useCrmPushNotificationService() {
  return useHttpMutationService<CrmPushRequest, string>({
    url: '/api/v1/crm/broadcast/push',
    method: 'POST',
  });
}
