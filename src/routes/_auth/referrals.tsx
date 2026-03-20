import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/referrals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/referrals"!</div>
}
