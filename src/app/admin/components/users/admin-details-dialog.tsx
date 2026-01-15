import { AlertCircle, ChevronRight, Loader2, ShieldCheck, ShieldXIcon, Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import type { AdminUser } from '@/types';
import { AdminStatus } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { cn, extractInitials, getBackgroundTint } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  useDeleteAdminService,
  useInviteAdminService,
  useUpdateAdminService,
} from '@/services/admin';
import { RoleField } from '@/app/admin/components/users/admin-role-field.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useAuthStore } from '@/stores/auth/auth.store.ts';

interface AdminDetailsDialogProps {
  adminUser?: AdminUser;
  setSelectedAdminUser: (user: AdminUser | undefined) => void;
}
export function AdminDetailsDialog({ adminUser, setSelectedAdminUser }: AdminDetailsDialogProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <Dialog open={!!adminUser} onOpenChange={() => setSelectedAdminUser(undefined)}>
      {adminUser && (
        <DialogContent>
          {adminUser.user ? (
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-24">
                <AvatarImage src={adminUser.user.image} alt="Admin" className="object-cover" />
                <AvatarFallback
                  className={cn('text-3xl', getBackgroundTint(adminUser.user.fullName))}
                >
                  {extractInitials(adminUser.user.fullName)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{adminUser.user.fullName}</h3>
              <p>{adminUser.email}</p>
              <Badge variant="secondary">{adminUser.role.name}</Badge>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-24">
                <AvatarFallback className={cn('text-3xl', getBackgroundTint(adminUser.email))}>
                  {extractInitials(adminUser.email)}
                </AvatarFallback>
              </Avatar>
              <h5 className="font-semibold mt-2 mb-1">{adminUser.email}</h5>
              <Badge variant="secondary">{adminUser.role.name}</Badge>
            </div>
          )}

          {user?.id === adminUser.user?.id ? (
            <div>
              <Alert>
                <AlertTitle>Notice</AlertTitle>
                <AlertDescription>
                  You cannot manage/modify your details here, ask another admin to help
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-8 mt-4">
              <ChangeRole adminUser={adminUser} setSelectedAdminUser={setSelectedAdminUser} />

              <ResendInvitation adminUser={adminUser} />

              <ToggleEnableAdmin
                adminUser={adminUser}
                setSelectedAdminUser={setSelectedAdminUser}
              />

              <DeleteAdmin adminUser={adminUser} setSelectedAdminUser={setSelectedAdminUser} />
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

interface SectionProps {
  adminUser: AdminUser;
  setSelectedAdminUser: (user: AdminUser | undefined) => void;
}

function ResendInvitation({ adminUser }: Pick<SectionProps, 'adminUser'>) {
  const { mutateAsync, isPending } = useInviteAdminService();

  const handleClick = useCallback(() => {
    if (isPending) return;

    mutateAsync({
      email: adminUser.email,
      roleId: adminUser.role.id,
    })
      .then(() => {
        toast.success('Invitation resent successfully');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Invitation failed');
      });
  }, [mutateAsync, adminUser]);

  if (adminUser.status !== AdminStatus.PENDING) {
    return null;
  }

  return (
    <Alert variant="warning">
      <AlertCircle />
      <AlertTitle>Admin is yet to accept invitation</AlertTitle>
      <AlertDescription>
        <Button
          variant="link"
          className="text-inherit !px-0"
          disabled={isPending}
          onClick={handleClick}
        >
          Resend Invitation ({adminUser.role.name}){' '}
          {isPending ? <Loader2 className="animate-spin" /> : <ChevronRight />}
        </Button>
      </AlertDescription>
    </Alert>
  );
}

function ChangeRole({ adminUser, setSelectedAdminUser }: SectionProps) {
  const { mutateAsync, isPending } = useUpdateAdminService();
  const queryClient = useQueryClient();

  const formSchema = z.object({
    roleId: z.string(),
    id: z.number(),
  });

  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      roleId: adminUser.role.id.toString(),
      id: adminUser.id,
    },
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      mutateAsync({ id: values.id, roleId: Number(values.roleId) })
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
          toast.success('Role updated successfully');
          setSelectedAdminUser(response.data);
          form.reset(values);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Unable to change role, an error occurred.');
        });
    },
    [mutateAsync, queryClient, form],
  );

  return (
    <div>
      <h6 className="font-semibold">Change Role</h6>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
            <RoleField />
            <Button type="submit" size="lg" disabled={isPending || !form.formState.isValid}>
              Change Role
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function ToggleEnableAdmin({ adminUser, setSelectedAdminUser }: SectionProps) {
  const { mutateAsync, isPending } = useUpdateAdminService();
  const queryClient = useQueryClient();

  const handleClick = useCallback(
    (value: AdminStatus) => {
      mutateAsync({ id: adminUser.id, status: value })
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
          toast.success('Status updated successfully');
          setSelectedAdminUser(response.data);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || 'Unable to update admin status, an error occurred',
          );
        });
    },
    [adminUser, close],
  );

  if (adminUser.status === AdminStatus.ACTIVE) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <h6 className="font-semibold">Disable Admin</h6>
          <p className="text-sm text-muted-foreground">Admin is enabled</p>
        </div>
        <Button
          variant="destructive-alt"
          disabled={isPending}
          onClick={() => handleClick(AdminStatus.SUSPENDED)}
        >
          Suspend Admin <ShieldXIcon />
        </Button>
      </div>
    );
  }

  if (adminUser.status === AdminStatus.SUSPENDED) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <h6 className="font-semibold">Enable Admin</h6>
          <p className="text-sm text-muted-foreground">Admin is disabled</p>
        </div>
        <Button
          variant="success-alt"
          disabled={isPending}
          onClick={() => handleClick(AdminStatus.ACTIVE)}
        >
          Enable Admin <ShieldCheck />
        </Button>
      </div>
    );
  }

  return null;
}

function DeleteAdmin({ adminUser, setSelectedAdminUser }: SectionProps) {
  const { mutateAsync, isPending } = useDeleteAdminService(adminUser.id);

  const queryClient = useQueryClient();

  const handleClick = useCallback(() => {
    mutateAsync()
      .then(() => {
        toast.success('Admin deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        setSelectedAdminUser(undefined);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Unable to delete admin, an error occurred');
      });
  }, [mutateAsync, queryClient, close]);

  return (
    <Alert variant="destructive">
      <Trash2 />
      <AlertTitle>Danger zone</AlertTitle>
      <AlertDescription>
        <h6 className="font-bold">Delete Admin</h6>
        <p className="text-sm !leading-normal">
          Permanently delete admin from having access to the control center
        </p>
        <Button variant="destructive" disabled={isPending} onClick={handleClick}>
          Delete Admin {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
