import { Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/layout'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="w-full max-w-8xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
