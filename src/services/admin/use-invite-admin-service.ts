import type { InviteAdminRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useInviteAdminService() {
  return useHttpMutationService<InviteAdminRequest, string>({
    url: '/api/v1/user/admin/invite',
    method: 'POST',
  });
}
