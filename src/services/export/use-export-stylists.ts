import { useHttpMutationService } from '@/services/http';

export function useExportStylists(filters: {} = {}) {
  const { mutate } = useHttpMutationService<undefined, string>(
    {
      url: '/api/v1/export/stylists',
      method: 'POST',
    },
    {
      params: filters,
    },
  );

  return { exportStylists: mutate };
}
