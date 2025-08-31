import { Button } from '@/components/ui/button.tsx';

export function ServiceCategoriesPage() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Service Categories</h3>
        <Button>Add New</Button>
      </div>
    </div>
  );
}
