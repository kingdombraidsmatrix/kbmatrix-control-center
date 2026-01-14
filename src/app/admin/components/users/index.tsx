import { AdminUsersTable } from '@/app/admin/components/users/admin-users-table.tsx';
import { InviteAdminDialog } from '@/app/admin/components/users/invite-admin-dialog.tsx';

export function AdminUsersSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-5">
        <h4 className="font-semibold flex-1">Admin Users</h4>
        <InviteAdminDialog />
      </div>

      <AdminUsersTable />
    </div>
  );
}
