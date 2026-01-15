import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Form } from '@/components/ui/form.tsx';
import { TextInput } from '@/components/text-input';
import { Button } from '@/components/ui/button.tsx';
import { useChangePasswordService } from '@/services/auth';

export function ProfileSecurity() {
  const { mutateAsync, isPending } = useChangePasswordService();

  const formSchema = z
    .object({
      oldPassword: z.string().min(1, 'Old password is required'),
      newPassword: z.string().min(6, 'Password must be at least 6 characters'),
      newPasswordConfirm: z.string().min(6, 'Password must be at least 6 characters'),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: 'Passwords do not match',
      path: ['newPasswordConfirm'],
    });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      mutateAsync(values)
        .then(() => {
          toast.success('Password changed successfully.');
          form.reset();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || 'Unable to change password');
        });
    },
    [mutateAsync, form],
  );

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Change password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextInput
              control={form.control}
              name="oldPassword"
              placeholder="Old Password"
              label="Old Password"
              type="password"
              autoComplete="current-password"
            />

            <TextInput
              control={form.control}
              name="newPassword"
              placeholder="New Password"
              label="New Password"
              type="password"
              autoComplete="new-password"
            />

            <TextInput
              control={form.control}
              name="newPasswordConfirm"
              placeholder="Confirm New Password"
              label="Confirm New Password"
              type="password"
              autoComplete="new-password"
            />

            <Button size="lg" className="w-full" disabled={!form.formState.isValid || isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Changing password
                </>
              ) : (
                'Change password'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
