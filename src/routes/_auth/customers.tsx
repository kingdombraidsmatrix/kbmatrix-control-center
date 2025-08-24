import { createFileRoute } from '@tanstack/react-router'
import { CustomersPage } from '@/app/customers'

export const Route = createFileRoute('/_auth/customers')({
  component: CustomersPage,
})
