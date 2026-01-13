import type { User } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateUserDetails() {
  return useHttpMutationService<FormData, User>(
    {
      url: '/api/v1/user/user-details',
      method: 'PUT',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
