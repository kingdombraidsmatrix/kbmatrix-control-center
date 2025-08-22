import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/app/login'

export const Route = createFileRoute('/_external/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPage />
}
