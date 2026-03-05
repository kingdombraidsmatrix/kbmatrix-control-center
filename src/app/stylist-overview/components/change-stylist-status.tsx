import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { UpdateStylistStatusRequest } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx';
import { StylistStatus } from '@/types';
import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { useUpdateStylistStatus } from '@/services/stylists';
import { handleHttpError } from '@/lib/utils.ts';
import { Textarea } from '@/components/text-input';

interface ChangeStylistStatusProps {
  stylistId: number;
  currentStatus: StylistStatus;
}
export function ChangeStylishStatus(props: ChangeStylistStatusProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-w-40">
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Change Status
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <StatusForm onClose={() => setIsDialogOpen(false)} {...props} />
      </Dialog>
    </div>
  );
}

interface StatusFormProps extends ChangeStylistStatusProps {
  onClose: () => void;
}
function StatusForm({ onClose, stylistId, currentStatus }: StatusFormProps) {
  const formSchema = z.object({
    status: z.nativeEnum(StylistStatus, { message: 'Status is required' }),
    note: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      status: currentStatus,
      note: '',
    },
  });

  const { mutateAsync, isPending } = useUpdateStylistStatus(stylistId);
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    (values: UpdateStylistStatusRequest) => {
      mutateAsync(values)
        .then(({ data }) => {
          toast.success('Status updated successfully.');
          queryClient.setQueryData(['stylist', stylistId], data);
          queryClient.invalidateQueries({ queryKey: ['stylists'] });
          onClose();
        })
        .catch((err) => handleHttpError(err, form));
    },
    [onClose, queryClient, stylistId, mutateAsync, form],
  );

  const statusOptions = useMemo(
    () => [
      { label: 'Active', value: StylistStatus.ACTIVE },
      { label: 'In Review', value: StylistStatus.IN_REVIEW },
      { label: 'Suspended', value: StylistStatus.SUSPENDED },
      { label: 'Disabled', value: StylistStatus.DISABLED },
    ],
    [],
  );

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <FieldGroup>
              <Controller
                name="status"
                defaultValue={currentStatus}
                disabled={isPending}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="vertical" data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-select-role">Status</FieldLabel>
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
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>

            <Textarea
              control={form.control}
              name="note"
              label="Note"
              placeholder="Note (Optional)"
              className="max-h-40"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={!form.formState.isValid || isPending}>
              {isPending && <Loader2 className="animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
