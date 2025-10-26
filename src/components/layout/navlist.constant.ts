import {
  BadgePoundSterling,
  Briefcase,
  ChartBarBig,
  LayoutDashboard,
  Settings,
  Users2,
} from 'lucide-react';
import type { NavItem } from '@/components/layout/layout.types.ts';

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
    key: 'bookings',
    path: '/bookings',
    icon: BadgePoundSterling,
    title: 'Bookings',
  },
  {
    key: 'transactions',
    path: '/transactions',
    icon: ChartBarBig,
    title: 'Transactions',
  },
  {
    key: 'settings',
    path: '/settings',
    icon: Settings,
    title: 'Settings',
  },
];
