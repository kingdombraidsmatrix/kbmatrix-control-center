import { useFieldArray } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { NewFeatureDropdown } from '@/app/plan-create/components/new-feature-dropdown.tsx';
import { FeatureField } from '@/app/plan-create/components/feature-field.tsx';

interface FeaturesSectionProps {
  form: UseFormReturn<PlanRequest>;
}
export function FeaturesSection({ form }: FeaturesSectionProps) {
  const { fields, append, remove } = useFieldArray<PlanRequest>({
    control: form.control,
    name: 'features',
  });

  return (
    <div>
      <h4 className="font-semibold">Features</h4>

      <div className="grid gap-y-2 my-4">
        {fields.map((field, index) => (
          <FeatureField
            key={field.id}
            remove={() => remove(index)}
            form={form}
            field={field}
            name={`features.${index}`}
          />
        ))}
      </div>

      <NewFeatureDropdown append={append} form={form} />
    </div>
  );
}
