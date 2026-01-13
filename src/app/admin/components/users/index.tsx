import { AdminUsersTable } from '@/app/admin/components/users/admin-users-table.tsx';

export function AdminUsersSection() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Admin Users</h4>
      </div>

      <AdminUsersTable />
    </div>
  );
}
