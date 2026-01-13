import { RolesTable } from '@/app/admin/components/roles/roles-table.tsx';

export function RolesSection() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold">Roles</h4>
      </div>
      <RolesTable />
    </div>
  );
}
