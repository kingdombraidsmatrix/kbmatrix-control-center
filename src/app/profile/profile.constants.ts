import { ShieldIcon, UserCircle2 } from 'lucide-react';
import type { SideTabMenuItemProps } from '@/components/side-tab';
import { ProfileSecurity } from '@/app/profile/components/security';
import { ProfileUserDetails } from '@/app/profile/components/details';

export const profileMenuItems: Array<SideTabMenuItemProps> = [
  {
    id: 'details',
    title: 'Details',
    subtitle: 'Update User Details',
    component: ProfileUserDetails,
    icon: UserCircle2,
  },
  {
    id: 'security',
    title: 'Security',
    subtitle: 'Change Password',
    component: ProfileSecurity,
    icon: ShieldIcon,
  },
];
