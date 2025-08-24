import type { badgeVariants } from '@/components/ui/badge.tsx'
import type { VariantProps } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import type { UserStatus } from '@/types'

export enum BadgeContext {
  BOOLEAN = 'BOOLEAN',
  USER_STATUS = 'USER_STATUS',
}

interface BooleanBadge {
  context: BadgeContext.BOOLEAN
  value: boolean
}

interface UserStatusBadge {
  context: BadgeContext.USER_STATUS
  value: UserStatus
}

export type BadgeProps = BooleanBadge | UserStatusBadge

export interface BadgeConfig {
  variant: VariantProps<typeof badgeVariants>['variant']
  text: string
  icon?: LucideIcon
}
