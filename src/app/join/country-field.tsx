import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useGetCountries } from '@/services/geo';

interface CountryFieldProps {
  className?: string;
}
export function CountryField({ className }: CountryFieldProps) {
  const form = useFormContext();
  const { data, isLoading } = useGetCountries({ page: 0, size: 100 });

  return (
    <FieldGroup className={className}>
      <Controller
        name="countryId"
        defaultValue=""
        disabled={isLoading}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="vertical" className="gap-2" data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor="form-rhf-select-role" className="leading-none">
                Country
              </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="form-rhf-select-role"
                aria-invalid={fieldState.invalid}
                className="min-w-[120px]"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                {data?.content.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
