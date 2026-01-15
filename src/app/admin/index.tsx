import { RolesSection } from '@/app/admin/components/roles';
import { AdminUsersSection } from '@/app/admin/components/users';

export function AdminPage() {
  return (
    <div className="space-y-12">
      <RolesSection />
      <AdminUsersSection />
    </div>
  );
}
