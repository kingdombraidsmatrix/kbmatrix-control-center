import { useHttpMutationService } from '@/services/http';

export function useExportUsers(filters: {} = {}) {
  const { mutate } = useHttpMutationService<undefined, string>(
    {
      url: '/api/v1/export/users',
      method: 'POST',
    },
    {
      params: filters,
    },
  );

  return { exportUsers: mutate };
}
