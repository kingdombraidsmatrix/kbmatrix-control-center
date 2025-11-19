import { Link } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { groupBy } from 'lodash-es';
import { Button } from '@/components/ui/button.tsx';
import { useGetPlansService } from '@/services/plans/use-get-plans-service.ts';
import { PlansTable } from '@/app/plans/components/plans-table.tsx';
import { CountryFlag } from '@/components/country-flag';

export function PlansPage() {
  const { data, isLoading } = useGetPlansService();
  const groupedPlans = useMemo(() => groupBy(data, 'country.code'), [data]);

  return (
    <div>
      <div className="flex items-center gap-5">
        <h3 className="font-semibold flex-1">Subscription Plans</h3>
        <Link to="/settings/plans/$planId" params={{ planId: 'new' }}>
          <Button>Add New</Button>
        </Link>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 bg-muted gap-4">
            <Loader2 className="size-6 animate-spin" />
            <p>Loading plans...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPlans).map(([key, value]) => (
              <div key={key} className="space-y-4">
                <div className="flex items-center gap-2">
                  <CountryFlag countryCode={key} />
                  <h4 className="font-semibold">{value[0].country.name}</h4>
                </div>

                <PlansTable plans={value.sort((a, b) => a.position - b.position)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
