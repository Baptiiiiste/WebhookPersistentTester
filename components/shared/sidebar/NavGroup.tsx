'use client'

import { Collapsible } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import type { SidebarLinkType } from '@/types/sidebar'
import type { Session } from 'next-auth'
import clsx from 'clsx'
import { Role } from '@prisma/client'
import { Zap } from 'lucide-react'

export function NavGroup({
  pages,
  title,
  session,
}: {
  title?: string
  pages: SidebarLinkType[]
  session: Session
}) {
  const pathname = usePathname()
  const userRole = session.user?.role

  const visiblePages = pages.filter((item) => {
    const roles = item.roles ?? []

    const isAdminOnly = roles.length === 1 && roles[0] === Role.ADMIN
    if (isAdminOnly && userRole !== Role.ADMIN) {
      return false
    }

    return true
  })

  if (visiblePages.length === 0) {
    return null
  }

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {visiblePages.map((item) => {
          const roles = item.roles ?? []

          const hasAccess = roles.length === 0 || roles.includes(userRole)
          const isDisabled = !hasAccess
          const isActive = pathname.startsWith(item.url)

          return (
            <Collapsible key={item.name} asChild>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.name}
                  asChild
                  isActive={isActive && !isDisabled}
                  disabled={isDisabled}
                >
                  <Link
                    href={isDisabled ? '#' : item.url}
                    className={clsx('flex items-center gap-2', {
                      'pointer-events-none opacity-50': isDisabled,
                    })}
                  >
                    {item.icon && (
                      <item.icon
                        className={clsx({
                          'text-primary': isActive && !isDisabled,
                        })}
                      />
                    )}
                    <span className="flex-1">{item.name}</span>
                    {isDisabled && (
                      <Zap className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
