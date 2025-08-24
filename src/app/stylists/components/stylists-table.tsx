import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { allStylistsMock } from '@/app/stylists/mock';
import { StylistsColumns } from '@/app/stylists/columns.tsx';

export function StylistsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={StylistsColumns} data={allStylistsMock} />
      </CardContent>
    </Card>
  );
}
