import { RolesTable } from '@/app/admin/components/roles/roles-table.tsx';
import { RoleDialog } from '@/app/admin/components/roles/role-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';

export function RolesSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold flex-1">Roles</h4>
        <RoleDialog trigger={<Button>Add New</Button>} action="new" />
      </div>
      <RolesTable />
    </div>
  );
}
