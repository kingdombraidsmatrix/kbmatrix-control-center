import { ShieldIcon } from 'lucide-react';
import type { SideTabMenuItemProps } from '@/components/side-tab';
import { ProfileSecurity } from '@/app/profile/components/security';

export const profileMenuItems: Array<SideTabMenuItemProps> = [
  {
    id: 'security',
    title: 'Security',
    subtitle: 'Change Password',
    component: ProfileSecurity,
    icon: ShieldIcon,
  },
];
