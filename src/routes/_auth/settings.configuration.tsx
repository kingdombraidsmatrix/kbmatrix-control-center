import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/settings/configuration')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/settings/configuration"!</div>
}
