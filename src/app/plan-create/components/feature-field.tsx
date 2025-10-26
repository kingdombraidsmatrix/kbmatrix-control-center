import { CircleMinus, Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import type { FieldName } from '@/app/plan-create/types.ts';
import { FeatureValueType } from '@/types/plans.ts';
import { useGetFeatures } from '@/services/plans';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Textarea } from '@/components/text-input';
import { DynamicInput } from '@/components/dynamic-input';

const ValueTypeMap = {
  [FeatureValueType.NUMBER]: DynamicInput.NUMBER,
  [FeatureValueType.STRING]: DynamicInput.STRING,
  [FeatureValueType.BOOLEAN]: DynamicInput.BOOLEAN,
  [FeatureValueType.FEE]: DynamicInput.FEE,
};

interface FeatureFieldProps {
  remove: () => void;
  form: UseFormReturn<PlanRequest>;
  field: FieldArrayWithId<PlanRequest, 'features'>;
  name: string;
}
export function FeatureField({ remove, field, name, form }: FeatureFieldProps) {
  const { data, isLoading } = useGetFeatures();
  const feature = useMemo(() => data?.find((f) => f.key === field.feature), [data, field]);

  const ValueTypeField = ValueTypeMap[feature?.valueType || FeatureValueType.STRING];

  return (
    <Item variant="outline" className="items-start">
      <ItemContent>
        {isLoading || !feature ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <>
            <ItemTitle>{feature.name}</ItemTitle>
            <ItemDescription>{feature.description}</ItemDescription>
            <div className="mt-4 space-y-4">
              <Textarea
                control={form.control}
                name={`${name}.description`}
                label="Description"
                placeholder={feature.description}
              />
              <ValueTypeField
                placeholder={feature.name}
                name={`${name}.value` as FieldName}
                form={form}
              />
            </div>
          </>
        )}
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="destructive-alt" onClick={remove}>
          <CircleMinus />
        </Button>
      </ItemActions>
    </Item>
  );
}
