import { useCallback } from 'react';
import type { Control } from 'react-hook-form';
import { MultiSelect } from '@/components/text-input';
import { useGetStylistsWithMutationService } from '@/services/stylists';

interface StylistSelectProps {
  name: string;
  control: Control<any, any, any>;
  className?: string;
}
export function StylistSelect({ name, control, className }: StylistSelectProps) {
  const { mutateAsync } = useGetStylistsWithMutationService();

  const onSearch = useCallback(
    async (query: string) => {
      const { data } = await mutateAsync({ search: query });
      return data.content.map((stylist) => ({ label: stylist.name, value: stylist.id }));
    },
    [mutateAsync],
  );

  return (
    <MultiSelect
      control={control}
      onSearch={onSearch}
      name={name}
      className={className}
      label="Select Stylists"
      placeholder="Select Stylists"
    />
  );
}
