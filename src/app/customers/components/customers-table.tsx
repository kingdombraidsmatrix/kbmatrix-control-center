import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { CustomersColumns } from '@/app/customers/columns.tsx'
import { DataTable } from '@/components/data-table/data-table.tsx'
import { allCustomersMock } from '@/app/customers/mock'

export function CustomersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={CustomersColumns} data={allCustomersMock} />
      </CardContent>
    </Card>
  )
}
