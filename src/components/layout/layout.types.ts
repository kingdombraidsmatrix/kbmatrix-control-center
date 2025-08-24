import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  key: string
  title: string
  icon: LucideIcon
  path: LinkProps['to']
}
