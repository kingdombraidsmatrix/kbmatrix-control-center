import type { CreateServiceCategory, ServiceCategory } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useCreateServiceCategoryService() {
  return useHttpMutationService<CreateServiceCategory, ServiceCategory>({
    url: '/api/v1/service/category',
    method: 'POST',
  });
}
