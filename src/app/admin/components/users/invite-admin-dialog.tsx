import { useCallback, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TextInput } from '@/components/text-input';
import { useInviteAdminService } from '@/services/admin';
import { RoleField } from '@/app/admin/components/users/admin-role-field.tsx';

export function InviteAdminDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Invite Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Content onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

interface ContentProps {
  onClose: () => void;
}
function Content({ onClose }: ContentProps) {
  const { mutateAsync, isPending: isInviting } = useInviteAdminService();
  const queryClient = useQueryClient();

  const formSchema = z.object({
    roleId: z.coerce.number(),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: FormType) => {
    mutateAsync(values)
      .then(() => {
        toast.success('Admin invited successfully');
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        onClose();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || 'Something went wrong, unable to invite admin.',
        );
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Invite new admin</DialogTitle>
        </DialogHeader>
        <div className="my-6 space-y-4">
          <TextInput
            control={form.control}
            name="email"
            type="email"
            label="Email Address"
            placeholder="Email Address"
          />

          <RoleField label="Role" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={!form.formState.isValid || isInviting}>
            {isInviting && <Loader2 className="animate-spin" />}
            Invite
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
