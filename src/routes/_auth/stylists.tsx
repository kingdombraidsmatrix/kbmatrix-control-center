import { createFileRoute } from '@tanstack/react-router'
import { StylistsPage } from '@/app/stylists'

export const Route = createFileRoute('/_auth/stylists')({
  component: StylistsPage,
})
