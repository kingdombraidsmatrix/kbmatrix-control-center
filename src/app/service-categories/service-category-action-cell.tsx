import { MoreVertical } from 'lucide-react';
import type { ServiceCategory } from '@/types';
import { Button } from '@/components/ui/button.tsx';
import { ServiceCategoryDialog } from '@/app/service-categories/service-category-dialog.tsx';

interface ServiceCategoryActionCellProps {
  category: ServiceCategory;
}
export function ServiceCategoryActionCell({ category }: ServiceCategoryActionCellProps) {
  return (
    <ServiceCategoryDialog
      action="edit"
      initialValue={category}
      trigger={
        <Button size="icon" variant="secondary">
          <MoreVertical />
        </Button>
      }
    />
  );
}
