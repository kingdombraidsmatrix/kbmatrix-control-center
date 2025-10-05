import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { SelectInput } from '@/components/text-input';
import { useGetCountries } from '@/services/geo';

interface CountryFieldProps {
  form: UseFormReturn<PlanRequest>;
  disabled?: boolean;
}
export function CountryField({ form, disabled }: CountryFieldProps) {
  const { data, isLoading } = useGetCountries();

  return (
    <SelectInput
      control={form.control}
      label="Country"
      placeholder="Select Country"
      name="countryCode"
      options={data?.content.map((c) => ({ label: c.name, value: c.code })) ?? []}
      disabled={isLoading || disabled}
    />
  );
}
