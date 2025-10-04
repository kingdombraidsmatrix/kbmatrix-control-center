import { useMemo } from 'react';
import type { UseFieldArrayAppend, UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { useGetFeatures } from '@/services/plans';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';

interface NewFeatureDropDownProps {
  append: UseFieldArrayAppend<PlanRequest>;
  form: UseFormReturn<PlanRequest>;
}
export function NewFeatureDropdown({ append, form: { watch } }: NewFeatureDropDownProps) {
  const { data, isLoading } = useGetFeatures();
  const planFeatures = watch('features');

  const selectedFeatures = useMemo(() => {
    return new Set(planFeatures.map((feature) => feature.feature));
  }, [planFeatures]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default-dashed" size="lg" className="w-full">
          Add new feature
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>All Features</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoading || !data ? (
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={() => {}}>
            Full App Access
          </DropdownMenuCheckboxItem>
        ) : (
          data.map((feature) => (
            <DropdownMenuCheckboxItem
              key={feature.key}
              checked={selectedFeatures.has(feature.key)}
              disabled={selectedFeatures.has(feature.key)}
              onClick={() =>
                append({
                  feature: feature.key,
                  description: feature.description,
                  value: feature.defaultValue,
                })
              }
            >
              {feature.name}
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
