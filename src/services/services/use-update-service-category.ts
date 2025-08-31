import type { ServiceCategory, UpdateServiceCategory } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateServiceCategoryService() {
  return useHttpMutationService<UpdateServiceCategory, ServiceCategory>({
    url: '/api/v1/service/category',
    method: 'PUT',
  });
}
