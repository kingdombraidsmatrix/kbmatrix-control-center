import { Outlet } from '@tanstack/react-router'

export function Layout() {
  return (
    <div>
      <p>Sidebar</p>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
