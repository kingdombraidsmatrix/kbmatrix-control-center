import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button.tsx';

export function PlansPage() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Subscription Plans</h3>
        <Link to="/settings/plans/$countryCode" params={{ countryCode: 'new' }}>
          <Button>Add New</Button>
        </Link>
      </div>
    </div>
  );
}
