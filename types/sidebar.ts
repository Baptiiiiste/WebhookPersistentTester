import type { LucideIcon } from 'lucide-react'

export type SidebarLinkType = {
  name: string
  url: string
  icon: LucideIcon
  roles?: string[]
}

export type SidebarLinkGroupType = {
  name: string | undefined
  links: SidebarLinkType[]
}
