import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/settings/service-categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/settings/service-categories"!</div>
}
