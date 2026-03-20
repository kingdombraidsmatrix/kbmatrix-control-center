import type { Control } from 'react-hook-form';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import { FormControl, FormField } from '@/components/ui/form.tsx';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';

interface CheckboxInputProps extends CheckboxProps {
  control: Control<any, any, any>;
  name: string;
  description?: string;
  label?: string;
}
export function CheckboxInput({ control, name, description, label, ...props }: CheckboxInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal">
          <FormControl>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={!!fieldState.error}
              {...props}
            />
          </FormControl>
          <FieldContent>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <FieldDescription>{description}</FieldDescription>
            <FieldError>{fieldState.error?.message}</FieldError>
          </FieldContent>
        </Field>
      )}
    />
  );
}
