import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

export interface DynamicInputProps<TData extends FieldValues = any> {
  form: UseFormReturn<TData>;
  name: FieldPath<TData>;
  placeholder?: string;
  label?: string;
}
