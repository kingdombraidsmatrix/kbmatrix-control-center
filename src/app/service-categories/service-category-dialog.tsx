import React, { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import type { CreateServiceCategory, ServiceCategory, UpdateServiceCategory } from '@/types';
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
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { useCreateServiceCategoryService } from '@/services/services/use-create-service-category.ts';
import { useUpdateServiceCategoryService } from '@/services/services/use-update-service-category.ts';
import { handleHttpError } from '@/lib/utils.ts';
import { TextInput, Textarea } from '@/components/text-input';
import { Loader2 } from 'lucide-react';

interface ServiceCategoryDialogProps {
  action?: 'new' | 'edit';
  trigger: React.ReactNode;
  initialValue?: ServiceCategory;
}
export function ServiceCategoryDialog({ trigger, ...props }: ServiceCategoryDialogProps) {
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

type ContentProps = Omit<ServiceCategoryDialogProps, 'trigger'> & { onOpenChange: () => void };
function Content({ action = 'new', initialValue, onOpenChange }: ContentProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: createServiceCategory, isPending: isCreatePending } =
    useCreateServiceCategoryService();
  const { mutateAsync: updateServiceCategory, isPending: isUpdatePending } =
    useUpdateServiceCategoryService();

  const config = useMemo(() => {
    if (action === 'edit') {
      return {
        title: 'Edit Service Category',
        description: "Manage service category and save when you're done",
        submit: 'Update',
      };
    }
    return {
      title: 'New Service Category',
      description: "Create a new general service category and save when you're done",
      submit: 'Create',
    };
  }, [action]);

  const formSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: 'Username is required' }),
    description: z
      .string()
      .min(0, { message: 'Description is required' })
      .max(255, { message: 'Description too long, cannot exceed 255 characters' }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue ?? {
      name: '',
      description: '',
    },
  });

  const handleSubmit = useCallback(
    (values: CreateServiceCategory & UpdateServiceCategory) => {
      const actionFn = action === 'new' ? createServiceCategory : updateServiceCategory;

      actionFn(values)
        .then(() => {
          form.reset();
          queryClient.invalidateQueries({ queryKey: ['service', 'categories'] });
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!form.formState.isValid || isCreatePending || isUpdatePending}
          >
            {isCreatePending || (isUpdatePending && <Loader2 className="animate-spin" />)}
            {config.submit}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
