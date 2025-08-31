import { Button } from '@/components/ui/button.tsx';

export function SupportedCountiesPage() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Supported Countries</h3>
        <Button>Add New</Button>
      </div>
    </div>
  );
}
