import { useCallback } from 'react';
import type { Control } from 'react-hook-form';
import { MultiSelect } from '@/components/text-input';
import { useGetCustomerWithMutationService } from '@/services/customers';

interface CustomerSelectProps {
  name: string;
  control: Control<any, any, any>;
  className?: string;
}
export function CustomerSelect({ name, control, className }: CustomerSelectProps) {
  const { mutateAsync } = useGetCustomerWithMutationService();

  const onSearch = useCallback(
    async (query: string) => {
      const { data } = await mutateAsync({ search: query });
      return data.content.map((user) => ({ label: user.fullName, value: user.id }));
    },
    [mutateAsync],
  );

  return (
    <MultiSelect
      control={control}
      onSearch={onSearch}
      name={name}
      className={className}
      label="Select Customers"
      placeholder="Select Customers"
    />
  );
}
