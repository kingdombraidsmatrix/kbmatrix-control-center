import type { LucideIcon } from 'lucide-react';
import type { LinkProps } from '@tanstack/react-router';

export interface SettingsMenu {
  key: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  path: LinkProps['to'];
}
