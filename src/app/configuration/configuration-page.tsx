import { ConfigurationTable } from '@/app/configuration/components/configuration-table.tsx';

export function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <h3 className="font-semibold">Configuration</h3>

      <ConfigurationTable />
    </div>
  );
}
