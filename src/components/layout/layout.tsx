import { Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/layout'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
