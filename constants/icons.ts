import type { LucideIcon } from 'lucide-react'
import { Zap } from 'lucide-react'
import { LayoutDashboard, User, Webhook } from 'lucide-react'

export const ICONS: Record<string, LucideIcon> = {
  DASHBOARD: LayoutDashboard,
  ADMIN: User,
  WEBHOOKS: Webhook,
  UPGRADE: Zap,
  PRICING: Zap,
}
