import { Button } from '@/components/ui/button.tsx';

export function PlansPage() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Subscription Plans</h3>
        <Button>Add New</Button>
      </div>
    </div>
  );
}
