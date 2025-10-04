import { CircleMinus, Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import type { FeatureInputProps, FieldName } from '@/app/plan-create/types.ts';
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
import { TextInput, Textarea } from '@/components/text-input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Switch } from '@/components/ui/switch.tsx';
import { FeeInput } from '@/app/plan-create/components/fee-feature-field.tsx';

function NumberTextInput({ form, name, feature }: FeatureInputProps) {
  return (
    <TextInput
      control={form.control}
      name={name}
      placeholder={feature.name}
      type="number"
      min={0}
    />
  );
}

function StringTextInput({ form, name, feature }: FeatureInputProps) {
  return <TextInput control={form.control} name={name} placeholder={feature.name} />;
}

function BooleanInput({ form, name }: FeatureInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const ValueTypeMap = {
  [FeatureValueType.NUMBER]: NumberTextInput,
  [FeatureValueType.STRING]: StringTextInput,
  [FeatureValueType.BOOLEAN]: BooleanInput,
  [FeatureValueType.FEE]: FeeInput,
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
              <ValueTypeField feature={feature} name={`${name}.value` as FieldName} form={form} />
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
