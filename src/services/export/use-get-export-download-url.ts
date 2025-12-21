import type { ExportResponse } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useGetExportDownloadUrl() {
  return useHttpMutationService<string, ExportResponse>((exportId) => ({
    url: `/api/v1/export/${exportId}`,
    method: 'POST',
  }));
}
