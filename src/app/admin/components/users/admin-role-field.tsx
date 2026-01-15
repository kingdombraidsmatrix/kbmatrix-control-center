import { Controller, useFormContext } from 'react-hook-form';
import { useGetRolesService } from '@/services/admin';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

interface RoleFieldProps {
  label?: string;
}
export function RoleField({ label }: RoleFieldProps) {
  const form = useFormContext();
  const { data, isLoading } = useGetRolesService({ page: 0, size: 100 });

  return (
    <FieldGroup>
      <Controller
        name="roleId"
        defaultValue=""
        disabled={isLoading}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="vertical" data-invalid={fieldState.invalid}>
            <FieldContent>
              {label && <FieldLabel htmlFor="form-rhf-select-role">{label}</FieldLabel>}
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
