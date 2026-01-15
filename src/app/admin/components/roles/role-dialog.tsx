import React, { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Role } from '@/types';
import type { FilterOption } from '@/components/multi-select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { handleHttpError } from '@/lib/utils.ts';
import { Form } from '@/components/ui/form.tsx';
import { TextInput, Textarea } from '@/components/text-input';
import { Button } from '@/components/ui/button.tsx';
import {
  useCreateRoleService,
  useGetPermissionsService,
  useUpdateRoleService,
} from '@/services/admin';
import { MultiSelect } from '@/components/multi-select';

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z
    .string()
    .min(0, { message: 'Description is required' })
    .max(255, { message: 'Description too long, cannot exceed 255 characters' }),
  permissions: z.set(z.string()).min(1, 'At least one permission is required'),
});

type FormType = z.infer<typeof formSchema>;

interface RoleDialogProps {
  action?: 'new' | 'edit';
  trigger: React.ReactNode;
  initialValue?: Role;
}
export function RoleDialog({ trigger, ...props }: RoleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Content onOpenChange={onOpenChange} {...props} />
      </DialogContent>
    </Dialog>
  );
}

type ContentProps = Omit<RoleDialogProps, 'trigger'> & { onOpenChange: () => void };
function Content({ action = 'new', initialValue, onOpenChange }: ContentProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createRole, isPending: isCreatePending } = useCreateRoleService();
  const { mutateAsync: updateRole, isPending: isUpdatePending } = useUpdateRoleService();

  const config = useMemo(() => {
    if (action === 'edit') {
      return {
        title: 'Edit Role',
        description: "Manage role and save when you're done",
        submit: 'Update',
      };
    }
    return {
      title: 'New Role',
      description: "Create a new role and save when you're done",
      submit: 'Create',
    };
  }, [action]);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      id: initialValue?.id,
      name: initialValue?.name || '',
      description: initialValue?.description || '',
      permissions: new Set<string>(initialValue?.permissions || []),
    },
  });

  const handleSubmit = useCallback(
    (values: FormType) => {
      const actionFn = action === 'new' ? createRole : updateRole;

      const resolvedValue = {
        ...values,
        permissions: Array.from(values.permissions),
      };

      actionFn(resolvedValue)
        .then(() => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: ['roles'] });
          onOpenChange();
        })
        .catch((error) => {
          handleHttpError(error, form);
        });
    },
    [action, queryClient],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 mt-6 mb-8">
          <TextInput control={form.control} name="name" label="Name" placeholder="Name" />
          <Textarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            className="max-h-40"
          />

          <PermissionsField />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!form.formState.isValid || isCreatePending || isUpdatePending}
          >
            {(isCreatePending || isUpdatePending) && <Loader2 className="animate-spin" />}
            {config.submit}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

function PermissionsField() {
  const { data } = useGetPermissionsService();
  const { watch, setValue, trigger } = useFormContext<FormType>();
  const value = watch('permissions');
  const onChange = (values: Set<string>) => {
    setValue('permissions', values);
    trigger('permissions');
  };

  const options: Array<FilterOption> = useMemo(
    () =>
      data?.flatMap((group) =>
        group.permissions.map((permission) => ({
          label: permission.name,
          value: permission.value,
        })),
      ) || [],
    [data],
  );

  return <MultiSelect label="Permissions" options={options} value={value} onChange={onChange} />;
}
