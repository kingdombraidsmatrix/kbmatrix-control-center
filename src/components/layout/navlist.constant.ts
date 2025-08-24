import { Briefcase, LayoutDashboard, Settings, Users2 } from 'lucide-react'
import type { NavItem } from '@/components/layout/layout.types.ts'

export const NavList: Array<NavItem> = [
  {
    key: 'dashboard',
    path: '/',
    icon: LayoutDashboard,
    title: 'Dashboard',
  },
  {
    key: 'customers',
    path: '/customers',
    icon: Users2,
    title: 'Customers',
  },
  {
    key: 'stylists',
    path: '/stylists',
    icon: Briefcase,
    title: 'Stylists',
  },
  {
    key: 'settings',
    path: '/',
    icon: Settings,
    title: 'Settings',
  },
]
